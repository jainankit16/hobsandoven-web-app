import { Component, OnInit, Input } from '@angular/core';
import { JobApi } from '../../../../../sdk';
import { PreloaderService } from '../../../../../services/preloader.service';

@Component({
    selector: 'job-detail-vendor',
    templateUrl: './job-detail-vendor.component.html',
    styleUrls: ['./job-detail-vendor.component.css']
})
export class JobDetailVendorComponent implements OnInit {
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
            'fields': ['id', 'sfdcId', 'Vendor__c'],
            'include': [
                {
                    'relation': 'vendor',
                    'scope': {
                        'fields': ['sfdcId', 'Name', 'Service_Global_Ref__c', 'zeitzone__BillingLTFactor__c', 'ShippingStreet',
                            'ShippingCity', 'ShippingState', 'ShippingCountry', 'ShippingPostalCode', 'Shipping_country_Code__c',
                            'Standard_Supported_FSL__c']
                    }
                }
            ]
        };
        this._jobApi.getJobDetailsById(reqObj).subscribe(
            result => {
                if (result && Object.keys(result).length > 0) {
                    this.job = result;
                    let address = '';
                    if (this.job.vendor) {
                        address += this.job.vendor.ShippingStreet ? this.job.vendor.ShippingStreet + ', ' : '';
                        address += this.job.vendor.ShippingCity ? this.job.vendor.ShippingCity + ', ' : '';
                        address += this.job.vendor.ShippingState ? this.job.vendor.ShippingState + ', ' : '';
                        address += this.job.vendor.ShippingCountry ? this.job.vendor.ShippingCountry : '';
                        this.job.address = address;
                    }
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                this._preloaderService.hidePreloader();
                console.log(error);
            }
        );
    }

}
