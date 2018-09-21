import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreloaderService } from '../../services/preloader.service';
import { AlertService } from '../../services/alert.service';
import { ModalService } from '../../services/modal.service';
import { Timecard, TimecardApi, JobApi } from '../../sdk';

@Component({
    moduleId: module.id,
    selector: 'app-timecard-add',
    templateUrl: './timecard-add.component.html',
    styleUrls: ['./timecard-add.component.css']
})

export class TimecardAddComponent implements OnInit {

    @Input() modelName: string;
    @Input() modelId: string;
    @Output('saved') loadedTimecard = new EventEmitter();
    @Output() updateData: EventEmitter<any> = new EventEmitter;

    private sub: any;
    error: string;
    timecardForm: FormGroup;
    timecard: Timecard;
    sfdcId: any;
    worker: any;
    workersTypeahead = new EventEmitter<string>();
    Incurred_Date__c: any;
    Vendor_Time_Card_Time_in_Actual__c: any;
    Vendor_Time_Card_Time_Out_Actual__c: any;
    minTimeInDate: any;
    minTimeOutDate: any;

    constructor(
        private _cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private timeCardApi: TimecardApi,
        private alertService: AlertService,
        private _modalService: ModalService,
        private _jobApi: JobApi,
        private _preloaderService: PreloaderService
    ) {
        this.sub = this.route.params.subscribe(params => {
            this.sfdcId = params['id'];
        });
    }

    ngOnInit() {
        this.error = '';
        this.worker = {};
        if (this.sfdcId) {
            this.buildForm();
            this.getWorker();
        } else {
            this.error = 'Job not found';
        }
    }

    getWorker() {
        this._preloaderService.showPreloader();
        this._jobApi.find({
            fields: ['sfdcId', 'id', 'Dispatch_Worker_Name__c', 'Vendorsite__c'],
            where: { 'sfdcId': this.sfdcId },
            include: {
                relation: 'worker',
                scope: {
                    fields: ['Name', 'id', 'sfdcId', 'Vendorsite__c']
                }
            }
        }).subscribe(
            job => {
                if (job && job.length && job[0]['worker'] && job[0]['Vendorsite__c'] &&
                    job[0]['Vendorsite__c'] === job[0]['worker']['Vendorsite__c']) {
                    this.worker['sfdcId'] = job[0]['worker']['sfdcId'];
                    this.worker['Name'] = job[0]['worker']['Name'];
                } else {
                    this.error = 'Worker is not assinged to the job.';
                }
                this._preloaderService.hidePreloader();
            },
            err => {
                this.error = err.message;
                this._preloaderService.hidePreloader();
            }
        )
    }

    buildForm() {
        this.timecardForm = this.fb.group({
            Service_Dispatch__c: [this.sfdcId],
            Incurred_Date__c: ['', [Validators.required]],
            Vendor_Time_Card_Time_in_Actual__c: ['', [Validators.required]],
            Vendor_Time_Card_Time_Out_Actual__c: ['', [Validators.required]],
            Customer_Site_Signoff_Name__c: ['', [Validators.required]],
            Vendor_Time_Card_Notes_Tasks_Performed__c: ['', [Validators.required]],
            Any_Observation_or_Suggestions_Notes__c: ['']
        });
    }

    saveTimecard() {
        if (this.timecardForm.value) {
            this._preloaderService.showPreloader();
            this.timecardForm['value']['Worker__c'] = this.worker['sfdcId'];
            this.timeCardApi.create(this.timecardForm.value).subscribe(
                data => {
                    if (data) {
                        data['worker'] = this.worker['Name'];
                        this._preloaderService.hidePreloader();
                        this.loadedTimecard.emit(data);
                        this.updateData.emit('sidebar');
                        this._modalService.closed();
                        this.alertService.success('Timecard has been saved successfully');
                    } else {
                        this.error = 'Failed to save timecard.';
                        this._preloaderService.hidePreloader();
                    }
                },
                err => {
                    this._preloaderService.hidePreloader();
                    this.error = err.message;
                }
            );
        }
    }

    onDateChange(source) {
        if (source === 'Incurred') {
            if (this.Incurred_Date__c > this.Vendor_Time_Card_Time_in_Actual__c) {
                this.Vendor_Time_Card_Time_in_Actual__c = '';
            }
            if (this.Incurred_Date__c > this.Vendor_Time_Card_Time_Out_Actual__c) {
                this.Vendor_Time_Card_Time_Out_Actual__c = '';
            }
            this.minTimeInDate = this.Incurred_Date__c;
            this.minTimeOutDate = this.Incurred_Date__c;
        } else if (source === 'TimeIn') {
            if (this.Vendor_Time_Card_Time_in_Actual__c > this.Vendor_Time_Card_Time_Out_Actual__c) {
                this.Vendor_Time_Card_Time_Out_Actual__c = '';
            }
            this.minTimeOutDate = this.Vendor_Time_Card_Time_in_Actual__c;
        }
        this._cd.detectChanges();
    }
}
