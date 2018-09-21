import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../../../services/pms/shared.services';
import { PreloaderService } from '../../../../../services/preloader.service';
import { FilterServiceApi } from '../../../../../sdk';

@Component({
    selector: 'service-manager-left-panel',
    templateUrl: './service-manager-left-panel.component.html',
    styleUrls: ['./service-manager-left-panel.component.css']
})

export class ServiceManagerLeftPanelComponent implements OnInit, OnDestroy {

    @Input() page: string;
    private subscription: Subscription;
    private routeSubscription: Subscription;
    userState = {};
    showSelectedFiltersText = false;
    isLoaded = false;
    caseId = '';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _sharedService: SharedService,
        private _preloaderService: PreloaderService,
        private _filterServiceApi: FilterServiceApi
    ) { }

    ngOnInit() {
        // when service-manager-dashboard page
        if (this.page === 'service-manager-dashboard') {
            this.isLoaded = true;
        } else if (this.page === 'service-manager-details') {   // when service-manager-details page
            this.routeSubscription = this.activatedRoute.params.subscribe(params => {
                if (params && params['id']) {
                    this.caseId = params['id'];
                    this.getSelectedCaseDetails(params['id']);
                }
            });
        }
        this.subscription = this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
            this.setUserState();
            this.showFiltersText();
        });
    }

    showFiltersText() {
        if (this.userState['servicemanager'] && Object.keys(this.userState['servicemanager']).length) {
            this.showSelectedFiltersText = true;
        } else {
            this.showSelectedFiltersText = false;
        }
    }

    setUserState() {
        if (!this.userState || !this.userState['servicemanager']) {
            this.userState['servicemanager'] = {};
            this._sharedService.setUserState(this.userState);
        }
        if (this.userState['servicemanager']['case']) {
            this.caseId = this.userState['servicemanager']['case']['caseId'];
        }
    }

    ngOnDestroy() {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
        this.userState['servicemanager'] = {};
        this._sharedService.setUserState(this.userState);
        this.subscription.unsubscribe();
    }

    resetFilters(tabset1, tabset2) {
        if (this.page === 'service-manager-dashboard') {
            this.userState['servicemanager']['program'] = {
                'programId': 'All Programs',
                'programName': 'All Programs'
            };
            this.userState['servicemanager']['jobsite'] = {
                'jobsiteId': 'All Jobsites',
                'jobsiteName': 'All Jobsites'
            };
            this.userState['servicemanager']['region'] = {
                'regionId': 'All Regions',
                'regionName': 'All Regions'
            };
            this._sharedService.setUserState(this.userState);
            tabset1.select('Accounts1');
        } else if (this.page === 'service-manager-details') {
            if (this.caseId) {
                tabset1.select('Order List');
                this.getSelectedCaseDetails(this.caseId);
            }
        }
    }

    getSelectedCaseDetails(caseId) {
        const paramObj = {
            'models': ['Case'],
            'where': { 'id': caseId }
        };
        this._preloaderService.showPreloader();
        this._filterServiceApi.getAllFiltersData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['cases'] && !data['cases']['error']) {
                        this.setSelectedCaseDetails(data['cases']['list']);
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

    setSelectedCaseDetails(caseList) {
        if (caseList.length) {
            const caseDetails = caseList[0];
            this.userState['servicemanager'] = {
                'account': {
                    'accountId': 'All Accounts',
                    'accountName': 'All Accounts'
                },
                'program': {
                    'programId': 'All Programs',
                    'programName': 'All Programs',
                    'ProgramCode': ''
                },
                'jobsite': {
                    'jobsiteId': 'All Jobsites',
                    'jobsiteName': 'All Jobsites'
                },
                'region': {
                    'regionId': 'All Regions',
                    'regionName': 'All Regions'
                },
                'case': {
                    'caseId': caseDetails['id'],
                    'caseNumber': caseDetails['CaseNumber'],
                    'sfdcId': caseDetails['sfdcId'],
                },
                'page': 'orders-list',
                'isCompleted': true
            };
            // set account data
            if (caseDetails['Account']) {
                this.userState['servicemanager']['account'] = {
                    'accountId': caseDetails['Account']['sfdcId'],
                    'accountName': caseDetails['Account']['Name']
                };
                this.userState['partner'] = {
                    'name': caseDetails['Account']['Name']
                };
            }
            // set program data
            if (caseDetails['program']) {
                this.userState['servicemanager']['program'] = {
                    'programId': caseDetails['program']['sfdcId'],
                    'programName': caseDetails['program']['Name'],
                    'ProgramCode': caseDetails['program']['Project__c']
                };
                this.userState['program'] = {
                    'programSFId': caseDetails['program']['sfdcId'],
                    'programName': caseDetails['program']['Name'],
                    'programReferCode': caseDetails['program']['Project__c']
                };
            } else {
                this.userState['program'] = {
                    'programSFId': '',
                    'programName': '',
                    'programReferCode': ''
                };
            }
            // set jobsite data
            if (caseDetails['Jobsite']) {
                this.userState['servicemanager']['jobsite'] = {
                    'jobsiteId': caseDetails['Jobsite']['sfdcId'],
                    'jobsiteName': caseDetails['Jobsite']['Jobsite_ID__c']
                };
            }
            this._sharedService.setUserState(this.userState);
            this.isLoaded = true;
        }
    }

}
