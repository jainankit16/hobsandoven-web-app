import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PreloaderService } from '../../../services/preloader.service';
import { AppStateService } from '../../../services/app-state.service';
import { SharedService } from '../../../services/pms/shared.services';

import { JobsiteApi, CountryCodeApi } from '../../../sdk';

@Component({
    selector: 'jobsite-detail',
    templateUrl: './jobsite-detail.component.html',
    styleUrls: ['./jobsite-detail.component.css']
})

export class JobsiteDetailComponent implements OnInit {

    selectedAccountId: string;
    @Output() listObjChanged: EventEmitter<any> = new EventEmitter<any>();
    @Input('jobsite') jobsite: any;
    private jobsiteDetail: any;
    private countryList: any;
    private contentData: any;
    private modalRef: any;
    private alert = {
        message: '',
        status: ''
    }
    showContactInfo = true;
    hasErrorInName = false;
    emailPattern = /\S+@\S+\.\S+/;
    jobsiteDetailForm = this.formBuilder.group({
        keyContactEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        technicalEscalationEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        adminEscalationEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        serviceDeskEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });

    constructor(
        private formBuilder: FormBuilder,
        private _modalService: NgbModal,
        private _sharedservice: SharedService,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _JobsiteApi: JobsiteApi,
        private _countryCodeApi: CountryCodeApi,
    ) { }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        if (this.jobsite && this.jobsite['page'] && this.jobsite['page'] === 'dashboard-pms') {
            this.showContactInfo = false;
        }
        this.jobsiteDetail = JSON.stringify(this.jobsite);
        this.jobsiteDetail = JSON.parse(this.jobsiteDetail);
        // getting state data as --None-- sometimes from database, so added this check to rectify
        this.jobsiteDetail['State__c'] = this.jobsiteDetail['State__c'] && this.jobsiteDetail['State__c'] !== '--None--' ?
            this.jobsiteDetail['State__c'] : '';
        // set 0 if lat & long data not available
        this.jobsiteDetail['geolocation__Latitude__s'] = this.jobsiteDetail['geolocation__Latitude__s'] ?
            this.jobsiteDetail['geolocation__Latitude__s'] : 0;
        this.jobsiteDetail['geolocation__Longitude__s'] = this.jobsiteDetail['geolocation__Longitude__s'] ?
            this.jobsiteDetail['geolocation__Longitude__s'] : 0;

        this.setContacts();
        if (this.jobsiteDetail.openFor === 'EDIT') {
            this._preloaderService.showPreloader();
            this._countryCodeApi
                .find({
                    order: 'Name ASC'
                })
                .subscribe(
                    data => {
                        this.countryList = data;
                        this._preloaderService.hidePreloader();
                    },
                    error => {
                        this._preloaderService.hidePreloader();
                        console.log(error);
                    });
        }

    }
    setContacts() {
        this.jobsiteDetail.contacts = {};
        this.jobsiteDetail.contacts = {
            'Customer Site (Technical Escalation)': {
                'contact': { LastName: null, Email: null, Phone: null },
                'Jobsite_Contact_Type__c': 'Customer Site (Technical Escalation)'
            },
            'Customer Site (Admin Escalation)': {
                'contact': { LastName: null, Email: null, Phone: null },
                'Jobsite_Contact_Type__c': 'Customer Site (Admin Escalation)'
            },
            'Customer Site (Service Desk)': {
                'contact': { LastName: null, Email: null, Phone: null },
                'Jobsite_Contact_Type__c': 'Customer Site (Service Desk)'
            }
        };


        if (this.jobsiteDetail.jobsiteContacts && this.jobsiteDetail.jobsiteContacts.length > 0) {
            this.jobsiteDetail.jobsiteContacts.forEach(element => {
                if (element.contact) {
                    switch (element.Jobsite_Contact_Type__c) {
                        case 'Customer Site (Admin Escalation)':
                            this.jobsiteDetail.contacts['Customer Site (Admin Escalation)'] = element;
                            break;
                        case 'Customer Site (Technical Escalation)':
                            this.jobsiteDetail.contacts['Customer Site (Technical Escalation)'] = element;
                            break;
                        case 'Customer Site (Service Desk)':
                            this.jobsiteDetail.contacts['Customer Site (Service Desk)'] = element;
                            break;
                    }
                }
            });
        }
        if (this.jobsiteDetail.jobsiteKeyContact) {
            this.jobsiteDetail.contacts.Key_Contact = this.jobsiteDetail.jobsiteKeyContact;
        } else {
            this.jobsiteDetail.contacts.Key_Contact = { LastName: null, Email: null, Phone: null };
        }
        this.jobsiteDetail.GeoMetro = this.jobsiteDetail.GeoMetro ? this.jobsiteDetail.GeoMetro : { 'Name': '' }
        this.jobsiteDetail.accountId = this.jobsiteDetail.account ? this.jobsiteDetail.account.sfdcId : null;
        this.jobsiteDetail.accountName = this.jobsiteDetail.account ? this.jobsiteDetail.account.Name : '';
        if (!this.jobsiteDetail.accountId) {
            this.alert = {
                message: 'Account Id is Missing!',
                status: 'fail'
            }
        }
    }

    onNameChange(elem) {
        elem.value = elem.value
            .replace(/(^\s*)/gi, '')    // removes leading
            .replace(/[ ]{2,}/gi, ' ')  // replaces multiple spaces with one space
            .replace(/\n +/, '\n');

        if (elem.id === 'Key_Contact_Name') {
            this.jobsiteDetail.contacts['Key_Contact'].LastName = elem.value;
        } else if (elem.id === 'Technical_Escalation_Name') {
            this.jobsiteDetail.contacts['Customer Site (Technical Escalation)'].contact.LastName = elem.value;
        } else if (elem.id === 'Admin_Escalation_Name') {
            this.jobsiteDetail.contacts['Customer Site (Admin Escalation)'].contact.LastName = elem.value;
        } else if (elem.id === 'Service_Desk_Name') {
            this.jobsiteDetail.contacts['Customer Site (Service Desk)'].contact.LastName = elem.value;
        }

        if (
            !this.jobsiteDetail.contacts['Key_Contact'].LastName ||
            !this.jobsiteDetail.contacts['Customer Site (Technical Escalation)'].contact.LastName ||
            !this.jobsiteDetail.contacts['Customer Site (Admin Escalation)'].contact.LastName ||
            !this.jobsiteDetail.contacts['Customer Site (Service Desk)'].contact.LastName
        ) {
            this.hasErrorInName = true;
        } else {
            this.hasErrorInName = false;
        }
    }

    onInput(event: any, src) {
        event.target.value = event.target.value.replace(/[^0-9]+/g, '');
        if (src === 'Key_Contact') {
            this.jobsiteDetail.contacts[src].Phone = event.target.value;
        } else {
            this.jobsiteDetail.contacts[src].contact.Phone = event.target.value;
        }
    }

    saveJobsiteDetail(form, data) {
        if (form.valid) {
            const jobsiteData = {
                'sfdcId': data.sfdcId,
                'id': data.id,
                'Account__c': this.selectedAccountId,
                'Street__c': data.Street__c,
                'City__c': data.City__c,
                'State__c': data.State__c,
                'Country__c': data.Country__c,
                'Zip__c': data.Zip__c,
                'Jobsite_Status__c': data.Jobsite_Status__c,
                'Jobsite_Key_Contact__c': data.Jobsite_Key_Contact__c,
                'GEO_Metro__c': data.GeoMetro.sfdcId,
                'Type__c': data.Type__c,
                'Name': data.Name,
                'Jobsite_ID__c': data.Jobsite_ID__c,
                'Jobsite_Description__c': data.Jobsite_Description__c,
                'Jobsite_Approval_Status__c': data.Jobsite_Approval_Status__c,
                'jobsiteContacts': [],
                'jobsiteKeyContact': data.contacts.Key_Contact,
            };
            jobsiteData.jobsiteContacts.push(data.contacts['Customer Site (Technical Escalation)'])
            jobsiteData.jobsiteContacts.push(data.contacts['Customer Site (Admin Escalation)'])
            jobsiteData.jobsiteContacts.push(data.contacts['Customer Site (Service Desk)'])
            this._preloaderService.showPreloader();
            this._JobsiteApi.createAndUpdateJobsite(jobsiteData).subscribe(
                result => {
                    this._preloaderService.hidePreloader();
                    this.alert = {
                        message: 'Jobsite Updated successfully.',
                        status: 'success'
                    }
                    this.listObjChanged.emit();
                },
                error => {
                    this._preloaderService.hidePreloader();
                    this.alert = {
                        message: 'Some error occurred!',
                        status: 'fail'
                    }
                }
            )
        }
    }
}
