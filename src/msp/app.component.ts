import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppStateService } from './../shared/services/app-state.service';
import { LoopBackAuth } from './../shared/sdk/services/core/auth.service';

import { UsersApi } from './../shared/sdk/services/custom/Users';
import { Users } from './../shared/sdk/models/Users';
import { LoopBackConfig } from './../shared/sdk/lb.config';

import { environment } from '../environments/environment';
import { APP_VERSION, BUILD_DATE } from './version';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    public isLoggedIn = false;
    account: Users;
    webTitle = 'ServiceO';
    version = APP_VERSION;
    buildDate = BUILD_DATE;

    constructor(
        private router: Router,
        private auth: LoopBackAuth,
        private appState: AppStateService,
        private usersApi: UsersApi
    ) {
        console.log('Application Version: ' + this.version + '(' + this.buildDate + ')');
        // disables console.logs for production
        if (environment.production) {
            this.disableAppLogs();
        }
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
    }

    ngOnInit() {
        this.appState.setAuthState(this.usersApi.isAuthenticated());
        this.appState.getAuthState().subscribe(val => {
            this.isLoggedIn = val;
            if (this.isLoggedIn) {
                this.updateUserDetails();
            }
        });
    }

    disableAppLogs() {
        if (window.console) {
            window['console']['log'] = function () { };
        }
    };

    updateUserDetails() {
        this.usersApi.getCurrent().subscribe(user => {
            this.account = user;
        });

    }
}
