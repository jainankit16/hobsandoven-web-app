import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../../services/pms/shared.services';
import { AppStateService } from '../../../../services/app-state.service';

@Component({
    selector: 'app-service-manager-details',
    templateUrl: './service-manager-details.component.html',
    styleUrls: ['./service-manager-details.component.css']
})

export class ServiceManagerDetailsComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    appStateSub: Subscription;
    userState: any;
    appState: any;
    isCollapsed = true;
    errorMessage: string;
    sub: any;
    caseId: string;
    selectedTab: string;
    backUrl: any;
    pageTitle: any;
    constructor(
        private _router: Router,
        private _appState: AppStateService,
        private _sharedService: SharedService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.sub = this._activatedRoute.params.subscribe(params => {
            this.caseId = params['id'];
        });
    }

    ngOnInit() {
        this.initialLoad();
    }
    /**
     * Load all funcation related to `service manager details page`
     */
    initialLoad() {
        this.getAppState();
        this.getUserState();
    }
    /**
     * get application state
     */
    getAppState() {
        this.appStateSub = this._appState.getAppState().subscribe(appState => {
            this.appState = appState;
            if (this.appState && this.appState.redirectUrl) {
                this.backUrl = this.appState.redirectUrl;
            } else if (localStorage.getItem('redirectUrl')) {
                this.backUrl = localStorage.getItem('redirectUrl');
            }
            this.setPageTitle();
        });
    }
    /**
     * Get Current `User State`
     */
    getUserState() {
        let filterObj = {};
        this.subscription = this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
            if (
                this.userState['servicemanager'] &&
                Object.keys(this.userState['servicemanager']).length &&
                this.userState['servicemanager']['isCompleted']
            ) {
                filterObj = this.userState['servicemanager'];
            }
            // billing tab route
            if (this.userState['billing']) {
                this.selectedTab = 'billing';
            } else if (this.userState['messaging']) {
                this.selectedTab = 'messaging';
            }
        });
    }
    /**
     * Set `Page Title`
     */
    setPageTitle() {
        this.pageTitle = 'Console (Order List)';
        if (this.backUrl === '/pms/service-manager/feeds-list') {
            this.pageTitle = ' - Activity Feed Console (PMS)'
        }
    }
    /**
     * For redirect to Back Url
     */
    redirectBack() {
        if (this.backUrl) {
            this._router.navigate([this.backUrl]);
        }
    }
    /**
     * Destory all property related to `service manager details`
     */
    ngOnDestroy() {
        // reset userstate
        this.subscription.unsubscribe();
        this.userState['messaging'] = null;
        this._sharedService.setUserState(this.userState);
        if (this.appStateSub) {
            this.appStateSub.unsubscribe();
        }
        localStorage.removeItem('redirectUrl');
    }
}
