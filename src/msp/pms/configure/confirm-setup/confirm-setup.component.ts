import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Rx';

import { PreloaderService } from './../../../../shared/services/preloader.service';
import { SharedService } from '../../../../shared/services/pms/shared.services';
import { AppStateService } from './../../../../shared/services/app-state.service';
import { QuoteService } from '../../../../shared/services/pms/quote.service';

import { ProjectApi, JobsiteProjectsApi, JobOrderItemApi, WorkOrderApi, AccountApi } from './../../../../shared/sdk';

@Component({
    selector: 'app-confirm-setup',
    templateUrl: './confirm-setup.component.html'
})

export class ConfirmSetupComponent implements OnInit, OnDestroy {

    selectedAccountId: string;
    userState: any;
    selectedQuote: any;
    jobInstructions: any;
    quoteLineManager: any;
    appointment: any;
    isStepCompleted = false;
    errorMsg = '';
    successMsg = '';
    private subscription: Subscription;
    Vendor_Pricelist_Auto__c: '';
    Customer_Pricelist_Auto__c: '';
    source: string;

    constructor(
        private _router: Router,
        private _sharedService: SharedService,
        private _appState: AppStateService,
        private _quoteService: QuoteService,
        private _preloaderService: PreloaderService,
        private _jobsiteProjectsApi: JobsiteProjectsApi,
        private _projectApi: ProjectApi,
        private _workOrderApi: WorkOrderApi,
        private _accountApi: AccountApi,
        private _jobOrderItemApi: JobOrderItemApi
    ) {
        this._sharedService.pushactivewizard(6);
        this._sharedService.getUserState().subscribe(current => {
            if (current.program) {
                this.userState = current;
            } else {
                this.goBack();
            }
        });
    }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        this._sharedService.getFilteredQuoteLineObj().take(1).subscribe(data => {
            if (data && data.length) {
                this.quoteLineManager = data;
                this.getProgramInstruction(this.userState.program.programSFId);
                this.findPriceListByType(this.selectedAccountId, 'partner')
                this.findPriceListByType(this.quoteLineManager[0]['Vendor_Account__c'], 'vendor')
            }
        });
        this._quoteService.getWorkOrderDetails().take(1).subscribe(data => {
            this.appointment = data;
        });
    }

    getProgramInstruction(programSFId) {
        this._projectApi.find({
            where: { sfdcId: programSFId },
            fields: ['sfdcId', 'SOW_Description_Customer_Long__c', 'Description__c', 'Required_Tools__c']
        }).subscribe(res => {
            if (res.length) {
                this.jobInstructions = {
                    SOW_Description_Customer_Long__c: res[0]['SOW_Description_Customer_Long__c'],
                    Description__c: res[0]['Description__c'],
                    Required_Tools__c: res[0]['Required_Tools__c']
                }
                this.findJobInstruction() // finds job instructions for the selected quote
            } else {
                this.jobInstructions = {
                    SOW_Description_Customer_Long__c: '',
                    Description__c: '',
                    Required_Tools__c: ''
                }
            }
        }, err => {
            console.log('error', err.messages);
        })

    }

    ngOnDestroy() {
        if (!this.source) {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.userState.program = {};
            this.userState.quote = {};
            this._sharedService.setUserState(this.userState);
        }
    }

    findJobInstruction() {
        this._jobsiteProjectsApi.find({
            include: {
                relation: 'Project'
            },
            where: { Jobsite__c: this.quoteLineManager[0]['Jobsite__c'] }
        }).subscribe(data => {
            if (data && data.length) {
                this.jobInstructions['Job_Instructions_Special_Instructions__c'] = data[0]['Project']['Special_Service_Instructions__c']
            } else {
                this.setToEmpty();
            }
        }, err => {
            this.setToEmpty();
        });
    }

    setToEmpty() {
        this.jobInstructions['Job_Instructions_Special_Instructions__c'] = '';
    }

    generateWorkOrder() {
        this._preloaderService.showPreloader()
        const workOrderObj = {
            Status__c: 'Draft',
            Partner__c: this.selectedAccountId,
            Project_SOP__c: this.userState.program.programSFId,
            Work_Summary__c: this.appointment['WorkOrderSummary'],
            Job_Instructions_Required_Tools__c: this.jobInstructions['Required_Tools__c'],
            Job_Instructions_Training_Documents__c: this.jobInstructions['Description__c'],
            Job_Instructions_Service_Deliverables__c: this.jobInstructions['SOW_Description_Customer_Long__c'],
            Job_Instructions_Special_Instructions__c: this.jobInstructions['Job_Instructions_Special_Instructions__c'],
            RecordTypeId: '0121a0000006RM1AAM',
            Partner_Case_Number__c: this.appointment['partnerCaseNumber'],
            Partner_PO_Number__c: this.appointment['partnerPONumber']
        };

        const jobOrderItemObj = {
            Order_Quantity__c: this.quoteLineManager[0]['Order_Quantity__c'],
            SKU__c: this.quoteLineManager[0]['Product__c'],
            Order_Quantity_FTE_Hours__c: '0',
            Talent_Type__c: this.quoteLineManager[0]['Talent_Type__c'],
            List_Price_Customer__c: this.quoteLineManager[0]['Price__c'],
            List_Price_Vendor__c: this.quoteLineManager[0]['Vendor_Cost__c'],
            Vendor__c: this.quoteLineManager[0]['Vendor_Account__c'],
            Customer_Pricelist_Auto__c: this.Customer_Pricelist_Auto__c,
            Vendor_Pricelist_Auto__c: this.Vendor_Pricelist_Auto__c,
            JobSite__c: this.quoteLineManager[0]['JobSite__c']
        };

        const appointmentObj = {
            'Partner__c': this.selectedAccountId,
            'Appointment_Schedule_Information__c': this.appointment.scheduleType,
            'CustomerAppointment_Schedule_StartDate__c': this.appointment.startDate,
            'Appointment_Schedule_Start_hour__c': this.appointment.startHour,
            'Appointment_Schedule_Start_Minute__c': this.appointment.startMin,
        };

        if (this.appointment.scheduleType === 'Pre-Scheduled Appointment(Enter Date/Time (Local Time Zone) below)') {
            const dateSelected = this.appointment.startDate;
            dateSelected.setHours(this.appointment.startHour, this.appointment.startMin);
            appointmentObj['Customer_Appointment_DateTime_Scheduled__c'] = dateSelected;
            appointmentObj['Worker_Arrival_DateTime_Cust_Requested__c'] = dateSelected;
        }

        this._workOrderApi.createWorkOrder({
            workorder: workOrderObj,
            workorderitem: jobOrderItemObj,
            appointment: appointmentObj
        }).subscribe(wom => {
            if (wom) {
                this.successMsg = 'Work Order Created Successfully. Latest creation will be available after 5 minutes.'
                this.isStepCompleted = true;
                this._preloaderService.hidePreloader();
                window.scrollTo(0, 0);
            } else {
                console.log('Work Order creation failed');
                this._preloaderService.hidePreloader()
            }
        }, err => {
            console.log(err);
            this._preloaderService.hidePreloader()
        });
    }

    findPriceListByType(id, type) {
        this._preloaderService.showPreloader()
        this._accountApi
            .findOne({
                where: {
                    sfdcId: id
                },
                fields: ['Default_Pricelist__c']
            })
            .subscribe(data => {
                //     console.log('findPriceListByType>>>', data)
                if (type === 'vendor') {
                    this.Vendor_Pricelist_Auto__c = data['Default_Pricelist__c']
                } else {
                    this.Customer_Pricelist_Auto__c = data['Default_Pricelist__c']
                }
                this._preloaderService.hidePreloader()
            });
    }

    goBack(): void {
        this.source = 'back';
        this._router.navigate(['/pms/configure/schedule'])
    }

    createNewWorkOrder() {
        this.userState.quote = {};
        this.userState.program = {};
        this._router.navigate(['/pms/configure/schedule'])
    }
}
