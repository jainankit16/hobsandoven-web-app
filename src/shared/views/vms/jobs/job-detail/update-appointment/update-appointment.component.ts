import { Component, EventEmitter, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../../services/modal.service';
import { AlertService } from '../../../../../services/alert.service';
import { PreloaderService } from '../../../../../services/preloader.service';
import { JobApi, AppointmentApi } from '../../../../../sdk';

@Component({
    selector: 'app-update-appointment',
    templateUrl: './update-appointment.component.html',
    styleUrls: ['./update-appointment.component.css']
})

export class UpdateAppointmentComponent implements OnInit {

    @Input() modelId: string;
    @Output() savedAppointment: EventEmitter<any> = new EventEmitter();
    formAppointmentWorker: FormGroup;
    jobData: any;
    appointmentData: any;
    error = [];
    hasAppointment = false;
    hasWroker = false;
    Worker_End_DateTime_Scheduled: any;
    Worker_Arrival_DateTime_Scheduled: any;
    minEndDate: any;

    constructor(
        private _modalService: ModalService,
        private _alertService: AlertService,
        private _preloaderService: PreloaderService,
        private _jobApi: JobApi,
        private _appointmentApi: AppointmentApi,
        private _fb: FormBuilder,
        private _cd: ChangeDetectorRef
    ) { }

    ngOnInit() {
        if (this.modelId) {
            this.getJobData(this.modelId);
        }
    }

    getJobData(jobId) {
        this.error = [];
        this._jobApi.findById(jobId, {
            fields: ['id', 'sfdcId', 'Dispatch_Worker_Name__c', 'Dispatch_Worker_Phone__c', 'Case__c', 'ICC_Case__c'],
            include: [
                {
                    'relation': 'appointment',
                    'scope': {
                        'fields': ['id', 'sfdcId', 'Worker_Arrival_DateTime_Scheduled__c', 'Worker_End_DateTime_Scheduled__c']
                    }
                },
                {
                    'relation': 'worker',
                    'scope': {
                        'fields': ['Name']
                    }
                }
            ]
        }).subscribe(
            data => {
                this.jobData = data;
                if (this.jobData) {
                    this.formAppointmentWorker = this._fb.group({
                        Worker_Arrival_DateTime_Scheduled__c: ['', Validators.required],
                        Worker_End_DateTime_Scheduled__c: ['', Validators.required],
                        Job__c: [this.jobData.sfdcId, Validators.required]
                    });
                    // check worker
                    if (this.jobData.worker && this.jobData.worker.Name) {
                        this.hasWroker = true;
                    } else {
                        this.hasWroker = false;
                        this.error.push('Worker is not associated with this Job.');
                    }
                    // check appointment
                    if (this.jobData.appointment) {
                        this.hasAppointment = true;
                        this.appointmentData = this.jobData.appointment;
                        this.Worker_Arrival_DateTime_Scheduled = this.appointmentData.Worker_Arrival_DateTime_Scheduled__c ?
                            new Date(this.appointmentData.Worker_Arrival_DateTime_Scheduled__c) : null;
                        this.Worker_End_DateTime_Scheduled = this.appointmentData.Worker_End_DateTime_Scheduled__c ?
                            new Date(this.appointmentData.Worker_End_DateTime_Scheduled__c) : null;

                        this.formAppointmentWorker.controls['Worker_Arrival_DateTime_Scheduled__c'].
                            setValue(this.appointmentData.Worker_Arrival_DateTime_Scheduled__c);
                        this.formAppointmentWorker.controls['Worker_End_DateTime_Scheduled__c'].
                            setValue(this.appointmentData.Worker_End_DateTime_Scheduled__c);
                        this.onDateChange();
                    } else {
                        this.hasAppointment = false;
                        this.error.push('Appointment is not associated with this Job. Please contact Adminstrator.');
                    }
                } else {
                    this.error.push('Job not found.');
                }
            },
            err => {
                this.error.push(err);
            }
        );
    }

    updateAppointment() {
        this.error = [];
        const values = this.formAppointmentWorker.value;
        this._preloaderService.showPreloader();
        if (this.appointmentData) {
            this._appointmentApi.patchAttributes(this.appointmentData.id, values).subscribe(
                result => {
                    this._preloaderService.hidePreloader();
                    this._alertService.success('Appointment has been updated successfully');
                    this.savedAppointment.emit(1);
                    this._modalService.closed();
                },
                err => {
                    this._preloaderService.hidePreloader();
                    this._alertService.error(err.message);
                    this._modalService.closed();
                }
            );
        }
    }

    onDateChange() {
        if (this.Worker_Arrival_DateTime_Scheduled > this.Worker_End_DateTime_Scheduled) {
            this.Worker_End_DateTime_Scheduled = null;
        }
        this.minEndDate = this.Worker_Arrival_DateTime_Scheduled;
        this._cd.detectChanges();
    }
}
