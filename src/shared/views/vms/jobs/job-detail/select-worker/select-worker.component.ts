import { Component, EventEmitter, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalService } from '../../../../../services/modal.service';
import { AlertService } from '../../../../../services/alert.service';
import { PreloaderService } from '../../../../../services/preloader.service';
import { WorkerApi, JobApi } from '../../../../../sdk';

@Component({
    selector: 'app-select-worker',
    templateUrl: './select-worker.component.html',
    styleUrls: ['./select-worker.component.css']
})
export class SelectWorkerComponent implements OnInit {
    @Input() modelId: string;
    @Output() assignedWorker: EventEmitter<any> = new EventEmitter();

    workersTypeahead = new EventEmitter<string>();
    workers: any = [];
    error: any;
    formAssignWorker: FormGroup;
    jobData: any;
    isSelected = false;

    constructor(
        private _modalService: ModalService,
        private _preloaderService: PreloaderService,
        private _workerApi: WorkerApi,
        private _jobApi: JobApi,
        private _fb: FormBuilder,
        private _alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.buildForm();
        if (this.modelId) {
            this.getJobData(this.modelId);
        }
    }

    getJobData(jobId) {
        this._jobApi.findById(jobId, {
            fields: ['id', 'sfdcId', 'Dispatch_Worker_Name__c', 'Dispatch_Worker_Phone__c', 'Vendorsite__c'],
            'include': [
                {
                    'relation': 'worker',
                    'scope': {
                        'fields': ['sfdcId', 'Name', 'Dispatch_Worker_num__c', 'Work_Phone_Number__c', 'Vendorsite__c']
                    }
                }
            ]
        }).subscribe(data => {
            if (data) {
                this.jobData = data;
                this.searchWorkerName();
                if (this.jobData && this.jobData.Dispatch_Worker_Name__c && this.jobData.Vendorsite__c) {
                    if (this.jobData.worker && this.jobData.worker.Vendorsite__c &&
                        this.jobData.worker.Vendorsite__c === this.jobData.Vendorsite__c) {
                        this.isSelected = true;
                        this.formAssignWorker.controls['Dispatch_Worker_Name__c'].setValue(this.jobData.Dispatch_Worker_Name__c);
                        this.formAssignWorker.controls['Dispatch_Worker_Phone__c'].setValue(this.jobData.Dispatch_Worker_Phone__c);
                    }
                }
            }
        },
            err => {
                console.log(err);
                this.error = err;
            });
    }

    buildForm() {
        this.formAssignWorker = this._fb.group({
            Dispatch_Worker_Name__c: [null, Validators.required],
            Dispatch_Worker_Phone__c: [null, Validators.required]
        });
    }

    searchWorkerName() {
        this.workers = [];
        if (this.jobData.Vendorsite__c) {
            this._workerApi.find({
                where: { Vendorsite__c: this.jobData.Vendorsite__c },
                fields: ['Name', 'id', 'sfdcId', 'Work_Phone_Number__c']
            }).subscribe(
                results => {
                    this.workers = results;
                }
            );
        }
    }

    assignWorker() {
        if (this.formAssignWorker.valid && this.formAssignWorker.value &&
            this.formAssignWorker.value.Dispatch_Worker_Name__c &&
            this.formAssignWorker.value.Dispatch_Worker_Name__c !== null) {
            this.error = '';
            const values = this.formAssignWorker.value;
            this._preloaderService.showPreloader();
            this._jobApi.patchAttributes(this.modelId, values).subscribe(
                result => {
                    this._preloaderService.hidePreloader();
                    this._alertService.success('Worker has been assigned successfully');
                    this.assignedWorker.emit('all');
                    this._modalService.closed();
                },
                err => {
                    this._preloaderService.hidePreloader();
                    this._alertService.error(err.message);
                    this._modalService.closed();
                }
            );
        } else {
            this.error = 'Please fill complete form.';
            return;
        }
    }

    getPhone(data) {
        let selectedWorker = '';
        if (data) {
            const worker = data.target.value
            this.workers.filter(item => {
                if (item.sfdcId == worker) {
                    selectedWorker = item;
                }
            })
            this.formAssignWorker.controls['Dispatch_Worker_Phone__c'].setValue(selectedWorker['Work_Phone_Number__c']);
        } else {
            this.isSelected = false;
            this.formAssignWorker.controls['Dispatch_Worker_Phone__c'].setValue(selectedWorker);
        }
    }

}
