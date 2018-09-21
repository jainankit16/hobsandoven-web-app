import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PreloaderService } from '../../../../shared/services/preloader.service';
import { AlertService } from '../../../../shared/services/alert.service';

import { DepartmentApi, LoopBackAuth } from '../../../../shared/sdk';

@Component({
    selector: 'add-department',
    templateUrl: './add-department.component.html',
    styleUrls: ['./add-department.component.css']
})

export class AddDepartmentComponent implements OnInit {

    registrationForm: FormGroup;
    formErrors: any;
    validationMessages = {};

    currentDept: any;
    modelList: any;
    headerTxt = '';
    viewMode = 'add';
    viewId = '';

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _auth: LoopBackAuth,
        private _preloaderService: PreloaderService,
        private _alertService: AlertService,
        private _departmentApi: DepartmentApi
    ) {
        this._route.queryParams.subscribe(params => {
            this.viewMode = params['action'];
            if (params['id']) {
                this.viewId = params['id'];
            }
        });
    }

    ngOnInit() {
        this.initialLoad();
    }

    initialLoad() {
        let disabled = true;
        this.headerTxt = '';
        if (this.viewMode === 'view' && this.viewId) {
            disabled = true;
            this.headerTxt = 'View: ';
            this.getCurrentDept(this.viewId);
        } else if (this.viewMode === 'add') {
            disabled = false;
            this.headerTxt = 'Add New Department';
        } else if (this.viewMode === 'update' && this.viewId) {
            disabled = false;
            this.headerTxt = 'Edit: ';
            this.getCurrentDept(this.viewId);
        }
        this.setFormErrors();
        this.createForms(disabled);
    }

    getCurrentDept(deptId) {
        this._preloaderService.showPreloader();
        this.currentDept = {};
        const obj = {
            where: { 'id': deptId }
        }
        this._departmentApi.find(obj).subscribe(
            res => {
                if (res && res.length) {
                    this.currentDept = res[0];
                    this.headerTxt += this.currentDept['Name'];
                    this.setFormValues();
                } else {
                    this._alertService.error('No record found for the selected user!');
                }
                this._preloaderService.hidePreloader();
            },
            err => {
                this._alertService.error(err.message);
                this._preloaderService.hidePreloader();
            }
        );
    }

    setFormValues() {
        this.registrationForm.patchValue({ name: this.currentDept['Name'] });
        this.registrationForm.patchValue({ default: this.currentDept['Default__c'] });
        // this.registrationForm.patchValue({ recordType: this.currentDept['RecordType'] });
        // this.registrationForm.patchValue({ owner: this.currentDept['Owner'] });
        // this.registrationForm.patchValue({ currencyIsoCode: this.currentDept['CurrencyIsoCode'] });
        // this.registrationForm.patchValue({ community: this.currentDept['Community__c'] });
        // this.registrationForm.patchValue({ departmentAccess: this.currentDept['Department_Access__c'] });
        // this.registrationForm.patchValue({ departmentAcronym: this.currentDept['Department_Acronym__c'] });
        // this.registrationForm.patchValue({ departmentName: this.currentDept['Department_Name__c'] });
    }

    setFormErrors() {
        this.formErrors = {
            'name': '',
            // 'departmentAccess': '',
            // 'recordType': '',
            // 'owner': '',
            // 'currencyIsoCode': '',
            // 'community': '',
            // 'departmentAcronym': '',
            // 'departmentName': '',
            // 'default': ''
        };
        this.validationMessages = {
            'name': { 'required': 'Name is required.' },
            // 'departmentAccess': { 'required': 'Department Access is required.' },
            // 'recordType': { 'required': 'Record Type is required.' },
            // 'owner': { 'required': 'Owner is required.' },
            // 'currencyIsoCode': { 'required': 'CurrencyIsoCode is required.' },
            // 'community': { 'required': 'Community is required.' },
            // 'departmentAcronym': { 'required': 'Department Acronym is required.' },
            // 'departmentName': { 'required': 'Department Name is required.' },
            // 'default': { 'required': 'Default is required.' }
        };
    }

    createForms(disabled) {
        this.registrationForm = this._fb.group({
            name: [{ value: '', disabled: disabled }, [Validators.required]],
            default: [{ value: '', disabled: disabled }],
            // recordType: [{ value: '', disabled: disabled }],
            // owner: [{ value: '', disabled: disabled }],
            // currencyIsoCode: [{ value: '', disabled: disabled }],
            // community: [{ value: '', disabled: disabled }],
            // departmentAccess: [{ value: '', disabled: disabled }],
            // departmentAcronym: [{ value: '', disabled: disabled }],
            // departmentName: [{ value: '', disabled: disabled }],
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
        const reqObj = {
            'Name': this.registrationForm.value['name'],
            'Default__c': this.registrationForm.value['default'],
            'IsActive': true,
            // 'RecordType': this.registrationForm.value['recordType'],
            // 'Owner': this.registrationForm.value['owner'],
            // 'CurrencyIsoCode': this.registrationForm.value['currencyIsoCode'],
            // 'Community__c': this.registrationForm.value['community'],
            // 'Department_Access__c': this.registrationForm.value['departmentAccess'],
            // 'Department_Acronym__c': this.registrationForm.value['departmentAcronym'],
            // 'Department_Name__c': this.registrationForm.value['departmentName'],
            // 'LastModifiedBy': this._auth.getCurrentUserId(),
            // 'CreatedBy': this._auth.getCurrentUserId(),
        };

        if (this.viewMode === 'update') {
            reqObj['id'] = this.currentDept['id'];
            reqObj['sfdcId'] = this.currentDept['sfdcId'];
            reqObj['IsActive'] = this.currentDept['IsActive'];
            // reqObj['CreatedBy'] = this.currentDept['CreatedBy'];
        }
        this.createOrUpdateDept(reqObj);
    }

    createOrUpdateDept(dept) {
        this._preloaderService.showPreloader();
        this._departmentApi.upsert(dept).subscribe(res => {
            if (res) {
                const msg = this.viewMode === 'add' ? 'created' : 'updated';
                this._alertService.success('Department ' + msg + ' successfully.');
                if (this.viewMode === 'add') {
                    this.initialLoad();
                }
            }
            window.scrollTo(0, 0);
            this._preloaderService.hidePreloader();
        }, err => {
            this._alertService.error(err.message);
            window.scrollTo(0, 0);
            this._preloaderService.hidePreloader();
        })
    }

    reset() {
        this.initialLoad();
    }

    onActionButtonClick(button) {
        if (button === 'Delete') {
            // delete code goes here
        } else if (button === 'Edit') {
            this.viewMode = 'update';
            this.initialLoad();
            this._router.navigate(['/admin/department/manage'], { queryParams: { 'action': 'update', 'id': this.viewId } });
        } else if (button === 'Back') {
            this._router.navigate(['/admin/department']);
        }
    }
}
