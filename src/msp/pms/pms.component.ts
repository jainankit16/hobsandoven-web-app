import { Component, ElementRef, ViewChild, AfterContentInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AppStateService } from '../../shared/services/app-state.service';
import { ModalService } from '../../shared/services/modal.service';

import { LoopBackAuth, Users, LoopBackConfig, UsersApi } from '../../shared/sdk';

import { APP_VERSION, BUILD_DATE } from '../version';
import { environment } from '../../environments/environment';

@Component({
    templateUrl: './pms.component.html',
    styleUrls: ['./pms.component.css']
})

export class PMSComponent implements OnInit, AfterContentInit {

    public isLoggedIn = false;
    account: Users;
    webTitle = 'ServiceO';
    buildDate = BUILD_DATE;
    appVersion = APP_VERSION;
    userType: string;

    constructor(
        private usersApi: UsersApi,
        private router: Router,
        private auth: LoopBackAuth,
        private _appState: AppStateService,
        private _modalService: ModalService,
        private elementRef: ElementRef,
        private _location: Location
    ) {
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
    }

    ngOnInit() {
        this.userType = this._appState.getAccessType();
    }

    ngAfterContentInit() {
        // Load the script
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = '../../assets/js/custom.js';
        this.elementRef.nativeElement.appendChild(s);
    }

    backClicked() {
        const pathUrl = window.location.pathname.split('/');
        if (pathUrl.length > 2) {
            this._location.back();
        }
    }

    refreshClicked() {
        const pathUrl = window.location.pathname.split('/');
        if (pathUrl && pathUrl[pathUrl.length - 2] === 'list-details' && pathUrl[pathUrl.length - 1] === '') {
            this.backClicked();
        } else {
            window.location.reload();
        }
    }

}


