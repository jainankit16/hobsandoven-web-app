import { Component, OnInit, Input, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformLocation, Location } from '@angular/common';

import { AlertService } from '../../../services/alert.service';
import { ModalService } from '../../../services/modal.service';
import { PreloaderService } from '../../../services/preloader.service';
import { CommonService } from '../../../services/common.service';

import { UsersApi } from '../../../sdk/services/custom/Users';

@Component({
    selector: 'app-resetpassword',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {

    recoverForm: FormGroup; user: any;
    error: string;
    URISegment: string;

    constructor(
        private fb: FormBuilder,
        private usersApi: UsersApi,
        private alertService: AlertService,
        private platformLocation: PlatformLocation,
        private _location: Location,
        private _preloaderService: PreloaderService
    ) {
        // logout when loggedIn
        if (this._location.path().indexOf('reset') !== -1) {
            this.usersApi.logout();
        }
        this.URISegment = (platformLocation as any).location.origin;
    }

    ngOnInit() {
        this.buildForms();
    }

    resetPassword() {
        this._preloaderService.showPreloader();
        this.usersApi.resetPassword({ 'email': this.recoverForm.value.username, 'URISegment': this.recoverForm.value.url }).
            subscribe(data => {
                this.alertService.success('Email has been sent to ' + this.recoverForm.value.username);
                this._preloaderService.hidePreloader();
            }, err => {
                if (err && !err.message) {
                    err = { message: err };
                }
                if (err.code === 'EMAIL_NOT_FOUND') {
                    err.message = 'This email is not register with us.';
                }
                this.alertService.error(err.message);
                this._preloaderService.hidePreloader();
            });
    }

    buildForms() {
        this.recoverForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            url: [this.URISegment]
        });
        this.error = '';
    }
}

@Component({
    selector: 'app-forgotpassword',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./reset-password.component.css']
})

export class ForgotPasswordComponent implements OnInit, AfterViewChecked {

    @Input() modelName: string;
    changePasswordForm: FormGroup; user: any; access_token: any;
    error: string;
    passwordRegex: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/;

    constructor(
        private fb: FormBuilder,
        private usersApi: UsersApi,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private _modalService: ModalService,
        private _location: Location,
        private _cdRef: ChangeDetectorRef,
        private _preloaderService: PreloaderService,
        private commonService: CommonService
    ) {
        this.modelName = 'promtPassword';
        // logout when loggedIn
        if (this._location.path().indexOf('reset') !== -1) {
            this.usersApi.logout();
            this.modelName = 'changePassword';
        }
    }

    ngAfterViewChecked() {
        if (!this._cdRef['destroyed']) {
            this._cdRef.detectChanges();
        }
    }

    ngOnInit() {
        this.buildForms();
    }

    changePassword() {
        this.route.queryParams.subscribe(params => {
            if (!params['access_token']) {
                this.alertService.error('Access Token is required');
            } else {
                this._preloaderService.showPreloader();
                this.usersApi.updatePasswordFromToken(params['access_token'], this.changePasswordForm.value.npassword).subscribe(data => {
                    this.alertService.success('Password has been reset successfully.');
                    this._preloaderService.hidePreloader();
                }, err => {
                    this.alertService.error(err.message);
                    this._preloaderService.hidePreloader();
                });
            }
        });
    }

    buildForms() {
        this.changePasswordForm = this.fb.group({
            npassword: [null, [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
            cpassword: [null, [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]]
        }, { validator: this.passwordMatch('npassword', 'cpassword') });

        this.error = '';
    }

    passwordMatch(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            const passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if ((passwordInput.value && passwordInput.value.length > 0) ||
                (passwordConfirmationInput.value && passwordConfirmationInput.value.length > 0)) {
                if (passwordInput.value !== passwordConfirmationInput.value) {
                    return passwordConfirmationInput.setErrors({ notEquivalent: true }), passwordInput.setErrors({ notEquivalent: true })
                } if (passwordInput.value.length < 8 || passwordConfirmationInput.value.length < 8) {
                    return passwordConfirmationInput.setErrors({ notEquivalent: true }), passwordInput.setErrors({ notEquivalent: true })
                } else {
                    return passwordConfirmationInput.setErrors(null), passwordInput.setErrors(null);
                }
            } else {
                return passwordConfirmationInput.setErrors({ notEquivalent: true }), passwordInput.setErrors({ notEquivalent: true })
            }
        }
    }

    promtPassword() {
        if (this.modelName && this.usersApi.getCurrentToken().id) {
            this._preloaderService.showPreloader();
            this.usersApi.patchAttributes(this.usersApi.getCurrentToken().userId,
                { password: this.changePasswordForm.value.npassword, promptPasswordChange: 0 })
                .subscribe(success => {
                    this._modalService.closed();
                    this.alertService.success('Password has been reset successfully.');
                    this._preloaderService.hidePreloader();
                }, error => {
                    this.error = error.message;
                    this._preloaderService.hidePreloader();
                });
        }
    }

    // closeModal
    skipModal() {
        this.usersApi.patchAttributes(this.usersApi.getCurrentToken().userId, { promptPasswordChange: 0 }).subscribe(
            result => {
                if (result && result['id']) {
                    this.commonService.setUserProfile(result);
                }
            },
            error => {
                console.log(error);
            }
        );
        this._modalService.closed();
    }

    closeModal() {
        this._modalService.closed();
    }
}


