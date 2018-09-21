import { Subscription } from 'rxjs/Rx';
import { SharedService } from '../../../../../shared/services/pms/shared.services';
import { Component, OnDestroy } from '@angular/core';

@Component({
    selector: "vendor-costing",
    templateUrl: "./vendor-costing.component.html"
})
export class VendorCostingComponent implements OnDestroy {
    vendorCostingPerJobsites: any;
    private subscription: Subscription;

    constructor(private _sharedService: SharedService) {
        this.subscription = this._sharedService.getQuoteLineObj().subscribe(data => {
            if (data && data.length) {
                this.vendorCostingPerJobsites = data;
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
