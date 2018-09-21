import { Component } from '@angular/core';
import { UsersApi } from './../shared/sdk/services/custom/Users';
import { AppStateService } from './../shared/services/app-state.service';
import { Router } from '@angular/router';
import { LoopBackConfig } from './../shared/sdk/lb.config';
import { LoopBackAuth } from './../shared/sdk/services/core/auth.service';
import { Users } from './../shared/sdk/models/Users';
import { environment } from '../environments/environment';
import { APP_VERSION, BUILD_DATE } from './version';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public isLoggedIn = false;
    account: Users;
    webTitle = 'ServiceO';
    version = APP_VERSION;
    buildDate = BUILD_DATE;

    constructor(private usersApi: UsersApi,
        private router: Router,
        private auth: LoopBackAuth,
        private appState: AppStateService) {
        console.log('Application Version: ' + this.version + '(' + this.buildDate + ')');
        // disables console.logs for production
        if (environment.production) {
            this.disableAppLogs();
        }
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);

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
