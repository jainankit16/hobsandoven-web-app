import { Component, OnInit } from '@angular/core';

import { LoopBackConfig } from './../shared/sdk/lb.config';
import { environment } from '../environments/environment';
import { APP_VERSION, BUILD_DATE } from './version';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    version = APP_VERSION;
    buildDate = BUILD_DATE;

    constructor(
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

    }

    disableAppLogs() {
        if (window.console) {
            window['console']['log'] = function () { };
        }
    };

}
