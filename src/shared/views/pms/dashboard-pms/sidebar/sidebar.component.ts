import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SharedService } from '../../../../services/pms/shared.services';
import { AppStateService } from '../../../../services/app-state.service';

import { FilterServiceApi } from '../../../../sdk/services/custom/';

@Component({
    selector: 'dashboard-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit, OnDestroy {

    selectedAccountId: string;
    // variable to notify dashboard to filter data
    @Output() notifyDashboard: EventEmitter<Object> = new EventEmitter<Object>();
    private subscription: Subscription;
    userState: any;
    // service types filter data
    serviceTypes = [
        { 'sfdcId': 'Smart Hand Dispatch FSE', 'Name': 'Smart Hand Dispatch FSE' },
        { 'sfdcId': 'Dedicated Contract FTE', 'Name': 'Dedicated Contract FTE' },
        { 'sfdcId': 'Logistics & Export (LOTS) Compliance', 'Name': 'Logistics & Export (LOTS) Compliance' },
    ];
    accounts = [];
    programs = [];
    jobsites = [];
    quotes = [];
    priceLists = [];
    salesOrders = [];
    timecards = [];
    invoices = [];
    payments = [];

    selectedServiceType = 'ALL';
    selectedAccount = '--None--';
    selectedProgram = '--None--';
    selectedJobsite = '--None--';
    selectedQuote = '--None--';
    selectedPriceList = '--None--';
    selectedSalesOrder = '--None--';
    selectedTimecard = '--None--';
    selectedInvoice = '--None--';
    selectedPayment = '--None--';

    constructor(
        public _sharedService: SharedService,
        private _appState: AppStateService,
        private _filterServiceApi: FilterServiceApi
    ) { }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        const accessType = this._appState.getAccessType();

        this.subscription = this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
        });
        if (!this.userState || !this.userState['partner']) {
            this.userState['partner'] = {};
            this._sharedService.setUserState(this.userState);
        }
        // Remove programId, if exists on component initialization
        if (localStorage.getItem('programId') !== undefined) {
            localStorage.removeItem('programId');
        }
        // when internal user (MSP)
        if (accessType === 'internal') {
            this.accounts = [{ 'sfdcId': '--None--', 'Name': '--None--' }];
            if (this.selectedAccountId) {
                this.selectedAccount = this.selectedAccountId;
                const source = 'Account';
                const models = ['Account', 'Project', 'Invoice', 'SalesOrder', 'Timecard', 'Payment'];
                this.onAccountChange(source, models, 'internal');
            } else {
                this.selectedAccount = '--None--';
                const source = undefined;
                const paramObj = {
                    'models': ['Account']
                };
                this.loadDropdownData(source, paramObj);
            }
        } else {
            if (this.selectedAccountId) {
                this.selectedAccount = this.selectedAccountId;
                const source = 'Account';
                const models = ['Account', 'Project', 'Invoice', 'SalesOrder', 'Timecard', 'Payment'];
                this.onAccountChange(source, models, undefined);
            }
        }
    }

    ngOnDestroy() {
        localStorage.removeItem('programId');
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    loadDropdownData(source, paramObj) {
        // notify dashboard to filter data
        this.filterDashboardData(source);
        // get data for filters
        this._filterServiceApi.getAllFiltersData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    // accounts
                    if (paramObj['models'].indexOf('Account') !== -1 && data['accounts'] && !data['accounts']['error']) {
                        // this.accounts = [];
                        this.accounts = this.accounts.concat(data['accounts']['list']);
                    }
                    // programs
                    if (paramObj['models'].indexOf('Project') !== -1 && data['programs'] && !data['programs']['error']) {
                        this.programs = [];
                        this.programs = data['programs']['list'];
                        if (this.programs.length) {
                            this.selectedProgram = this.programs[this.programs.length - 1]['sfdcId'];
                            this.onProgramChange('Project');
                        } else {
                            this.jobsites = [];
                        }
                    }
                    // jobsites
                    if (paramObj['models'].indexOf('Jobsite') !== -1 && data['jobsites'] && !data['jobsites']['error']) {
                        this.jobsites = [];
                        this.jobsites = data['jobsites']['list'];
                    }
                    // quotes
                    if (paramObj['models'].indexOf('QuoteManager') !== -1 && data['quoteManagers'] && !data['quoteManagers']['error']) {
                        this.quotes = [];
                        this.quotes = data['quoteManagers']['list'];
                    }
                    // pricelists
                    if (paramObj['models'].indexOf('Pricelist') !== -1 && data['pricelist'] && !data['pricelist']['error']) {
                        this.priceLists = [];
                        this.priceLists = data['pricelist']['list'];
                    }
                    // invoices
                    if (paramObj['models'].indexOf('Invoice') !== -1 && data['invoices'] && !data['invoices']['error']) {
                        this.invoices = [];
                        this.invoices = data['invoices']['list'];
                    }
                    // sales orders
                    if (paramObj['models'].indexOf('SalesOrder') !== -1 && data['salesOrders'] && !data['salesOrders']['error']) {
                        this.salesOrders = [];
                        this.salesOrders = data['salesOrders']['list'];
                    }
                    // payments
                    if (paramObj['models'].indexOf('Payment') !== -1 && data['payments'] && !data['payments']['error']) {
                        const paymentsData = data['payments']['list'];
                        this.payments = [];
                        paymentsData.forEach(element => {
                            if (element['payments'] && element['payments'].length) {
                                element['payments'].forEach(payment => {
                                    if (payment && payment['Name']) {
                                        this.payments.push(payment);
                                    }
                                });
                            }
                        });
                    }
                    // timecards
                    if (paramObj['models'].indexOf('Timecard') !== -1 && data['timecards'] && !data['timecards']['error']) {
                        const timecardsData = data['timecards']['list']
                        this.timecards = [];
                        timecardsData.forEach(element => {
                            if (element['timecard'] && element['timecard']['Name']) {
                                this.timecards.push(element['timecard']);
                            }
                        });
                    }
                }
            },
            error => {
                console.log('Error fetching data>>', error.message);
            }
        );
    }

    onAccountChange(source, models, userType) {
        // when account is selected
        if (this.selectedAccount !== '--None--') {
            this.selectedProgram = 'ALL';
            this.selectedJobsite = '--None--';
            this.selectedQuote = 'ALL';
            this.selectedPriceList = 'ALL';
            this.selectedSalesOrder = 'ALL';
            this.selectedTimecard = 'ALL';
            this.selectedInvoice = 'ALL';
            this.selectedPayment = 'ALL';
            let paramObj = {};
            if (models && models.length) {
                paramObj['models'] = models;
            } else {
                paramObj['models'] = ['Project', 'QuoteManager', 'Pricelist', 'Invoice', 'SalesOrder', 'Timecard', 'Payment']
            }
            if (this.selectedAccount) {
                paramObj['accountId'] = this.selectedAccount;
            }
            if (userType && userType === 'internal') {
                paramObj['source'] = 'dashboard-sidebar';
            }
            this._appState.setSelectedAccount(this.selectedAccount);
            if (localStorage.getItem('programId') !== undefined) {
                localStorage.removeItem('programId');
            }
            this.loadDropdownData(source, paramObj);
            this.userState['partner'] = { 'sfdcId': this.selectedAccount };
            this._sharedService.setUserState(this.userState);
        } else {
            this.programs = [];
            this.selectedProgram = '--None--';
            this.jobsites = [];
            this.selectedJobsite = '--None--';
            this.quotes = [];
            this.selectedQuote = '--None--';
            this.priceLists = [];
            this.selectedPriceList = '--None--';
            this.salesOrders = [];
            this.selectedSalesOrder = '--None--';
            this.timecards = [];
            this.selectedTimecard = '--None--';
            this.invoices = [];
            this.selectedInvoice = '--None--';
            this.payments = [];
            this.selectedPayment = '--None--';
            // notify dashboard to filter data
            this.filterDashboardData(source);
            if (localStorage.getItem('programId') !== undefined) {
                localStorage.removeItem('programId');
            }
            this.userState['partner'] = { 'sfdcId': undefined };
            this._sharedService.setUserState(this.userState);
        }
    }

    onProgramChange(source) {
        // when program is selected
        if (this.selectedProgram !== '--None--' && this.selectedProgram !== 'ALL') {
            this.selectedJobsite = 'ALL';
            this.selectedQuote = 'ALL';
            this.selectedPriceList = 'ALL';
            const paramObj = {
                'accountId': this.selectedAccount,
                'programId': this.selectedProgram,
                'models': ['Jobsite', 'QuoteManager', 'Pricelist']
            };
            this.loadDropdownData(source, paramObj);
            localStorage.setItem('programId', this.selectedProgram);
        } else {
            this.jobsites = [];
            this.selectedJobsite = '--None--';
            this.selectedQuote = 'ALL';
            this.selectedPriceList = 'ALL';
            const paramObj = {
                'accountId': this.selectedAccount,
                'models': ['QuoteManager', 'Pricelist']
            };
            this.loadDropdownData(source, paramObj);
            localStorage.removeItem('programId');
        }
    }

    onFilterChange(source) {
        if (source === 'Account') {
            const models = [];
            this.onAccountChange(source, models, undefined);
        } else if (source === 'Project') {
            this.onProgramChange(source);
        } else {
            this.filterDashboardData(source);
        }
    }

    filterDashboardData(source) {
        const dataObj = {
            'filterChanged': source,
            'selectedServiceType': this.selectedServiceType,
            'selectedAccount': this.selectedAccount,
            'selectedProgram': this.selectedProgram,
            'selectedJobsite': this.selectedJobsite,
            'selectedQuote': this.selectedQuote,
            'selectedPriceList': this.selectedPriceList,
            'selectedSalesOrder': this.selectedSalesOrder,
            'selectedTimecard': this.selectedTimecard,
            'selectedInvoice': this.selectedInvoice,
            'selectedPayment': this.selectedPayment
        };
        this.notifyDashboard.emit(dataObj);
    }
}
