import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductApi } from '../../../../../shared/sdk/services/custom/Product';
import { jobLocationMapService } from '../../../../../shared/services/pms/job-location.service';
import { SharedService } from '../../../../../shared/services/pms/shared.services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'summary',
    templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit, OnDestroy {

    pricingListPerJobsites: any[] = [];
    isQuoteEnabled = true;
    isServiceProvider = false;
    private subscription: Subscription;

    constructor(
        private _sharedService: SharedService,
        private _jobLocationService: jobLocationMapService,
        private _productService: ProductApi,
        private _location: Location,
        private _router: ActivatedRoute
    ) { }

    ngOnInit() {
        this._sharedService.activewizard$.subscribe(data => {
            if (data === 2 || data === 4) {
                this.isQuoteEnabled = false;
            } else {
                this.isQuoteEnabled = true;
            }

            if (data === 3) {
                this.isServiceProvider = true;
            } else {
                this.isServiceProvider = false;
            }
        });
        if (this._location.path().indexOf('schedule') !== -1) {
            this.subscription = this._sharedService.getFilteredQuoteLineObj().subscribe(data => {
                this.setPricingData(data);
            });
        } else if (this._location.path().indexOf('program') === -1 && this._location.path().indexOf('instruction') === -1) {
            this.subscription = this._sharedService.getQuoteLineObj().subscribe(data => {
                this.setPricingData(data);
            });
        }

        if (this._location.path().indexOf('program') !== -1) {
            this.isQuoteEnabled = false
        } else {
            this.isQuoteEnabled = true
        }
        if (this._location.path().lastIndexOf('pricing') === 15) {
            this.isServiceProvider = true;
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    setPricingData(data) {
        if (data && data.length) {
            this.pricingListPerJobsites = data;
            this.findProductForQuoteLine(this.pricingListPerJobsites);
        } else {
            this.pricingListPerJobsites = [];
        }
    }

    findProductForQuoteLine(array) {
        this.pricingListPerJobsites = [];
        array.forEach((obj, index) => {
            const chrsPos = (obj.Dispatch_SLA_Priority__c) ? obj.Dispatch_SLA_Priority__c.indexOf('(') : '';
            const chrs = (obj.Dispatch_SLA_Priority__c) ? obj.Dispatch_SLA_Priority__c.substr(chrsPos + 1) : '';
            this._productService
                .find({
                    where: {
                        GEO_Country__c: obj.Jobsite.GeoMetro.GEO_Country__c,
                        Talent_Type__c: obj.Talent_Type__c,
                        Coverage_Hours__c: obj.CoverageHour__c,
                        Service_Technical_Level__c: obj.Service_Engineer_Technical_Level__c,
                        SLA__c: (chrs) ? chrs.replace(')', '') : '',
                        IsActive: true
                    }
                })
                .subscribe(
                    data => {
                        if (data && data.length) {
                            // this.pricingListPerJobsites[index].Product = data[0];
                            obj['Product'] = data[0];
                            this.pricingListPerJobsites = array;
                        }
                    },
                    error => {
                        console.log('Error fetching product>>', error.message);
                    }
                );
        });
    }
}
