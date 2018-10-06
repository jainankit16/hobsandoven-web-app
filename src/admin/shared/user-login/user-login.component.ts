import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PreloaderService } from '../../../shared/services/preloader.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {

    registrationForm: FormGroup;
    formErrors: any;
    validationMessages = {};

    email = '';
    showForgotPassword = false;
    showUserSignup = false;

    constructor(
        private _fb: FormBuilder,
        private _modalService: ModalService,
        private _preloaderService: PreloaderService,
        private _alertService: AlertService
    ) { }

    ngOnInit() {
        this.initialLoad();
    }

    initialLoad() {
        this.setFormErrors();
        this.createForms();
    }

    setFormErrors() {
        this.formErrors = {
            'email': '',
            'password': ''
        };
        this.validationMessages = {
            'email': { 'required': 'Email is required.' },
            'password': { 'required': 'Password is required.' }
        };
    }

    createForms() {
        this.registrationForm = this._fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
        this.registrationForm.valueChanges.subscribe(data => this.onFormChanged(data));
    }

    onFormChanged(data?: any) {
        if (!this.registrationForm) { return; }
        const form = this.registrationForm;
        // tslint:disable-next-line:forin
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                // tslint:disable-next-line:forin
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    onLoginClick() {

    }

    onClose() {
        this._modalService.closed();
    }

    onForgotPasswordClick() {
        this.showForgotPassword = true;
    }

    onSignupClick() {
        this.showUserSignup = true;
    }

    onSendPasswordClick() {

    }

    onCancel() {
        this.showForgotPassword = false;
        this.showUserSignup = false;
    }
}
