import { BillingsRoute } from './../../../billings/billings.routing';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SharedService } from 'shared/services/pms/shared.services';
import { AppStateService } from '../../../../../services/app-state.service';

@Component({
    selector: 'billing-details',
    templateUrl: './billing-details.component.html',
    styleUrls: ['./billing-details.component.css']
})

export class BillingDetailsComponent implements OnInit, OnDestroy {

   selectedTab: string;
   userState: any;
   subscription: Subscription;
    isInternalUser = false;

    constructor(
        private _sharedService: SharedService,
        private _appState: AppStateService
    ) { }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }
        this.subscription = this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
        });
        // billing tab route
        if (this.userState['billing'] && this.userState['billing']['tab']) {
            this.selectedTab = this.userState['billing']['tab'];
        }
    }

    ngOnDestroy() {
        this.userState['billing'] = null;
        this._sharedService.setUserState(this.userState);
    }
}
