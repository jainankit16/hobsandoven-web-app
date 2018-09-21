import { JobApi } from './../../../../../sdk/services/custom/Job';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AppStateService } from '../../../../../services/app-state.service';
import { PreloaderService } from '../../../../../services/preloader.service';

import { FilterServiceApi } from '../../../../../sdk';

@Component({
    selector: 'service-manager-filters',
    templateUrl: './service-manager-filters.component.html',
    styleUrls: ['./service-manager-filters.component.css']
})

export class ServiceManagerFiltersComponent implements OnInit {

    selectedAccountId: string;
    // variable to notify orders list to filter data
    @Output() filterDataList: EventEmitter<Object> = new EventEmitter<Object>();
    @Input() page: string;
    sorderType: string;
    allAccountArray = [];
    allProgramArray = [];
    jobs = [];
    accounts = [];
    programs = [];
    regions = [
        { 'sfdcId': 'Africa', 'Name': 'Africa' },
        { 'sfdcId': 'APAC', 'Name': 'APAC' },
        { 'sfdcId': 'EU', 'Name': 'EU' },
        { 'sfdcId': 'LATAM', 'Name': 'LATAM' },
        { 'sfdcId': 'Middle-East', 'Name': 'Middle-East' },
        { 'sfdcId': 'Rest Of Europe', 'Name': 'Rest Of Europe' },
        { 'sfdcId': 'USCA', 'Name': 'USCA' },
    ];
    countries = [];
    jobsites = [];
    orderTypes = [
        { 'sfdcId': 'Cases', 'Name': 'Cases' },
        { 'sfdcId': 'Work Orders', 'Name': 'Work Orders' },
    ];
    caseCategories = [
        { 'sfdcId': 'IT Service (3PS) List', 'Name': 'IT Service (3PS) List' },
        { 'sfdcId': 'Logistics (3PL) List', 'Name': 'Logistics (3PL) List' },
    ];
    caseStatuses = [
        { 'sfdcId': 'New', 'Name': 'New' },
        { 'sfdcId': 'Closed', 'Name': 'Closed' },
    ];

    selectedAccount = 'All Accounts';
    selectedProgram = 'All Programs';
    selectedRegion = 'All Regions';
    selectedCountry = 'All Countries';
    selectedJobsite = 'All Jobsites';
    selectedOrderType = 'All Orders';
    selectedCaseCategory = 'All';
    selectedCaseStatus = 'All';
    selectedFromData = '';
    selectedToDate = '';

    buttonText = 'More Filters';
    isInternalUser = false;
    filterValues: any = {};

    maxDate = new Date();
    minDate: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _preloaderService: PreloaderService,
        private _appState: AppStateService,
        private _filterServiceApi: FilterServiceApi,
        private _jobApi: JobApi,
        private _router: Router
    ) { }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        const accessType = this._appState.getAccessType();
        this.activatedRoute.queryParams.subscribe(params => {
            if (params['q']) {
                if (params['q'] === 'w') {
                    this.selectedOrderType = 'Work Orders';
                } else if (params['q'] === 'c') {
                    this.selectedOrderType = 'Cases';
                } else if (params['q'] === 'Job') {
                    this.selectedOrderType = 'Jobs';
                    this._jobApi.find({
                        where: {
                            Job_Status_Internal__c: {
                                'neq': ''
                            },
                            CKSW_BASE__Account__c: this.selectedAccountId

                        }, fields: ['sfdcId']
                    }).subscribe(list => {
                        this.jobs = list.map(job =>
                            job['sfdcId']
                        );
                    })
                } else {
                    this._jobApi.find({ where: { Job_Status_Internal__c: params['q'] }, fields: ['sfdcId'] }).subscribe(list => {
                        this.jobs = list.map(job =>
                            job['sfdcId']
                        );
                    })
                }
            }
            // filter service manager list
            // load data for the current account
            if (this.selectedAccountId) {
                // load filters data
                this.selectedAccount = this.selectedAccountId;
                const paramObj = {
                    'accountId': this.selectedAccount,
                    'models': ['Account', 'Project', 'Country', 'Jobsite']
                };
                if (accessType === 'internal') {
                    this.isInternalUser = true;
                    paramObj['source'] = 'service-manager-filters';
                }
                this.loadDropdownData(paramObj);
            }
        })

        if (this.page === 'Feed') {
            this.orderTypes.push({ 'sfdcId': 'Jobs', 'Name': 'Jobs' });
        }
    }

    loadDropdownData(paramObj) {
        // get data for filters
        this._preloaderService.showPreloader();
        this._filterServiceApi.getAllFiltersData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    // accounts
                    if (paramObj['models'].indexOf('Account') !== -1 && data['accounts'] && !data['accounts']['error']) {
                        this.accounts = data['accounts']['list'];
                    }
                    // programs
                    if (paramObj['models'].indexOf('Project') !== -1 && data['programs'] && !data['programs']['error']) {
                        this.programs = data['programs']['list'];
                        // set selected program
                        this.setSelectedProgram();
                    }
                    // jobsites
                    if (paramObj['models'].indexOf('Jobsite') !== -1 && data['jobsites'] && !data['jobsites']['error']) {
                        this.jobsites = data['jobsites']['list'];
                        // set selected jobsite
                        this.setSelectedJobsite();
                    }
                    // countries
                    if (paramObj['models'].indexOf('Country') !== -1 && data['countries'] && !data['countries']['error']) {
                        this.countries = data['countries']['list'];
                    }

                    this.notifyFilterValues();
                }
                this._preloaderService.hidePreloader();

            },
            error => {
                console.log('Error fetching data>>', error.message);
                this._preloaderService.hidePreloader();
            }
        );
    }

    setSelectedProgram() {
        this.allProgramArray = [];
        if (this.programs.length) {
            this.selectedProgram = 'All Programs';
            this.programs.forEach(program => { this.allProgramArray.push(program['sfdcId']) });
        } else {
            this.selectedProgram = '--None--';
        }
    }

    setSelectedJobsite() {
        if (this.jobsites.length) {
            this.selectedJobsite = 'All Jobsites';
        } else {
            this.selectedJobsite = '--None--';
        }
    }
    onFilterChange(source) {
        this.jobs = []
        if (source === 'Account') {
            this.onAccountChange();
        } else if (source === 'Program') {
            this.onProgramChange();
        } else {
            this.notifyFilterValues();
        }
    }

    onAccountChange() {
        if (this.selectedAccount !== '--None--') {
            const accountId = [];
            if (this.selectedAccount === 'All Accounts') {
                this.accounts.forEach(account => {
                    accountId.push(account['sfdcId']);
                });
            } else if (this.selectedAccount === 'All Accounts (Exclude MagicLink)') {
                this.accounts.forEach(account => {
                    if (account['Name'].indexOf('MagicLink') === -1 && account['Name'].indexOf('Magiclink') === -1) {
                        accountId.push(account['sfdcId']);
                    }
                });
            } else {
                accountId.push(this.selectedAccount);
                this._appState.setSelectedAccount(this.selectedAccount);
            }
            this.allAccountArray = accountId;
            const paramObj = {
                'accountId': accountId,
                'models': ['Project', 'Jobsite']
            };
            this.loadDropdownData(paramObj);
        }
    }

    onProgramChange() {
        if (this.selectedProgram !== '--None--') {
            const paramObj = { 'models': ['Jobsite'] }
            if (this.selectedProgram === 'All Programs') {
                this.allProgramArray = [];
                this.programs.forEach(program => {
                    this.allProgramArray.push(program['sfdcId']);
                });
            } else if (this.selectedProgram !== '--None--') {
                paramObj['programId'] = this.selectedProgram;
            }
            this.loadDropdownData(paramObj);
            this.notifyFilterValues();
        }
    }

    transform(value: string) {
        const datePipe = new DatePipe('en-US');
        value = datePipe.transform(value, 'shortDate');
        return value;
    }

    notifyFilterValues() {
        this.filterValues = {};
        // Case Number
        this.filterValues['CaseNumber'] = { neq: null };
        // Accounts
        if (this.selectedAccount === 'All Accounts' || this.selectedAccount === 'All Accounts (Exclude MagicLink)') {
            this.filterValues['AccountId'] = { inq: this.allAccountArray };
        } else {
            this.filterValues['AccountId'] = { inq: [this.selectedAccount] };
        }

        // programs
        if (this.selectedProgram === 'All Programs') {
            this.filterValues['Project_SOP__c'] = { inq: this.allProgramArray };
        } else if (this.selectedProgram !== '--None--') {
            this.filterValues['Project_SOP__c'] = this.selectedProgram;
        }
        // Regions
        if (this.selectedRegion !== 'All Regions' && this.selectedRegion !== '--None--') {
            this.filterValues['region'] = this.selectedRegion;
        }
        // Countries
        if (this.selectedCountry !== 'All Countries' && this.selectedCountry !== '--None--') {
            this.filterValues['countryCode'] = this.selectedCountry;
        }
        // Jobsites
        if (this.selectedJobsite !== 'All Jobsites' && this.selectedJobsite !== '--None--') {
            this.filterValues['Jobsite__c'] = this.selectedJobsite;
        }
        // Work Orders
        if (this.selectedOrderType !== 'All Orders' && this.selectedOrderType !== '--None--') {
            if (this.selectedOrderType === 'Work Orders') {
                this.filterValues['Job_Order__c'] = { neq: null };
            }
            if (this.selectedOrderType === 'Cases') {
                this.filterValues['CaseNumber'] = { neq: null };
            }
            if (this.selectedOrderType === 'Jobs') {
                this.filterValues['Service_Dispatch__c'] = { neq: null };
            }
        }
        // Case Category
        if (this.selectedCaseCategory !== 'All' && this.selectedCaseCategory !== '--None--') {
            // this.filterValues['Case Category'] = this.selectedCaseCategory;
        }
        // Case Status
        if (this.selectedCaseStatus !== 'All' && this.selectedCaseStatus !== '--None--') {
            this.filterValues['Status'] = this.selectedCaseStatus;
        }
        // job filter Status
        if (this.jobs && this.jobs.length === 0) {
            this.filterValues['Service_Dispatch__c'] = { neq: null };
        } else {
            this.filterValues['Service_Dispatch__c'] = { inq: this.jobs };
        }
        // From Date & To Date
        const fromdate = this.selectedFromData ? this.transform(this.selectedFromData) + ' 00:00:00' : '';
        const toDate = this.selectedToDate ? this.transform(this.selectedToDate) + ' 23:59:59' : '';
        if (fromdate && toDate) {
            this.filterValues['createdAt'] = { between: [fromdate, toDate] };
        } else if (fromdate) {
            this.filterValues['createdAt'] = { gte: fromdate };
        } else if (toDate) {
            this.filterValues['createdAt'] = { lte: toDate };
        }
        // Emit selected filter values
        this.filterDataList.emit(this.filterValues);
    }

    search() {
        this.notifyFilterValues();
    }

    reset() {
        if (this.isInternalUser) {
            this.selectedAccount = 'All Accounts (Exclude MagicLink)';
        } else {
            this.selectedAccount = this.selectedAccountId;
        }
        this.selectedProgram = 'All Programs';
        this.selectedRegion = 'All Regions';
        this.selectedCountry = 'All Countries';
        this.selectedJobsite = 'All Jobsites';
        this.selectedOrderType = 'All Orders';
        this.selectedCaseCategory = 'All';
        this.selectedCaseStatus = 'All';
        this.selectedFromData = '';
        this.selectedToDate = '';
        this.buttonText = 'More Filters';
        this.jobs = [];
        this.onAccountChange();
    }

    toggleFilters() {
        this.onDateChange();
        if (this.buttonText === 'More Filters') {
            this.buttonText = 'Less Filters';
        } else {
            this.buttonText = 'More Filters';
        }
    }

    onDateChange() {
        if (this.selectedFromData > this.selectedToDate) {
            this.selectedToDate = '';
        }
        this.minDate = this.selectedFromData;
    }
}


