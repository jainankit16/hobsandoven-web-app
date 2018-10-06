import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PreloaderService } from '../../../shared/services/preloader.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
    selector: 'app-seller-inquiry',
    templateUrl: './seller-inquiry.component.html',
    styleUrls: ['./seller-inquiry.component.css']
})

export class SellerInquiryComponent implements OnInit {

    registrationForm: FormGroup;
    formErrors: any;
    validationMessages = {};

    constructor(
        private _fb: FormBuilder,
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
            'rname': '',
            'email': '',
            'phone': '',
            'address': '',
            'locality': '',
            'state': '',
            'country': '',
            'zip': ''
        };
        this.validationMessages = {
            'fname': { 'required': 'First Name is required.' },
            'lname': { 'required': 'Last Name is required.' },
            'rname': { 'required': 'Restaurant Name is required.' },
            'email': { 'required': 'Email is required.' },
            'phone': { 'required': 'Phone is required.' },
            'address': { 'required': 'Address is required.' },
            'locality': { 'required': 'Locality is required.' },
            'state': { 'required': 'State is required.' },
            'country': { 'required': 'Country is required.' },
            'zip': { 'required': 'Pincode is required.' }
        };
    }

    createForms() {
        this.registrationForm = this._fb.group({
            fname: ['', [Validators.required]],
            lname: ['', [Validators.required]],
            rname: ['', [Validators.required]],
            email: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            locality: ['', [Validators.required]],
            state: ['', [Validators.required]],
            country: ['', [Validators.required]],
            zip: ['', [Validators.required]]
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

    onClickSave() {

    }

    saveInquiry(dept) {

    }

    reset() {
        this.initialLoad();
    }
}
