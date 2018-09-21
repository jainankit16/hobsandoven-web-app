import { Component, OnInit, Input, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { AccountApi, ProjectApi, JobApi, DocumentApi, UsersApi } from '../../../../sdk';
import { PlatformLocation, Location } from '@angular/common';
import { UtilityService } from '../../../../services/utility.service';
import { environment } from '../../../../../environments/environment';
import { PreloaderService } from '../../../../services/preloader.service';

@Component({
    selector: 'detail-modal',
    templateUrl: 'detail-modal.component.html'
})
export class DetailModalComponent implements OnInit, AfterViewChecked {
    @Input() modelName: string;
    @Input() modelId: string;
    @Input() level: string;
    modalTitle: string;

    account: any;
    project: any;
    job: any;
    fileData: any;

    errorMessage: string;
    baseURL: any;

    constructor(
        private _modalService: ModalService,
        private _accountApi: AccountApi,
        private _projectApi: ProjectApi,
        private _documentApi: DocumentApi,
        private _jobApi: JobApi,
        private _cdRef: ChangeDetectorRef,
        private _usersApi: UsersApi,
        private _platformLocation: PlatformLocation,
        private _utilityService: UtilityService,
        private _preloaderService: PreloaderService
    ) {
        this.baseURL = (_platformLocation as any).location.origin;
    }

    ngOnInit() {
        this.modalTitle = this.modelName + ' Details'
        switch (this.level) {
            case 'one':
                this.getAccountDetails(this.modelId);
                break;
            case 'two':
                this.getProgramDetails(this.modelId);
                break;
            case 'three':
                this.getProgramDetails(this.modelId);
                break;
            case 'four':
                break;
            case 'five':
                this.getJobDetails(this.modelId);
                break;
            case 'six':
                this.getFileDetails(this.modelId);
        }
    }

    ngAfterViewChecked() {
        this.detectChanges();
    }

    getAccountDetails(id) {
        this._accountApi
            .findOne({
                fields: [
                    'sfdcId', 'Name', 'AccountSource', 'Vendor_Type__c', 'Service_Global_Ref__c', 'IsPartner', 'Business_Size_c__c',
                    'OwnerId', 'CreatedDate', 'Company_Reference_code__c', 'CurrencyIsoCode', 'LastModifiedDate'
                ],
                where: {
                    id: id
                }
            })
            .subscribe(
                result => {
                    this.account = result;
                },
                error => {
                    this.errorMessage = error.message
                }
            );
    }

    detectChanges() {
        if (!this._cdRef['destroyed']) {
            this._cdRef.detectChanges();
        }
    }

    getProgramDetails(id) {
        this._projectApi
            .findOne({
                fields: [
                    'sfdcId', 'Project__c', 'Project_Standard__c', 'Name', 'APVP_Group_Number__c', 'APVP_Record_Count__c',
                    'Account__c', 'Customer_Service_Type__c', 'Deadline__c', 'Description__c', 'Duration__c',
                    'Field_Service_Program_Type__c', 'Jobsite_Contact_Email_Service_Desk__c', 'Jobsite_Contact_Email_Technical_Esc__c',
                    'Jobsite_Contact_Name_Service_Desk__c', 'Jobsite_Contact_Name_Technical_Esc__c',
                    'Jobsite_Contact_Phone_Service_Desk__c', 'Jobsite_Contact_Phone_Technical_Esc__c', 'Jobsite_Contact_Selection__c',
                    'Kick_off__c', 'Partner_Name_Text__c', 'Partner_Pricelist__c', 'Program_Activation__c', 'Progress__c', 'RecordTypeId',
                    'Resource_Pool_Type_Used_for_backfill__c', 'Service_Dispatch_SLA_Priority__c', 'Service_Technical_Level__c',
                    'SoW_Equipment_Tracking_Vendor__c', 'Vendor_Pricelist__c', 'Vendor_Type__c', 'Status__c'
                ],
                where: {
                    id: id
                }
            })
            .subscribe(
                result => {
                    this.project = result;
                },
                error => {
                    this.errorMessage = error.message;
                }
            );
    }

    getJobDetails(id) {
        const reqObj = {
            'where': { 'id': id }
        };
        this._jobApi.getJobDetailsById(reqObj).subscribe(
            result => {
                if (result && result.id) {
                    this.job = result;
                } else {
                    this.errorMessage = 'No details found.'
                }
            },
            error => {
                this.errorMessage = error.message
            }
        );
    }

    getFileDetails(id) {
        this._preloaderService.showPreloader();
        this._documentApi.findById(id, {
            fields: ['id', 'description', 'fileMeta', 'context', 'modelName', 'uploadedBy', 'createdAt', 'categoryId', 'subCategoryId'],
            include: [
                {
                    relation: 'category',
                    scope: {
                        fields: ['id', 'title']
                    }
                },
                {
                    relation: 'subCategory',
                    scope: {
                        fields: ['id', 'title']
                    }
                }
            ]
        }).subscribe(
            result => {
                const baseUrl = this.baseURL + '/downloads/';
                this.fileData = result;
                this.fileData.fileUrl = baseUrl + result['id'];
                this.fileData.type = (result && result['fileMeta']['type']) ? result['fileMeta']['type'] : '';
                const fullUrl = baseUrl + result['id'];
                this._documentApi.getBitLyUrl(fullUrl).map(response => JSON.parse(response)).subscribe(res => {
                    this.fileData.shortUrl = (res && res.data) ? res.data['url'] : '';
                });
                this._preloaderService.hidePreloader();

            },
            err => {
                this.errorMessage = err.message;
                this._preloaderService.hidePreloader();

            });
    }
    // close modal on click
    closeModal() {
        this._modalService.closed();
    }

    download(row) {
        if (row.type) {
            console.log('Download Triggered for File')
            const url = environment.baseUrl + '/' + environment.apiVersion +
                '/Documents/download/' + row.id + '?access_token=' + this._usersApi.getCurrentToken().id
            this._utilityService.downloadAndOpenPdfFile(url, row.fileMeta.name)
        } else {
            console.log('Download Triggered for Folder')
        }
    }
    /**
     * 
     * @param element 
     */
    copyToClipboard(element) {
        element.select();
        document.execCommand('copy');
        element.setSelectionRange(0, 0);
    }
}
