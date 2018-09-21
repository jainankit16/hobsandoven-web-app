import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PreloaderService } from './../../../../../../services/preloader.service';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AlertService } from './../../../../../../services/alert.service'
import { SharedService } from 'shared/services/pms/shared.services';
import { AppStateService } from '../../../../../../services/app-state.service';

import { CaseApi } from './../../../../../../sdk/services/custom/Case';
import { AppointmentApi } from './../../../../../../sdk/services/custom/Appointment';

@Component({
    selector: 'app-pms-worker-appointment',
    templateUrl: './pms-worker-appointment.component.html',
    styleUrls: ['./pms-worker-appointment.component.css']
})

export class PmsWorkerAppointmentComponent implements OnInit, OnDestroy {

    @Input() page: string;
    @Input() caseId: string;
    caseData: any;
    isInternalUser = false;
    formAppointmentWorker: FormGroup;
    hours = new Array(24);
    minuts = new Array(4);
    private appointment: any;
    caseAppointment: any;
    isEdit = false;
    private subscription: Subscription;

    constructor(
        private _fb: FormBuilder,
        private _alertService: AlertService,
        private _appState: AppStateService,
        private _sharedService: SharedService,
        private _preloaderService: PreloaderService,
        private _caseApi: CaseApi,
        private _appointmentApi: AppointmentApi
    ) { }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }
        this.buildForm();
        this.subscription = this._sharedService.getUserState().subscribe(current => {
            window.scroll(0, 0);
            if (current['servicemanager'] && current['servicemanager']['case']) {
                if (current['servicemanager']['case'] && current['servicemanager']['case']['caseId']) {
                    this.getAppointmentData(current['servicemanager']['case']['caseId']);
                } else {
                    console.error('caseId is reqired to get worker appointment');
                }
            }
        });
    }

    getAppointmentData(caseId) {
        this._preloaderService.showPreloader();
        this._caseApi.fetchCaseAppointment({ where: { id: caseId } })
            .subscribe(caseAppointment => {
                this.caseAppointment = caseAppointment;
                if (caseAppointment['appointment']) {
                    this.appointment = caseAppointment['appointment'];
                } else {
                    this.appointment = {};
                }
                this.buildForm();
                this._preloaderService.hidePreloader();
            }, error => {
                console.log(error);
                this._preloaderService.hidePreloader();

            });
    }

    buildForm() {
        // Worker Appointment Setup
        this.formAppointmentWorker = this._fb.group({
            sfdcId: [(this.appointment) ? this.appointment.sfdcId : ''],
            Worker_Arrival_Date_Customer_Requested__c: [''],
            Worker_Arrival_Hours_Customer_Requested__c: ['-1'],
            Worker_Arrival_Minute_Customer_Requested__c: ['-1'],
            Customer_Appointment_DateTime_Scheduled__c: [''],
            Customer_Appointment_Start_HRS_Scheduled__c: ['-1'],
            Customer_Apptmnt_Start_Minutes_Scheduled__c: ['-1'],
            Worker_Arrival_Date_Scheduled__c: [''],
            Worker_Arrival_Time_Hours_Scheduled__c: ['-1'],
            Worker_Arrival_Time_Minutes_Scheduled__c: ['-1'],
            Worker_End_Date_Scheduled__c: [''],
            Worker_End_Time_Hours_Scheduled__c: ['-1'],
            Worker_End_Time_Minutes_Scheduled__c: ['-1'],
            Worker_Arrival_Date_Time_Actual__c: [''],
            Worker_Arrival_Hours_Actual__c: ['-1'],
            Worker_Arrival_Minutes_Actual__c: ['-1'],
            Worker_Finish_Date_Time_Actual__c: [''],
            Worker_Finish_Time_Hour_Actual__c: ['-1'],
            Worker_Finish_Time_Minutes_Actual__c: ['-1'],
            Worker_InProgress_Start_DateTime_Actual__c: [''],
            Worker_In_Progress_Start_Hour_Actual__c: ['-1'],
            Worker_In_Progress_Start_Minute_Actual__c: ['-1'],
            Worker_Departure_Date_Time_Actual__c: ['']
        });
        if (this.appointment !== undefined) {
            const setControlValues = this.formAppointmentWorker.controls;
            const setAptmnt = this.appointment;
            this.setValues(setControlValues, setAptmnt);

        }

    }

    updateAppointment() {
        if (this.formAppointmentWorker.value && this.formAppointmentWorker.value.sfdcId) {
            this._preloaderService.showPreloader();
            this._appointmentApi.updateAll({ sfdcId: this.formAppointmentWorker.value.sfdcId }, this.formAppointmentWorker.value)
                .subscribe(result => {
                    this.appointment = this.formAppointmentWorker.value;
                    this._alertService.success('Appointment has been updated successfully.');
                    this.isEdit = false;
                    this._preloaderService.hidePreloader();
                },
                    err => {
                        console.error(err);
                        this._alertService.error(err.message);
                        this._preloaderService.hidePreloader();
                    });
        } else {
            this._alertService.error('Appointment is not available for this case.');
        }
    }

    edit(event) {
        this.isEdit = event;
    }

    parseDateTime(hrs, min) {
        if (hrs) {
            hrs = (hrs === '-1') ? '00' : hrs;
            min = (min === '-1') ? '00' : min;
            const type = (hrs <= 12) ? ' AM' : ' PM';
            const date = ((+hrs % 12) || hrs) + ':' + min + type;
            return date;
        }

    }

    setValues(setControlValues, setAptmnt) {
        setControlValues['Worker_Arrival_Date_Customer_Requested__c'].
            setValue(setAptmnt.Worker_Arrival_Date_Customer_Requested__c);
        if (setAptmnt.Worker_Arrival_Hours_Customer_Requested__c) {
            setControlValues['Worker_Arrival_Hours_Customer_Requested__c'].
                setValue(setAptmnt.Worker_Arrival_Hours_Customer_Requested__c);
        }
        if (setAptmnt.Worker_Arrival_Minute_Customer_Requested__c) {
            setControlValues['Worker_Arrival_Minute_Customer_Requested__c'].
                setValue(setAptmnt.Worker_Arrival_Minute_Customer_Requested__c);
        }

        setControlValues['Customer_Appointment_DateTime_Scheduled__c'].
            setValue(setAptmnt.Customer_Appointment_DateTime_Scheduled__c);

        if (setAptmnt.Customer_Appointment_Start_HRS_Scheduled__c) {
            setControlValues['Customer_Appointment_Start_HRS_Scheduled__c'].
                setValue(setAptmnt.Customer_Appointment_Start_HRS_Scheduled__c);
        }
        if (setAptmnt.Customer_Apptmnt_Start_Minutes_Scheduled__c) {
            setControlValues['Customer_Apptmnt_Start_Minutes_Scheduled__c'].
                setValue(setAptmnt.Customer_Apptmnt_Start_Minutes_Scheduled__c);
        }

        setControlValues['Worker_Arrival_Date_Scheduled__c'].
            setValue(setAptmnt.Worker_Arrival_Date_Scheduled__c);

        if (setAptmnt.Worker_Arrival_Time_Hours_Scheduled__c) {
            setControlValues['Worker_Arrival_Time_Hours_Scheduled__c'].
                setValue(setAptmnt.Worker_Arrival_Time_Hours_Scheduled__c);
        }
        if (setAptmnt.Worker_Arrival_Time_Minutes_Scheduled__c) {
            setControlValues['Worker_Arrival_Time_Minutes_Scheduled__c'].
                setValue(setAptmnt.Worker_Arrival_Time_Minutes_Scheduled__c);
        }

        setControlValues['Worker_End_Date_Scheduled__c'].
            setValue(setAptmnt.Worker_End_Date_Scheduled__c);

        if (setAptmnt.Worker_End_Time_Hours_Scheduled__c) {
            setControlValues['Worker_End_Time_Hours_Scheduled__c'].
                setValue(setAptmnt.Worker_End_Time_Hours_Scheduled__c);
        }
        if (setAptmnt.Worker_End_Time_Minutes_Scheduled__c) {
            setControlValues['Worker_End_Time_Minutes_Scheduled__c'].
                setValue(setAptmnt.Worker_End_Time_Minutes_Scheduled__c);
        }

        setControlValues['Worker_Arrival_Date_Time_Actual__c'].
            setValue(setAptmnt.Worker_Arrival_Date_Time_Actual__c);

        if (setAptmnt.Worker_Arrival_Hours_Actual__c) {
            setControlValues['Worker_Arrival_Hours_Actual__c'].
                setValue(setAptmnt.Worker_Arrival_Hours_Actual__c);
        }
        if (setAptmnt.Worker_Arrival_Minutes_Actual__c) {
            setControlValues['Worker_Arrival_Minutes_Actual__c'].
                setValue(setAptmnt.Worker_Arrival_Minutes_Actual__c);
        }

        setControlValues['Worker_Finish_Date_Time_Actual__c'].
            setValue(setAptmnt.Worker_Finish_Date_Time_Actual__c);

        if (setAptmnt.Worker_Finish_Time_Hour_Actual__c) {
            setControlValues['Worker_Finish_Time_Hour_Actual__c'].
                setValue(setAptmnt.Worker_Finish_Time_Hour_Actual__c
                );
        }
        if (setAptmnt.Worker_Finish_Time_Minutes_Actual__c) {
            setControlValues['Worker_Finish_Time_Minutes_Actual__c'].
                setValue(setAptmnt.Worker_Finish_Time_Minutes_Actual__c);
        }

        setControlValues['Worker_InProgress_Start_DateTime_Actual__c'].
            setValue(setAptmnt.Worker_InProgress_Start_DateTime_Actual__c);

        if (setAptmnt.Worker_In_Progress_Start_Hour_Actual__c) {
            setControlValues['Worker_In_Progress_Start_Hour_Actual__c'].
                setValue(setAptmnt.Worker_In_Progress_Start_Hour_Actual__c);
        }
        if (setAptmnt.Worker_In_Progress_Start_Minute_Actual__c) {
            setControlValues['Worker_In_Progress_Start_Minute_Actual__c'].
                setValue(setAptmnt.Worker_In_Progress_Start_Minute_Actual__c);
        }

        setControlValues['Worker_Departure_Date_Time_Actual__c'].
            setValue(setAptmnt.Worker_Departure_Date_Time_Actual__c);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

    }
}
