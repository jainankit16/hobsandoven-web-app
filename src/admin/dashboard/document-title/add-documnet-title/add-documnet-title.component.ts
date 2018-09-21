import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DocumentTitleApi, FilterServiceApi } from './../../../../shared/sdk';
import { PreloaderService } from 'shared/services/preloader.service';
import { AlertService } from 'shared/services/alert.service';
import { AppStateService } from 'shared/services/app-state.service';
import { ModelNames, FileType } from './../../../../shared/models/static-list-data.service';

@Component({
    selector: 'app-add-documnet-title',
    templateUrl: './add-documnet-title.component.html',
    styleUrls: ['./add-documnet-title.component.css']
})
export class AddDocumnetTitleComponent implements OnInit {

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
    ddlDepartmentTitle: any;
    documentTitleData = {};

    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute,
        private _appState: AppStateService,
        private _alertService: AlertService,
        private _filterServiceApi: FilterServiceApi,
        private _preloaderService: PreloaderService,
        private _documentTitleApi: DocumentTitleApi,

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
            this.headerTxt = 'Add Document Title';
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
        this._documentTitleApi.find({ where: { id: this.viewId } }).subscribe(
            res => {
                if (res) {
                    this.documentTitleData = res[0];
                    if (this.viewMode !== 'add') {
                        this.headerTxt += this.documentTitleData['title'];
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
        for (const key in this.documentTitleData) {
            if (key && key !== 'id') {
                obj = {};
                obj[key] = this.documentTitleData[key];
                this.documentForm.patchValue(obj);
            }
        }
    }
    getDropdownValues() {
        this._preloaderService.showPreloader();
        this._filterServiceApi.getAllFiltersData({ 'models': ['DocumentCategory'] }).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['documentcategories'] && data['documentcategories']['list']) {
                        this.ddlDepartmentTitle = data['documentcategories']['list'];
                    }
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                this._preloaderService.hidePreloader();
            }
        );
    }
    creatForms(disabled) {
        this.documentForm = this._fb.group({
            title: [{ value: '', disabled: disabled }, [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
            documentCategoryId: [{ value: '', disabled: disabled }, [Validators.required]],
            isActive: [{ value: true, disabled: disabled }],
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
            'isActive': '',
            'documentCategoryId': ''
        };
        this.validationMessages = {
            'title': {
                'required': ' Title is required.',
                'minlength': ' Title must be at least 4 characters long.',
                'maxlength': ' Title cannot be more than 200 characters long.'
            },
            'isActive': {
                'required': 'Department Category status is required.'
            },
            'documentCategoryId': {
                'required': 'Department Category is required.'
            }
        };
    }

    onClickSave() {
        const reqObj = {
            'title': this.documentForm.value['title'],
            'isActive': this.documentForm.value['isActive'],
            'documentCategoryId': this.documentForm.value['documentCategoryId']
        }
        if (this.viewMode === 'update') {
            reqObj['id'] = this.documentTitleData['id'];
        }
        this.createOrUpdate(reqObj);
    }

    createOrUpdate(data) {
        this._preloaderService.showPreloader();
        this._documentTitleApi.upsert(data).subscribe(
            res => {
                window.scrollTo(0, 0);
                if (this.viewMode === 'update') {
                    this._alertService.success('Document Title updated successfully.');
                } else {
                    this.resetForm();
                    this._alertService.success('Document Title created successfully.');
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
        this._router.navigate(['/admin/document-title']);
    }
}
