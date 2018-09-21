import { Component, Input, OnInit } from '@angular/core';
import { PreloaderService } from '../../../../../services/preloader.service';
import { AppStateService } from '../../../../../services/app-state.service';
import { ActivatedRoute } from '@angular/router';

import { CaseApi } from '../../../../../sdk/services/custom/Case';
import { UtilityService } from '../../../../../services/utility.service';

@Component({
    selector: 'service-manager-right-panel',
    templateUrl: './service-manager-right-panel.component.html',
    styleUrls: ['./service-manager-right-panel.component.css']
})

export class ServiceManagerRightPanelComponent implements OnInit {

    @Input() page: string;
    userState = {};
    caseId: any;
    errorMessage: string;
    case: any;
    caseData: any;
    jobsiteData: any;
    profileData: any;
    summaryStatus: any;
    governanceDetail: any;
    isInternalUser: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _caseApi: CaseApi,
        private _utilityService: UtilityService,
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.caseId = params['id'];
            this.case = [];
            this.caseData = [];
            this.jobsiteData = [];
            this.profileData = [];
            this.summaryStatus = [];
            this.governanceDetail = [];
            if (this.caseId) {
                this.getCaseDetails(this.caseId)
            }
        });
    }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }


    }

    getCaseDetails(caseId) {
        this._preloaderService.showPreloader();
        this._caseApi.fetchRightpanelData({ id: caseId }).subscribe(
            result => {
                this.case = result;
                var workerStatus = 'PENDING'
                if (this.case.Job && this.case.Job.appointment && this.case.Job.appointment.Worker_Arrival_Date_Time_Actual__c) {
                    workerStatus = 'Arrived at ' + this._utilityService.dateFormate(this.case.Job.appointment.Worker_Arrival_Date_Time_Actual__c);
                    if (this.case.Job && this.case.Job.appointment && this.case.Job.appointment.Worker_Finish_Date_Time_Actual__c) {
                        workerStatus += ' ' + 'and finished at ' + this._utilityService.dateFormate(this.case.Job.appointment.Worker_Finish_Date_Time_Actual__c);
                    }
                }
                (this.case.Job && this.case.Job.appointment && this.case.Job.appointment.Worker_Arrival_Date_Time_Actual__c) ? this.case.Job.appointment.Worker_Arrival_Date_Time_Actual__c : '',
                    (this.case.Job && this.case.Job.appointment && this.case.Job.appointment.Worker_Finish_Date_Time_Actual__c) ? this.case.Job.appointment.Worker_Finish_Date_Time_Actual__c : '',
                    this.caseData = {
                        CaseNumber: (this.case.CaseNumber) ? this.case.CaseNumber : '',
                        Partner_Case_Number__c: (this.case.Partner_Case_Number__c) ? this.case.Partner_Case_Number__c : '',
                        workOrderNumber: (this.case.workOrder && this.case.workOrder.Name) ? this.case.workOrder.Name : '',
                    }

                this.jobsiteData = (this.case.Jobsite) ? this.case.Jobsite : '';
                this.profileData = {
                    profileInfo: {
                        serviceType: this.case.Customer_Service_Type__c,
                        talentType: this.case.Talent_Type__c,
                        technicalLevel: this.case.Service_Technical_Level__c,
                        sla: this.case.Dispatch_SLA_Priority__c,
                        coverage: this.case.Coverage_Hours__c,
                        ppm: this.case.PPE_Hours__c
                    }
                }
                this.summaryStatus = {
                    jobInfo: {
                        jobDispatchStatus: (this.case.Job && this.case.Job.Job_Status_Internal__c) ? this.case.Job.Job_Status_Internal__c : '',
                        workerExpertiseType: (this.case.Job && this.case.Job.Technical_Level__c) ? this.case.Job.Technical_Level__c : '',
                        Deliverable_Status__c: (this.case.Job && this.case.Job.Deliverable_Status__c) ? this.case.Job.Deliverable_Status__c : ''
                    },
                    contactInfo: {
                        customerName: (this.case.Job && this.case.Job.Location_Name__c) ? this.case.Job.Location_Name__c : '',
                        customerPhone: (this.case.Job && this.case.Job.Customer_Contact_Phone__c) ? this.case.Job.Customer_Contact_Phone__c : '',
                    },
                    workerInfo: {
                        workerName: (this.case.Job && this.case.Job.worker && this.case.Job.worker.Name) ? this.case.Job.worker.Name : '',
                        workerPhone: (this.case.Job && this.case.Job.Dispatch_Worker_Phone__c) ? this.case.Job.Dispatch_Worker_Phone__c : '',
                        workerVisitStatus: workerStatus
                    },
                    appointmentInfo: {
                        workerArrivalDateTimeCR: (this.case.Job && this.case.Job.appointment && this.case.Job.appointment.Worker_Arrival_DateTime_Cust_Requested__c) ? this.case.Job.appointment.Worker_Arrival_DateTime_Cust_Requested__c : '',
                        CustAppointmentDTScheduledC: (this.case.Job && this.case.Job.appointment && this.case.Job.appointment.Customer_Appointment_DateTime_Scheduled__c) ? this.case.Job.appointment.Customer_Appointment_DateTime_Scheduled__c : '',
                        workerArrivalDTScheduledC: (this.case.Job && this.case.Job.appointment && this.case.Job.appointment.Worker_Arrival_DateTime_Scheduled__c) ? this.case.Job.appointment.Worker_Arrival_DateTime_Scheduled__c : '',
                        workerEndDTScheduledC: (this.case.Job && this.case.Job.appointment && this.case.Job.appointment.Worker_End_DateTime_Scheduled__c) ? this.case.Job.appointment.Worker_End_DateTime_Scheduled__c : '',
                        Worker_Arrival_Date_Time_Actual__c: (this.case.Job && this.case.Job.appointment && this.case.Job.appointment.Worker_Arrival_Date_Time_Actual__c) ? this.case.Job.appointment.Worker_Arrival_Date_Time_Actual__c : '',
                        Worker_Finish_Date_Time_Actual__c: (this.case.Job && this.case.Job.appointment && this.case.Job.appointment.Worker_Finish_Date_Time_Actual__c) ? this.case.Job.appointment.Worker_Finish_Date_Time_Actual__c : '',
                        Worker_InProgress_Start_DateTime_Actual__c: (this.case.Job && this.case.Job.appointment && this.case.Job.appointment.Worker_InProgress_Start_DateTime_Actual__c) ? this.case.Job.appointment.Worker_InProgress_Start_DateTime_Actual__c : '',
                        Worker_Departure_Date_Time_Actual__c: (this.case.Job && this.case.Job.appointment && this.case.Job.appointment.Worker_Departure_Date_Time_Actual__c) ? this.case.Job.appointment.Worker_Departure_Date_Time_Actual__c : ''

                    }

                }
                this.governanceDetail = {
                    iccHealthCheck: {
                        isAvailable: (this.case.appointment && this.case.appointment.Case) ? true : false,
                        Health_Jobsite_Status__c: (this.case.appointment && this.case.appointment.Case && this.case.appointment.Case.Health_Jobsite_Status__c) ? this.case.appointment.Case.Health_Jobsite_Status__c : '',
                        Health_Project_status__c: (this.case.appointment && this.case.appointment.Case && this.case.appointment.Case.Health_Project_status__c) ? this.case.appointment.Case.Health_Project_status__c : '',
                        Health_OrderItem_Status__c: (this.case.appointment && this.case.appointment.Case && this.case.appointment.Case.Health_OrderItem_Status__c) ? this.case.appointment.Case.Health_OrderItem_Status__c : '',
                        Health_Vendor_Status__c: (this.case.appointment && this.case.appointment.Case && this.case.appointment.Case.Health_Vendor_Status__c) ? this.case.appointment.Case.Health_Vendor_Status__c : '',
                        Health_Customer_Pricelist_Status__c: (this.case.appointment && this.case.appointment.Case && this.case.appointment.Case.Health_Customer_Pricelist_Status__c) ? this.case.appointment.Case.Health_Customer_Pricelist_Status__c : '',
                        Health_Pricelist_Status__c: (this.case.appointment && this.case.appointment.Case && this.case.appointment.Case.Health_Pricelist_Status__c) ? this.case.appointment.Case.Health_Pricelist_Status__c : '',
                        Health_Program_Pricelist__c: (this.case.appointment && this.case.appointment.Case && this.case.appointment.Case.Health_Program_Pricelist__c) ? this.case.appointment.Case.Health_Program_Pricelist__c : '',
                        Health_Asset_Sku_Comparison__c: (this.case.appointment && this.case.appointment.Case && this.case.appointment.Case.Health_Asset_Sku_Comparison__c) ? this.case.appointment.Case.Health_Asset_Sku_Comparison__c : '',
                        Health_SDesk_Contact__c: (this.case.appointment && this.case.appointment.Case && this.case.appointment.Case.Health_SDesk_Contact__c) ? this.case.appointment.Case.Health_SDesk_Contact__c : '',
                        Health_TEsc_Contact__c: (this.case.appointment && this.case.appointment.Case && this.case.appointment.Case.Health_TEsc_Contact__c) ? this.case.appointment.Case.Health_TEsc_Contact__c : '',
                        Health_SKU_Price_Status__c: (this.case.appointment && this.case.appointment.Case && this.case.appointment.Case.Health_SKU_Price_Status__c) ? this.case.appointment.Case.Health_SKU_Price_Status__c : ''
                    },

                    pmsHealthCheck: {
                        Health_Jobsite_Status__c: this.case.Health_Jobsite_Status__c,
                        Health_Project_status__c: this.case.Health_Project_status__c,
                        Health_OrderItem_Status__c: this.case.Health_OrderItem_Status__c,
                        Health_Vendor_Status__c: this.case.Health_Vendor_Status__c,
                        Health_Customer_Pricelist_Status__c: this.case.Health_Customer_Pricelist_Status__c,
                        Health_Pricelist_Status__c: this.case.Health_Pricelist_Status__c,
                        Health_Program_Pricelist__c: this.case.Health_Program_Pricelist__c,
                        Health_Asset_Sku_Comparison__c: this.case.Health_Asset_Sku_Comparison__c,
                        Health_SDesk_Contact__c: this.case.Health_SDesk_Contact__c,
                        Health_TEsc_Contact__c: this.case.Health_TEsc_Contact__c,
                        Health_SKU_Price_Status__c: this.case.Health_SKU_Price_Status__c,
                    },

                    workOrderHealth: {
                        isAvailable: (this.case.workOrder) ? true : false,
                        Health_SOP_Profile_Status__c: (this.case.workOrder && this.case.workOrder.Health_SOP_Profile_Status__c) ? this.case.workOrder.Health_SOP_Profile_Status__c : '',
                        Health_Pricelist_Status__c: (this.case.workOrder && this.case.workOrder.Health_Pricelist_Status__c) ? this.case.workOrder.Health_Pricelist_Status__c : '',
                        Health_Customer_Price_Available__c: (this.case.workOrder && this.case.workOrder.Health_Customer_Price_Available__c) ? this.case.workOrder.Health_Customer_Price_Available__c : '',
                        Health_Vendor_Price_Available__c: (this.case.workOrder && this.case.workOrder.Health_Vendor_Price_Available__c) ? this.case.workOrder.Health_Vendor_Price_Available__c : '',
                        Health_Appointment_status__c: (this.case.workOrder && this.case.workOrder.Health_Appointment_status__c) ? this.case.workOrder.Health_Appointment_status__c : '',
                    },
                    jobHealthStatus: {
                        Health_Vendor_Status__c: (this.case.Job && this.case.Job.Health_Vendor_Status__c) ? this.case.Job.Health_Vendor_Status__c : '',
                        Health_Project_Status__c: (this.case.Job && this.case.Job.Health_Project_Status__c) ? this.case.Job.Health_Project_Status__c : '',
                        Health_Case_Status__c: (this.case.Job && this.case.Job.Health_Case_Status__c) ? this.case.Job.Health_Case_Status__c : '',
                        Health_Jobsite_Status__c: (this.case.Job && this.case.Job.Health_Jobsite_Status__c) ? this.case.Job.Health_Jobsite_Status__c : '',
                        Health_Worker_Status__c: (this.case.Job && this.case.Job.Health_Worker_Status__c) ? this.case.Job.Health_Worker_Status__c : '',
                        Health_List_Price_Status__c: (this.case.Job && this.case.Job.Health_List_Price_Status__c) ? this.case.Job.Health_List_Price_Status__c : '',
                        Health_FMS_Submission_Status__c: (this.case.Job && this.case.Job.Health_FMS_Submission_Status__c) ? this.case.Job.Health_FMS_Submission_Status__c : '',
                        Health_Completion_Status__c: (this.case.Job && this.case.Job.Health_Completion_Status__c) ? this.case.Job.Health_Completion_Status__c : '',
                    }

                }
                this._preloaderService.hidePreloader();
            },
            error => {
                this.errorMessage = error.message;
                this._preloaderService.hidePreloader();
            });
    }
}
