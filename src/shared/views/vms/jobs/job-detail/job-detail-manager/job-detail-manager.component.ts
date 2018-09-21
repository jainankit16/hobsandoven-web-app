import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import {
    JobStatusInternalValues,
    DispatchServiceResolutionStatuses,
    VisitIncompleteReasonCodes,
    AppointmentScheduleCustomStatuses
} from '../../../../../models/static-list-data.service';
import { PreloaderService } from '../../../../../services/preloader.service';
import { AlertService } from '../../../../../services/alert.service';
import { ModalService } from '../../../../../services/modal.service';
import { JobApi, AppointmentApi, WorkerApi } from '../../../../../sdk';

@Component({
    selector: 'job-detail-manager',
    templateUrl: './job-detail-manager.component.html',
    styleUrls: ['./job-detail-manager.component.css']
})

export class JobDetailManagerComponent implements OnInit {
    @Input() jobId: string;
    @Output() updateData: EventEmitter<any> = new EventEmitter;
    private routeSubscription: any;
    job: any;
    errorMessage = '';

    Customer_Appointment_DateTime_Scheduled: any;
    Customer_Appointment_Start_Scheduled: any;
    minAppointmentEndDate: any;

    Worker_Arrival_DateTime_Scheduled: any;
    Worker_End_DateTime_Scheduled: any;
    minWorkerEndDate: any;

    Worker_Departure_Date_Time_Actual: any;
    Worker_Arrival_Date_Time_Actual: any;
    Worker_InProgress_Start_DateTime_Actual: any;
    Worker_Finish_Date_Time_Actual: any;
    minArrivalDate: any;
    minProgressDate: any;
    minFinishDate: any;

    // JOB DISPATCH: PROGRESS STATUS
    formJobStatus: FormGroup;
    JobStatusInternalValues = JobStatusInternalValues;
    DispatchServiceResolutionStatuses = DispatchServiceResolutionStatuses;
    AppointmentScheduleCustomStatuses = AppointmentScheduleCustomStatuses;
    // JOB DISPATCH: INCOMPLETE
    formJobIncomplete: FormGroup;
    VisitIncompleteReasonCodes = VisitIncompleteReasonCodes;
    // Customer Appointment Status: Schedule Setup (Call Customer Now)
    formAppointmentStatus: FormGroup;
    // Customer Appointment Schedule (Call Customer Now)
    formAppointmentCustomer: FormGroup;
    // Worker Appointment Setup
    formAppointmentWorker: FormGroup;
    workersTypeahead = new EventEmitter<string>();
    workers: any;
    // Visit Status
    formVisitStatus: FormGroup;
    // Add Worker modal
    formAssignWorker: FormGroup;
    formAddWorker: FormGroup;
    error: string;
    contactRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // Disabling Add new worker
    enableAddWorker: any = false;
    isSelected: boolean;

    constructor(
        private _cd: ChangeDetectorRef,
        private fb: FormBuilder,
        private _preloaderService: PreloaderService,
        private _alertService: AlertService,
        private _modalService: ModalService,
        private _jobApi: JobApi,
        private _workerApi: WorkerApi,
        private _appointmentApi: AppointmentApi
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
            'fields': ['sfdcId', 'id', 'Job_Status_Internal__c', 'Dispatch_Service_Resolution_Status__c',
                'Customer_Appointment_Setup_Required__c', 'Service_Parts_Local_Pickup_Required__c', 'Case__c',
                'Appointment_Schedule_Status_Customer__c', 'Appointment_Schedule_Status_Customer_vms__c',
                'Phone_Scheduling_1st_Attempt_Unreachable__c', 'Phone_Scheduling_2nd_Attempt_Unreachable__c',
                'Phone_Scheduling_3rd_Attempt_Unreachable__c', 'Appointment_Call_Notes__c', 'Customer_Appointment_DateTime_Scheduled__c',
                'Customer_Appointment_Start_Scheduled__c', 'Worker_Arrival_DateTime_Scheduled__c', 'Worker_End_DateTime_Scheduled__c',
                'Dispatch_Worker_Name__c', 'Dispatch_Worker_Phone__c', 'Special_Instruction_from_PMS_Case_Auto__c',
                'CKSW_BASE__Incomplete_reason__c', 'CKSW_BASE__Other_Incomplete_Reason__c', 'Vendorsite__c'],
            'include': [
                {
                    'relation': 'appointment',
                    'scope': {
                        'fields': ['id', 'sfdcId', 'Customer_Appointment_Setup_Required__c', 'Worker_Arrival_DateTime_Cust_Requested__c',
                            'Worker_Arrival_Date_Customer_Req_End__c', 'Customer_Appointment_DateTime_Scheduled__c',
                            'Customer_Appointment_Start_Scheduled__c', 'Worker_Arrival_DateTime_Scheduled__c',
                            'Worker_Departure_Date_Time_Actual__c', 'Worker_End_DateTime_Scheduled__c',
                            'Worker_InProgress_Start_DateTime_Actual__c', 'Worker_Finish_Date_Time_Actual__c',
                            'Worker_Arrival_Date_Time_Actual__c']
                    }
                },
                {
                    'relation': 'worker',
                    'scope': {
                        'fields': ['sfdcId', 'Name', 'Dispatch_Worker_num__c', 'Work_Phone_Number__c', 'Vendorsite__c']
                    }
                }
            ]
        };
        this._jobApi.getJobDetailsById(reqObj).subscribe(
            result => {
                if (result && Object.keys(result).length > 0) {
                    this.job = result;
                    this.searchWorkerNames();
                    this.buildForm();
                } else {
                    this.errorMessage = 'No details to display.';
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                this.errorMessage = error.message;
                this._preloaderService.hidePreloader();
            }
        );
    }

    buildForm() {
        // JOB DISPATCH: INCOMPLETE
        this.formJobIncomplete = this.fb.group({
            CKSW_BASE__Incomplete_reason__c: [this.job.CKSW_BASE__Incomplete_reason__c],
            CKSW_BASE__Other_Incomplete_Reason__c: [this.job.CKSW_BASE__Other_Incomplete_Reason__c]
        });
        // Customer Appointment Status: Schedule Setup (Call Customer Now)
        this.formAppointmentStatus = this.fb.group({
            Appointment_Schedule_Status_Customer__c: [this.job.Appointment_Schedule_Status_Customer__c],
            Appointment_Schedule_Status_Customer_vms__c: [this.job.Appointment_Schedule_Status_Customer_vms__c],
            Phone_Scheduling_1st_Attempt_Unreachable__c: [this.job.Phone_Scheduling_1st_Attempt_Unreachable__c],
            Phone_Scheduling_2nd_Attempt_Unreachable__c: [this.job.Phone_Scheduling_2nd_Attempt_Unreachable__c],
            Phone_Scheduling_3rd_Attempt_Unreachable__c: [this.job.Phone_Scheduling_3rd_Attempt_Unreachable__c],
            Appointment_Call_Notes__c: [this.job.Appointment_Call_Notes__c]
        });
        // Customer Appointment Schedule (Call Customer Now)
        this.Customer_Appointment_DateTime_Scheduled =
            this.job.appointment && this.job.appointment.Customer_Appointment_DateTime_Scheduled__c ?
                new Date(this.job.appointment.Customer_Appointment_DateTime_Scheduled__c) : null;
        this.Customer_Appointment_Start_Scheduled = this.job.appointment && this.job.appointment.Customer_Appointment_Start_Scheduled__c ?
            new Date(this.job.appointment.Customer_Appointment_Start_Scheduled__c) : null;

        this.minAppointmentEndDate = this.Customer_Appointment_DateTime_Scheduled;

        this.formAppointmentCustomer = this.fb.group({
            Customer_Appointment_DateTime_Scheduled__c: [this.Customer_Appointment_DateTime_Scheduled],
            Customer_Appointment_Start_Scheduled__c: [this.Customer_Appointment_Start_Scheduled]
        });
        // Worker Appointment Setup
        this.Worker_Arrival_DateTime_Scheduled = this.job.appointment && this.job.appointment.Worker_Arrival_DateTime_Scheduled__c ?
            new Date(this.job.appointment.Worker_Arrival_DateTime_Scheduled__c) : null;
        this.Worker_End_DateTime_Scheduled = this.job.appointment && this.job.appointment.Worker_End_DateTime_Scheduled__c ?
            new Date(this.job.appointment.Worker_End_DateTime_Scheduled__c) : null;

        this.minWorkerEndDate = this.Worker_Arrival_DateTime_Scheduled;

        this.formAppointmentWorker = this.fb.group({
            Worker_Arrival_DateTime_Scheduled__c: [this.Worker_Arrival_DateTime_Scheduled],
            Worker_End_DateTime_Scheduled__c: [this.Worker_End_DateTime_Scheduled],
            Dispatch_Worker_Name__c: ['', [Validators.required]],
            Dispatch_Worker_Phone__c: ['', [Validators.required]]
        });
        // Visit Status
        this.Worker_Departure_Date_Time_Actual =
            this.job.appointment && this.job.appointment.Worker_Departure_Date_Time_Actual__c ?
                new Date(this.job.appointment.Worker_Departure_Date_Time_Actual__c) : null;
        this.Worker_Arrival_Date_Time_Actual =
            this.job.appointment && this.job.appointment.Worker_Arrival_Date_Time_Actual__c ?
                new Date(this.job.appointment.Worker_Arrival_Date_Time_Actual__c) : null;
        this.Worker_InProgress_Start_DateTime_Actual =
            this.job.appointment && this.job.appointment.Worker_InProgress_Start_DateTime_Actual__c ?
                new Date(this.job.appointment.Worker_InProgress_Start_DateTime_Actual__c) : null;
        this.Worker_Finish_Date_Time_Actual =
            this.job.appointment && this.job.appointment.Worker_Finish_Date_Time_Actual__c ?
                new Date(this.job.appointment.Worker_Finish_Date_Time_Actual__c) : null;

        this.minArrivalDate = this.Worker_Departure_Date_Time_Actual;
        this.minProgressDate = this.Worker_Arrival_Date_Time_Actual;
        this.minFinishDate = this.Worker_InProgress_Start_DateTime_Actual;

        this.formVisitStatus = this.fb.group({
            Worker_Departure_Date_Time_Actual__c: [this.Worker_Departure_Date_Time_Actual],
            Worker_Arrival_Date_Time_Actual__c: [this.Worker_Arrival_Date_Time_Actual],
            Worker_InProgress_Start_DateTime_Actual__c: [this.Worker_InProgress_Start_DateTime_Actual],
            Worker_Finish_Date_Time_Actual__c: [this.Worker_Finish_Date_Time_Actual]
        });

        this.formAppointmentWorker.controls['Dispatch_Worker_Phone__c'].setValue(this.job.Dispatch_Worker_Phone__c);
        if (this.job && this.job.Dispatch_Worker_Name__c && this.job.Vendorsite__c) {
            if (this.job.worker && this.job.worker.Vendorsite__c &&
                this.job.worker.Vendorsite__c === this.job.Vendorsite__c) {
                this.isSelected = true;
                this.formAppointmentWorker.controls['Dispatch_Worker_Name__c'].setValue(this.job.Dispatch_Worker_Name__c);
            }
        }

        // Add Worker modal
        this.formAssignWorker = this.fb.group({
            Dispatch_Worker_Name__c: [null],
        });
        this.formAddWorker = this.fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
            Work_Phone_Number__c: ['', [Validators.required, Validators.pattern(this.contactRegex)]],
            Vendorsite__c: [this.job.Vendorsite__c],
            accessType: 'vendor', /// will be replace when confirm
            Available__c: 1
        });
    }

    searchWorkerNames() {
        this.workers = [];
        if (this.job.Vendorsite__c) {
            this._workerApi.find({
                where: { Vendorsite__c: this.job.Vendorsite__c },
                fields: ['Name', 'id', 'sfdcId', 'Work_Phone_Number__c']
            }).subscribe(
                results => {
                    if (results) {
                        this.workers = results;
                    }
                }
            );
        }
    }

    updateJob(action: string) {
        let values = null;
        const message = 'Job has been updated successfully';
        if (action === 'job-incomplete') {
            values = this.formJobIncomplete.value;
        } else if (action === 'appointment-status') {
            values = this.formAppointmentStatus.value;
        } else if (action === 'appointment-worker') {
            if (this.formAppointmentWorker.valid && this.formAppointmentWorker.value &&
                this.formAppointmentWorker.value.Dispatch_Worker_Name__c &&
                this.formAppointmentWorker.value.Dispatch_Worker_Name__c !== null &&
                this.formAppointmentWorker.value.Dispatch_Worker_Name__c !== 'null'
            ) {
                values = this.formAppointmentWorker.value;
                this.updateAppointment(action);
            } else {
                this._alertService.error('Invalid values in WORKER APPOINTMENT SETUP Form');
            }
        }

        // update job details
        if (values) {
            this._preloaderService.showPreloader();
            this._jobApi.patchAttributes(this.job.id, values).subscribe(
                result => {
                    this._preloaderService.hidePreloader();
                    this._alertService.success(message);
                    this.updateData.emit('sidebar');
                    window.scrollTo(0, 0);
                },
                err => {
                    this._preloaderService.hidePreloader();
                    this._alertService.error(err.message);
                    window.scrollTo(0, 0);
                }
            );
        }
    }

    updateAppointment(action) {
        let values = null;
        let message = 'Appointment has been updated successfully';
        if (action === 'appointment-customer') {
            values = this.formAppointmentCustomer.value;
        } else if (action === 'appointment-worker') {
            values = this.formAppointmentWorker.value;
        } else if (action === 'visit-status') {
            values = this.formVisitStatus.value;
        }
        // update appointment details
        if (values && this.job.appointment) {
            this._preloaderService.showPreloader();
            this._appointmentApi.patchAttributes(this.job.appointment.id, values).subscribe(
                result => {
                    this._preloaderService.hidePreloader();
                    this._alertService.success(message);
                    this.updateData.emit('sidebar');
                    window.scrollTo(0, 0);
                },
                err => {
                    this._preloaderService.hidePreloader();
                    this._alertService.error(err.message);
                    window.scrollTo(0, 0);
                }
            );
        } else {
            message = 'Failed to update appointment.';
            this._alertService.error(message);
            window.scrollTo(0, 0);
        }
    }

    addTime(val: any, duration: any, unit: string) {
        const m = moment(val);
        const newDate = m.add(duration, unit);
        return newDate;
    }

    open(action, content, size) {
        if (action === 'Add Worker') {
            this.error = '';
            this._modalService.open(content, size);
        }
    }

    assignWorker() {
        this.error = '';
        const newWorker = this.formAssignWorker.controls['Dispatch_Worker_Name__c'].value;
        if (newWorker) {
            this.formAppointmentWorker.controls['Dispatch_Worker_Name__c'].setValue(newWorker);
            this._modalService.closed();
        } else {
            this.error = 'Please select worker.'
        }
    }

    addWorker() {
        this.error = '';
        this._workerApi.createWorker(this.formAddWorker.value).subscribe(
            result => {
                if (result.Worker.id) {
                    this._modalService.closed();
                    this._alertService.success('Worker has been added successfully.');
                    window.scrollTo(0, 0);
                    this.workers.push({
                        id: result['Worker']['id'],
                        Name: result['Worker']['Name']
                    });
                    this.formAddWorker.reset();
                } else {
                    this.error = 'Worker added successfully, please expect the latency time of 15 mins.'
                    // this.error = result.Worker.data.error.message;
                }
            },
            err => {
                this.error = err.message;
            }
        );
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
            this.formAppointmentWorker.controls['Dispatch_Worker_Phone__c'].setValue(selectedWorker['Work_Phone_Number__c']);
        } else {
            this.isSelected = false;
            this.formAppointmentWorker.controls['Dispatch_Worker_Phone__c'].setValue(selectedWorker);
        }
    }

    // clearPhone() {
    //     this.formAppointmentWorker.controls['Dispatch_Worker_Phone__c'].setValue('');
    // }

    onDateChange(source) {
        if (source === 'Appointment') {
            if (this.Customer_Appointment_DateTime_Scheduled > this.Customer_Appointment_Start_Scheduled) {
                this.Customer_Appointment_Start_Scheduled = null;
            }
            this.minAppointmentEndDate = this.Customer_Appointment_DateTime_Scheduled;
        } else if (source === 'Worker') {
            if (this.Worker_Arrival_DateTime_Scheduled > this.Worker_End_DateTime_Scheduled) {
                this.Worker_End_DateTime_Scheduled = null;
            }
            this.minWorkerEndDate = this.Worker_Arrival_DateTime_Scheduled;
        } else if (source === 'Departure') {
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
