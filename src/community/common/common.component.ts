import { Component, OnInit, AfterContentInit, ElementRef } from '@angular/core';
import { LoopBackAuth, Users, LoopBackConfig, UsersApi } from '../../shared/sdk';
import { APP_VERSION, BUILD_DATE } from '../version';

@Component({
    selector: 'app-common',
    templateUrl: './common.component.html',
    styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit, AfterContentInit {
    public isLoggedIn = false;
    account: Users;
    webTitle = 'ServiceO';
    buildDate = BUILD_DATE;
    appVersion = APP_VERSION;
    userType: string;
    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
    }

    ngAfterContentInit() {
        // Load the script
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = '../../assets/js/custom.js';
        this.elementRef.nativeElement.appendChild(s);
    }

}
