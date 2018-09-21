import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { PreloaderService } from '../../../services/preloader.service';
import { SharedService } from '../../../services/pms/shared.services';
import { AppStateService } from '../../../services/app-state.service';

import { FilterServiceApi, JobsiteApi, AccountApi } from '../../../sdk';

@Component({
    selector: 'content-jobsite',
    templateUrl: './content-jobsite.component.html'
})

export class ContentJobsiteComponent implements OnInit, OnDestroy {

    selectedAccountId: string;
    @Input() page: string;
    showRadioButtons = false;
    jobsites: any;
    selectedJobsiteId = 'All Jobsites';
    private contentData: any;
    private subscription: Subscription;
    userState: any;

    constructor(
        private _appState: AppStateService,
        private modalService: NgbModal,
        private _preloaderService: PreloaderService,
        private _sharedService: SharedService,
        private _filterServiceApi: FilterServiceApi,
        private _accounntApi: AccountApi,
        private _jobsiteApi: JobsiteApi
    ) { }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        this.jobsites = [];
        if (this.page && this.page.indexOf('service-manager') !== -1) {
            this.showRadioButtons = true;
            this.jobsites.push({ 'sfdcId': 'All Jobsites', 'Jobsite_ID__c': 'All Jobsites' });
            // subscribe user state to read account & load programs
            this.subscription = this._sharedService.getUserState().subscribe(current => {
                this.userState = current;
            });
            this.selectedJobsiteId = this.userState['servicemanager']['jobsite']['jobsiteId'];
            // load jobsites data
            const paramObj = {
                'fields': ['sfdcId', 'Jobsite_ID__c', 'Country__c', 'City__c', 'Street__c'],
                'models': ['Jobsite']
            };
            if (this.userState['servicemanager']['program']['programId'] !== 'All Programs') {
                paramObj['programId'] = this.userState['servicemanager']['program']['programId'];
                this.loadJobsites(paramObj);
            } else {
                if (this.userState['servicemanager']['account']['accountId'] !== 'All Accounts') {
                    paramObj['accountId'] = this.userState['servicemanager']['account']['accountId'];
                    this.loadJobsites(paramObj);
                } else {
                    this.loadAllAccounts(paramObj);
                }
            }
        } else {
            if (this.selectedAccountId) {
                this.loadJobsiteData(this.selectedAccountId);
            }
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    loadJobsites(paramObj) {
        this._preloaderService.showPreloader();
        this._filterServiceApi.getAllFiltersData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['jobsites'] && !data['jobsites']['error']) {
                        this.jobsites = this.jobsites.concat(data['jobsites']['list']);
                    }
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                console.log('Error fetching data>>', error.message);
                this._preloaderService.hidePreloader();
            }
        );
    }

    loadAllAccounts(paramObj) {
        this._preloaderService.showPreloader();
        this._accounntApi.getAllPartnerAccount({}).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    const accountIds = [];
                    data.forEach(item => {
                        accountIds.push(item['sfdcId']);
                    });
                    paramObj['accountId'] = accountIds;
                    this.loadJobsites(paramObj);
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                console.log('Error fetching data>>', error.message);
                this._preloaderService.hidePreloader();
            }
        );
    }

    selectJobsite(jobsite) {
        this.selectedJobsiteId = jobsite['sfdcId'];
        // set shared service
        this.userState['servicemanager']['jobsite'] = {
            'jobsiteId': jobsite['sfdcId'],
            'jobsiteName': jobsite['Jobsite_ID__c']
        };
        if (!this.userState['servicemanager']['region']) {
            this.userState['servicemanager']['region'] = {
                'regionId': 'All Regions',
                'regionName': 'All Regions'
            };
        }
        if (this.page && this.page === 'service-manager-details' && jobsite['sfdcId'] !== 'All Jobsites') {
            this.userState['servicemanager']['isCompleted'] = false;
            delete this.userState['servicemanager']['page'];
        }
        this._sharedService.setUserState(this.userState);
    }

    refreshJobsiteList() {
        this.loadJobsiteData(this.selectedAccountId);
    }

    loadJobsiteData(accountId) {
        this._preloaderService.showPreloader();
        const req = {
            'source': 'list-jobsites-contact',
            'where': {
                'Account__c': accountId,
                'sfdcId': { neq: '' },
                'Name': { neq: '' }
            },
            'fields': ['GEO_Metro__c', 'Jobsite_ID__c', 'Name', 'Country__c', 'State__c', 'Zip__c', 'City__c', 'Street__c',
                'Jobsite_Description__c', 'Jobsite_Status__c', 'geolocation__Latitude__s', 'geolocation__Longitude__s', 'Type__c',
                'Jobsite_Approval_Status__c', 'sfdcId', 'Jobsite__c', 'Jobsite_Key_Contact__c', 'id', 'Account__c']
        }
        this._jobsiteApi.getJobsitesDT(req).toPromise().then(
            (result) => {
                this.jobsites = result.data['jobsites'];
                this._preloaderService.hidePreloader();
            },
            err => {
                this._preloaderService.hidePreloader();
            }
        );
    }

    openDetailPage(content, _size, dataRow) {
        if (dataRow['sfdcId'] !== 'All Jobsites') {
            this.modalService.open(content, { size: _size });
            this.contentData = dataRow;
        }
    }
}
