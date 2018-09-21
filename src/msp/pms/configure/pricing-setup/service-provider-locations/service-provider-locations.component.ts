import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuoteService } from '../../../../../shared/services/pms/quote.service';

@Component({
    selector: 'service-provider-locations',
    templateUrl: './service-provider-locations.component.html'
})
export class ServiceProviderLocationsComponent implements OnDestroy {
    serviceProviderLocations: any;
    private subscription: Subscription;

    constructor(private _quoteService: QuoteService) {
        this.subscription = this._quoteService.getSelectedProviderLocations().subscribe(data => {
            this.serviceProviderLocations = data;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
