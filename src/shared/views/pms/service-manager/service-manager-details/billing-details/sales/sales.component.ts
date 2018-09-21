
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'shared/services/pms/shared.services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html'
})
export class SalesComponent implements OnInit, OnDestroy {
    selectedTab: string;
    userState: any;
    subscription: Subscription;
    constructor(
        private _sharedService: SharedService,
    ) { }
    ngOnInit() {
        this.subscription = this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
        });
        // billing tab route
        if (this.userState['billing'] && this.userState['billing']['subTab']) {
            this.selectedTab = this.userState['billing']['subTab'];
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
