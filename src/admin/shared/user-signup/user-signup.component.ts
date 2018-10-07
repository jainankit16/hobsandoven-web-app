import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PreloaderService } from '../../../shared/services/preloader.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ModalService } from '../../../shared/services/modal.service';

import { UsersApi } from '../../../shared/sdk';

@Component({
    selector: 'app-user-signup',
    templateUrl: './user-signup.component.html',
    styleUrls: ['./user-signup.component.css']
})

export class UserSignupComponent implements OnInit {

    @Output() onButtonClick: EventEmitter<any> = new EventEmitter();

    signupForm: FormGroup;
    formErrors = {};
    validationMessages = {};

    agree = false;
    error = '';

    constructor(
        private _fb: FormBuilder,
        private _modalService: ModalService,
        private _preloaderService: PreloaderService,
        private _alertService: AlertService,
        private _userApi: UsersApi
    ) { }

    ngOnInit() {
        this.initialLoad();
    }

    initialLoad() {
        this.agree = false;
        this.error = '';
        this.setFormErrors();
        this.createForms();
    }

    setFormErrors() {
        this.formErrors = {
            'fname': '',
            'lname': '',
            'email': '',
            'phone': '',
            'password': ''
        };
        this.validationMessages = {
            'fname': { 'required': 'First Name is required.' },
            'lname': { 'required': 'Last Name is required.' },
            'email': { 'required': 'Email is required.' },
            'password': { 'required': 'Password is required.' },
            'phone': { 'required': 'Phone is required.' }
        };
    }

    createForms() {
        this.signupForm = this._fb.group({
            fname: ['', [Validators.required]],
            lname: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            phone: ['', [Validators.required]]
        });
        this.signupForm.valueChanges.subscribe(data => this.onFormChanged(data));
    }

    onFormChanged(data?: any) {
        if (!this.signupForm) { return; }
        const form = this.signupForm;
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

    onSignupClick() {
        if (this.agree) {
            this._preloaderService.showPreloader();
            const reqObj = {
                'firstname': this.signupForm.value['fname'],
                'lastname': this.signupForm.value['lname'],
                'email': this.signupForm.value['email'],
                'phone': this.signupForm.value['phone'],
                'password': this.signupForm.value['password']
            };
            this._userApi.create(reqObj).subscribe(
                res => {
                    this.onButtonClick.emit(res);
                    this._preloaderService.hidePreloader();
                },
                err => {
                    this.error = 'Something went wrong!';
                    console.log(err.message);
                    this._preloaderService.hidePreloader();
                }
            )
        }
    }

    onCancel() {
        this.onButtonClick.emit();
    }
}
