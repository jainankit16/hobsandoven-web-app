import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../../../shared/services/pms/shared.services';

@Component({
    selector: 'profit-analysis',
    templateUrl: './profit-analysis.component.html'
})
export class ProfitAnalysisComponent implements OnDestroy {
    profitAnaysisPerJobsites: any;
    private subscription: Subscription;
    constructor(private _sharedService: SharedService) {
        this.subscription = this._sharedService.getQuoteLineObj().subscribe(data => {
            if (data && data.length) {
                data.forEach(element => {
                    element['profitPercent'] = (element.Vendor_Cost__c) ? (element.Profit_Price__c / element.Vendor_Cost__c).toFixed(2) : 0;
                });
                this.profitAnaysisPerJobsites = data;
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
