import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PreloaderService } from '../../../shared/services/preloader.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
    selector: 'app-user-signup',
    templateUrl: './user-signup.component.html',
    styleUrls: ['./user-signup.component.css']
})

export class UserSignupComponent implements OnInit {

    @Output() onCancelClick: EventEmitter<any> = new EventEmitter();

    signupForm: FormGroup;
    formErrors = {};
    validationMessages = {};

    agree = false;

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

    }

    onCancel() {
        this.onCancelClick.emit();
    }
}
