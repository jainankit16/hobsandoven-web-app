import { Component, OnInit, Input } from '@angular/core';
import { JobApi } from '../../../../../sdk';
import { PreloaderService } from '../../../../../services/preloader.service';

@Component({
    selector: 'job-detail-hardware-info',
    templateUrl: './job-detail-hardware-info.component.html',
    styleUrls: ['./job-detail-hardware-info.component.css']
})

export class JobDetailHardwareInfoComponent implements OnInit {

    @Input() jobId: string;
    job: any;
    errorMessage = '';

    constructor(
        private _preloaderService: PreloaderService,
        private _jobApi: JobApi,
    ) { }

    ngOnInit() {
        if (this.jobId) {
            this.loadData(this.jobId);
        } else {
            this.errorMessage = 'No details to display.';
        }
    }

    loadData(jobId) {
        const reqObj = {
            'where': { 'sfdcId': jobId },
            'fields': ['sfdcId', 'RecordTypeId', 'Does_this_Job_require_Service_Parts__c', 'Service_Parts_Local_Pickup_Required__c',
                'Does_this_Job_require_New_Equip_Hardware__c', 'Equipment_Local_Pickup_Required__c', 'Equipment_Delivery_Date_ETA__c',
                'Equipment_Tracking__c', 'Equipment_Delivery_Time_ETA_Hours__c', 'Equipment_Delivery_Time_ETA_Minutes__c', 'Asset_Model__c',
                'Asset_Name__c', 'Work_Order__c', 'Asset_Serial__c', 'Row__c', 'Suite__c', 'Rack_Sub_Position_Slot__c',
                'Rack_Sub_Position__c', 'Rack_Side__c', 'Rack_Serial__c', 'Rack_Kit_Top_of_Switch__c', 'Rack__c']
        };
        this._jobApi.getJobDetailsById(reqObj).subscribe(
            result => {
                if (result && Object.keys(result).length > 0) {
                    this.job = result;
                    if (this.job.RecordTypeId === '0121a000000F1eoAAE' && this.job.hasHardwareData && this.job.hardwareInfoData) {
                        this.job = this.job.hardwareInfoData;
                    }
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
