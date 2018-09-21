import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentApi, DocumentCategoryApi, FilterServiceApi } from './../../../../shared/sdk';
import { PreloaderService } from 'shared/services/preloader.service';
import { AlertService } from 'shared/services/alert.service';
import { AppStateService } from 'shared/services/app-state.service';
import { ModelNames, FileTypeGroup } from './../../../../shared/models/static-list-data.service';

@Component({
    selector: 'app-add-document-categories',
    templateUrl: './add-document-categories.component.html',
    styleUrls: ['./add-document-categories.component.css']
})
export class AddDocumentCategoriesComponent implements OnInit {
    viewMode: any;
    viewId: any;
    accountId: any;
    accessType: any;
    active = true;
    passive = false;
    disabled = false;
    headerTxt: any;
    documentForm: FormGroup;
    formErrors = {};
    validationMessages = {};
    ddlModel: any;
    ddlDepartment: any;
    ddlFiltFormate: any;
    documentCatData = {};

    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute,
        private _appState: AppStateService,
        private _alertService: AlertService,
        private _departmentApi: DepartmentApi,
        private _filterServiceApi: FilterServiceApi,
        private _preloaderService: PreloaderService,
        private _documentCategoryApi: DocumentCategoryApi,

    ) {
        this._route.queryParams.subscribe(params => {
            this.viewMode = params['action'];
            if (params['id']) {
                this.viewId = params['id'];
            }
        });
    }

    ngOnInit() {
        this.accountId = this._appState.getSelectedAccount();
        this.accessType = this._appState.getAccessType();
        this.initialLoad();
    }
    initialLoad() {
        this.headerTxt = '';
        if (this.viewMode === 'add') {
            this.headerTxt = 'Add New Document Category';
        } else if (this.viewMode === 'view' && this.viewId) {
            this.disabled = true;
            this.headerTxt = 'View: ';
        } else if (this.viewMode === 'update' && this.viewId) {
            this.headerTxt = 'Edit: ';
        }

        if (this.viewId) {
            this.getDocumentCategorieById();
        }

        this.getDropdownValues();
        this.creatForms(this.disabled);
        this.setFormErrors();
    }
    getDocumentCategorieById() {
        this._preloaderService.showPreloader();
        this._documentCategoryApi.find({ where: { id: this.viewId } }).subscribe(
            res => {
                if (res) {
                    this.documentCatData = res[0];
                    if (this.viewMode !== 'add') {
                        this.headerTxt += this.documentCatData['title'];
                    }
                    this.setDocumentFormValue();
                }
                this._preloaderService.hidePreloader();
            },
            err => {
                this._alertService.warn('Oops! something went wrong.');
                this._preloaderService.hidePreloader();
            }
        )
    }
    setDocumentFormValue() {
        let obj;
        for (const key in this.documentCatData) {
            if (key && key !== 'id' && key !== 'departmentSfdcId') {
                obj = {};
                obj[key] = this.documentCatData[key];
                this.documentForm.patchValue(obj);
            }
        }
        if (this.documentForm.value['allowedFileTypes']) {
            this.documentForm.patchValue({ 'allowedFileTypes': this.documentForm.value['allowedFileTypes'].split(',') });
        }
    }
    getDropdownValues() {
        this._preloaderService.showPreloader();
        this.getAllModels();
        this.getAllfileFormate();
        this._filterServiceApi.getAllFiltersData({ 'models': ['Department'] }).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['department'] && data['department']['list']) {
                        this.ddlDepartment = data['department']['list'];
                    }
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                this._preloaderService.hidePreloader();
            }
        );
    }
    getAllModels() {
        this.ddlModel = ModelNames;
    }
    getAllfileFormate() {
        this.ddlFiltFormate = FileTypeGroup;
    }
    creatForms(disabled) {
        this.documentForm = this._fb.group({
            title: [{ value: '', disabled: disabled }, [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
            isDeliverable: [{ value: false, disabled: disabled }],
            description: [{ value: '', disabled: disabled }, [Validators.minLength(4), Validators.maxLength(200)]],
            modelName: [{ value: '', disabled: disabled }],
            departmentId: [{ value: '', disabled: disabled }, [Validators.required]],
            isActive: [{ value: false, disabled: disabled }],
            staffRead: [{ value: false, disabled: disabled }],
            staffUpload: [{ value: false, disabled: disabled }],
            vendorRead: [{ value: false, disabled: disabled }],
            vendorUpload: [{ value: false, disabled: disabled }],
            partnerRead: [{ value: false, disabled: disabled }],
            partnerUpload: [{ value: false, disabled: disabled }],
            customerRead: [{ value: false, disabled: disabled }],
            customerUpload: [{ value: false, disabled: disabled }],
            containSenstiveData: [{ value: false, disabled: disabled }],
            displayOrder: [{ value: '', disabled: disabled }],
            allowedFileTypes: [{ value: '', disabled: disabled }]
        });
        this.documentForm.valueChanges.subscribe(data => this.onFormChanged(data));
    }
    onFormChanged(data?: any) {
        if (!this.documentForm) { return; }
        const form = this.documentForm;
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
    setFormErrors() {
        this.formErrors = {
            'title': '',
            'isDeliverable': '',
            'description': '',
            'isActive': '',
            'staffRead': '',
            'staffUpload': '',
            'vendorRead': '',
            'vendorUpload': '',
            'partnerRead': '',
            'partnerUpload': '',
            'customerRead': '',
            'customerUpload': '',
            'containSenstiveData': '',
            'allowedFileTypes': '',
            'departmentId': ''
        };
        this.validationMessages = {
            'title': {
                'required': ' Title is required.',
                'minlength': ' Title must be at least 4 characters long.',
                'maxlength': ' Title cannot be more than 200 characters long.'
            },
            'isDeliverable': {
                'required': 'Deliverable is required.'
            },
            'description': {
                'minlength': 'Description must be at least 4 characters long.',
                'maxlength': 'Description cannot be more than 200 characters long.'
            },
            'isActive': {
                'required': 'Active is required.'
            },
            'staffRead': {
                'required': 'Staff read is required.'
            },
            'staffUpload': {
                'required': 'Staff upload is required.'
            },
            'vendorRead': {
                'required': 'Vendor read is required.'
            },
            'vendorUpload': {
                'required': 'Vendor upload is required.'
            },
            'partnerRead': {
                'required': 'Partner read is required.'
            },
            'partnerUpload': {
                'required': 'Partner upload is required.'
            },
            'customerRead': {
                'required': 'Customer read is required.'
            },
            'customerUpload': {
                'required': 'Customer upload is required.'
            },
            'containSenstiveData': {
                'required': 'Contain senstive data is required.'
            },
            'allowedFileTypes': {
                'required': 'Allowed file types is required.'
            },
            'departmentId': {
                'required': 'Department is required.'
            }
        };
    }

    onClickSave() {
        const deptId = Number(this.documentForm.value['departmentId'])
        const department = this.ddlDepartment.filter(item => (item.id === deptId));
        const reqObj = {
            'title': this.documentForm.value['title'],
            'isDeliverable': this.documentForm.value['isDeliverable'],
            'description': this.documentForm.value['description'],
            'modelName': this.documentForm.value['modelName'],
            'isActive': this.documentForm.value['isActive'],
            'staffRead': this.documentForm.value['staffRead'],
            'staffUpload': this.documentForm.value['staffUpload'],
            'vendorRead': this.documentForm.value['vendorRead'],
            'vendorUpload': this.documentForm.value['vendorUpload'],
            'partnerRead': this.documentForm.value['partnerRead'],
            'partnerUpload': this.documentForm.value['partnerUpload'],
            'customerRead': this.documentForm.value['customerRead'],
            'customerUpload': this.documentForm.value['customerUpload'],
            'containSenstiveData': this.documentForm.value['containSenstiveData'],
            'displayOrder': this.documentForm.value['displayOrder'],
            'allowedFileTypes': this.documentForm.value['allowedFileTypes'] ? (this.documentForm.value['allowedFileTypes']).join(',') : '',
            'departmentSfdcId': department ? department[0].sfdcId : 0,
            'departmentId': deptId
        }
        if (this.viewMode === 'update') {
            reqObj['id'] = this.documentCatData['id'];
        }
        this.createOrUpdate(reqObj);
    }

    createOrUpdate(data) {
        this._preloaderService.showPreloader();
        this._documentCategoryApi.upsert(data).subscribe(
            res => {
                window.scrollTo(0, 0);
                if (this.viewMode === 'update') {
                    this._alertService.success('Document category updated successfully.');
                } else {
                    this.resetForm();
                    this._alertService.success('Document category created successfully.');
                }
                this._preloaderService.hidePreloader();
            },
            err => {
                this._alertService.warn('Oops! something went wrong.');
                this._preloaderService.hidePreloader();
            })
    }
    resetForm() {
        this.creatForms(false);
    }
    onButtonClick() {
        this._router.navigate(['/admin/document-categories']);
    }
}
