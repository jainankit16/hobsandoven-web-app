import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppStateService } from '../../services/app-state.service';
import { AlertService } from '../../services/alert.service';
import { CommonService } from '../../services/common.service';
import { PreloaderService } from '../../services/preloader.service';

import { AccessToken, UsersApi, AccountApi, LoopBackConfig, LoopBackAuth } from '../../sdk';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent implements OnInit {

    loginForm: FormGroup;
    error: string;
    message: string;
    rememberMe: false;
    returnUrl = '';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private auth: LoopBackAuth,
        private _preloaderService: PreloaderService,
        private appState: AppStateService,
        private alertService: AlertService,
        private commonService: CommonService,
        private accountApi: AccountApi,
        private userApi: UsersApi
    ) {
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
    }

    ngOnInit() {
        if (this._activatedRoute.snapshot.queryParams && this._activatedRoute.snapshot.queryParams['returnUrl']) {
            this.returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'];
        }
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            rememberMe: [false]
        });
        this.error = '';
    }

    login() {
        if (this.loginForm.valid) {
            this._preloaderService.showPreloader();
            this.alertService.clear();
            this.rememberMe = this.loginForm.value.rememberMe;
            this.userApi.login(
                {
                    email: this.loginForm.value.username,
                    password: this.loginForm.value.password,
                    rememberMe: this.rememberMe,
                    app: this._activatedRoute.snapshot.data.appName
                },
                'user', // Include user model details
                this.rememberMe // Remember me condition
            ).subscribe((token) => {
                this.appState.setAuthState(true);
                this.commonService.setUserProfile(token.user);
                // Need to remove its else part once we don't have to be dependent on MagicLink Account for test purpose
                if (token.user.accessType !== 'internal') {
                    this.appState.setSelectedAccount(token.user.AccountId);
                } else {
                    this.appState.setSelectedAccount('0011a00000bGvDbAAK');
                }
                this.appState.setAccessType(token.user.accessType);
                this.appState.setHomeUrl(token.redirectUrl);
                if (this.returnUrl) {
                    this.router.navigate([this.returnUrl]);
                } else {
                    this.router.navigate([token.redirectUrl]);
                }
            }, err => {
                if (err.code === 'LOGIN_FAILED') {
                    err = { message: 'Invalid email or password!!' };
                } else if (err) {
                    err = { message: 'Access Denied!!' };
                }
                this.alertService.error(err.message);
                this._preloaderService.hidePreloader()
            });
        }
    }

    InputChanged() {
        if (this.error) {
            this.error = '';
        }
    }
}
