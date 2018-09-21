import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreloaderService } from '../../../../../services/preloader.service';
import { JobApi } from '../../../../../sdk';

@Component({
    selector: 'job-detail-summary',
    templateUrl: './job-detail-summary.component.html',
    styleUrls: ['./job-detail-summary.component.css']
})

export class JobDetailSummaryComponent implements OnInit {
    @Input() jobId: string;
    private routeSubscription: any;
    job: any;
    errorMessage = '';

    constructor(
        private route: ActivatedRoute,
        private _preloaderService: PreloaderService,
        private _jobApi: JobApi,
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
            'fields': ['sfdcId', 'id', 'Dispatch_Service_Resolution_Status__c', 'Customer_Service_Type_From_Program__c',
                'Service_Dispatch_SLA_Priority_FrmProgram__c', 'Max_Hours_Units__c', 'csum__c', 'CKSW_BASE__Description__c',
                'Special_Instruction_from_PMS_Case_Auto__c', 'Asset_Model__c', 'Asset_Serial__c', 'Custom_work_order_instructions__c',
                'Jobsite_Name__c', 'Partner_Case_Number__c',
                'Does_this_Job_require_Service_Parts__c', 'Service_Parts_Local_Pickup_Required__c', 'Technical_Level__c',
                'Does_this_Job_require_New_Equip_Hardware__c', 'Equipment_Local_Pickup_Required__c',
                'Equipment_Delivery_Date_ETA__c', 'Equipment_Delivery_Time_ETA_Hours__c', 'Equipment_Tracking__c',
                'Jobsite_Contact_SDesk_Name_phone_email__c', 'Iron_Case__c',
                'Jobsite_Contact_Technical_Escalation__c', 'SOW_Work_Order__c', 'Job_Instruction_Details_Long__c'],
            'where': { 'sfdcId': jobId },
            'include': []
        };
        this._jobApi.getJobDetailsById(reqObj).subscribe(
            result => {
                if (result && Object.keys(result).length > 0) {
                    this.job = result;
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
}
