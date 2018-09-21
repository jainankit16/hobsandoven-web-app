import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreloaderService } from '../../../../../services/preloader.service';
import { AlertService } from '../../../../../services/alert.service';
import { JobApi } from '../../../../../sdk';

@Component({
    selector: 'job-detail-worker-status',
    templateUrl: './job-detail-worker-status.component.html',
    styleUrls: ['./job-detail-worker-status.component.css']
})

export class JobDetailWorkerStatusComponent implements OnInit {

    @Input() jobId: string;
    private routeSubscription: any;
    job: any;
    errorMessage = '';
    formAppointmentStatus: FormGroup;

    Worker_Departure_Date_Time_Actual: any;
    Worker_Arrival_Date_Time_Actual: any;
    Worker_InProgress_Start_DateTime_Actual: any;
    Worker_Finish_Date_Time_Actual: any;
    minArrivalDate: any;
    minProgressDate: any;
    minFinishDate: any;

    constructor(
        private _fb: FormBuilder,
        private _preloaderService: PreloaderService,
        private _jobApi: JobApi,
        private _alertService: AlertService,
        private _cd: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        if (this.jobId) {
            this.loadData(this.jobId);
        } else {
            this.errorMessage = 'No details to display.';
        }
    }

    loadData(jobId) {
        this._preloaderService.showPreloader();
        this.errorMessage = '';
        const reqObj = {
            'where': { 'sfdcId': jobId },
            'fields': ['sfdcId', 'id', 'Service_Parts_Local_Pickup_Required__c', 'Worker_Departure_Date_Time_Actual__c',
                'Worker_Arrival_Date_Time_Actual__c', 'Worker_InProgress_Start_DateTime_Actual__c', 'Worker_Finish_Date_Time_Actual__c',
                'Deliverables__c', 'Deliverable_Status__c'],
            'include': [
                {
                    'relation': 'deliverable',
                    'scope': {
                        'fields': ['Name', 'Deliverable_Type__c', 'File_upload_required__c', 'Description__c',
                            'Instructions__c']
                    }
                }
            ]
        };
        this._jobApi.getJobDetailsById(reqObj).subscribe(
            result => {
                if (result && result.id) {
                    this.job = result;
                    this.buildForm();
                } else {
                    this.errorMessage = 'No details to display.';
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                this._preloaderService.hidePreloader();
                this.errorMessage = error.message;
            }
        );
    }

    buildForm() {
        this.Worker_Departure_Date_Time_Actual = this.job.Worker_Departure_Date_Time_Actual__c ?
            new Date(this.job.Worker_Departure_Date_Time_Actual__c) : null;
        this.Worker_Arrival_Date_Time_Actual = this.job.Worker_Arrival_Date_Time_Actual__c ?
            new Date(this.job.Worker_Arrival_Date_Time_Actual__c) : null;
        this.Worker_InProgress_Start_DateTime_Actual = this.job.Worker_InProgress_Start_DateTime_Actual__c ?
            new Date(this.job.Worker_InProgress_Start_DateTime_Actual__c) : null;
        this.Worker_Finish_Date_Time_Actual = this.job.Worker_Finish_Date_Time_Actual__c ?
            new Date(this.job.Worker_Finish_Date_Time_Actual__c) : null;

        this.minArrivalDate = this.Worker_Departure_Date_Time_Actual;
        this.minProgressDate = this.Worker_Arrival_Date_Time_Actual;
        this.minFinishDate = this.Worker_InProgress_Start_DateTime_Actual;

        this.formAppointmentStatus = this._fb.group({
            Worker_Departure_Date_Time_Actual__c: [this.Worker_Departure_Date_Time_Actual],
            Worker_Arrival_Date_Time_Actual__c: [this.Worker_Arrival_Date_Time_Actual],
            Worker_InProgress_Start_DateTime_Actual__c: [this.Worker_InProgress_Start_DateTime_Actual],
            Worker_Finish_Date_Time_Actual__c: [this.Worker_Finish_Date_Time_Actual]
        });
    }

    updateAppointmentStatus() {
        this._jobApi.patchAttributes(this.job.id, this.formAppointmentStatus.value).subscribe(
            result => {
                this._alertService.success('Job Appointment has been updated successfully.');
                window.scrollTo(0, 0);
            },
            err => {
                this._alertService.error(err.message);
            }
        );
    }

    onDateChange(source) {
        if (source === 'Departure') {
            if (this.Worker_Departure_Date_Time_Actual > this.Worker_Arrival_Date_Time_Actual) {
                this.Worker_Arrival_Date_Time_Actual = null;
            }
            if (this.Worker_Departure_Date_Time_Actual > this.Worker_InProgress_Start_DateTime_Actual) {
                this.Worker_InProgress_Start_DateTime_Actual = null;
            }
            if (this.Worker_Departure_Date_Time_Actual > this.Worker_Finish_Date_Time_Actual) {
                this.Worker_Finish_Date_Time_Actual = null;
            }
            this.minArrivalDate = this.Worker_Departure_Date_Time_Actual;
            this.minProgressDate = this.Worker_Departure_Date_Time_Actual;
            this.minFinishDate = this.Worker_Departure_Date_Time_Actual;
        } else if (source === 'Arrival') {
            if (this.Worker_Arrival_Date_Time_Actual > this.Worker_InProgress_Start_DateTime_Actual) {
                this.Worker_InProgress_Start_DateTime_Actual = null;
            }
            if (this.Worker_Arrival_Date_Time_Actual > this.Worker_Finish_Date_Time_Actual) {
                this.Worker_Finish_Date_Time_Actual = null;
            }
            this.minProgressDate = this.Worker_Arrival_Date_Time_Actual;
            this.minFinishDate = this.Worker_Arrival_Date_Time_Actual;
        } else if (source === 'Progress') {
            if (this.Worker_InProgress_Start_DateTime_Actual > this.Worker_Finish_Date_Time_Actual) {
                this.Worker_Finish_Date_Time_Actual = null;
            }
            this.minFinishDate = this.Worker_InProgress_Start_DateTime_Actual;
        }
        this._cd.detectChanges();
    }
}
