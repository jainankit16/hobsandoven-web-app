import { Component, OnInit } from '@angular/core';
import { LoopBackConfig } from './../shared/sdk';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(
    ) {
        // disables console.logs for production
        if (environment.production) {
            this.disableAppLogs();
        }
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
    }

    ngOnInit() { }

    disableAppLogs() {
        if (window.console) {
            window['console']['log'] = function () { };
        }
    };
}
