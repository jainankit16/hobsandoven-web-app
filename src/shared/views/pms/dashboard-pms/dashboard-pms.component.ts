import { Component, OnInit } from '@angular/core'
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { OrderBy } from '../../../pipe/order/orderby.pipe';

import { ModalService } from '../../../services/modal.service';
import { AppStateService } from '../../../services/app-state.service';
import { PreloaderService } from '../../../services/preloader.service';

import { DashboardApi } from '../../../sdk/services/custom/Dashboard';

@Component({
    templateUrl: './dashboard-pms.component.html',
    styleUrls: ['./dashboard-pms.component.css']
})

export class DashboardPMSComponent implements OnInit {

    contentData = {};
    programs = [];
    quotes = [];
    workOrders = [];
    jobsites = [];
    priceLists = [];
    cases = [];
    salesOrders = [];
    invoices = [];
    payments = [];
    timecards = [];
    programsCount = 0;
    quotesCount = 0;
    workOrdersCount = 0;
    jobsitesCount = 0;
    priceListsCount = 0;
    casesCount = 0;
    salesOrdersCount = 0;
    invoicesCount = 0;
    paymentsCount = 0;
    timecardsCount = 0;
    isInternalUser = false;

    constructor(
        private modalService: NgbModal,
        private _preloaderService: PreloaderService,
        private _appState: AppStateService,
        private _dashboardApi: DashboardApi
    ) { }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }
    }

    resetDataVariables() {
        this.programs = [];
        this.quotes = [];
        this.workOrders = [];
        this.jobsites = [];
        this.priceLists = [];
        this.cases = [];
        this.salesOrders = [];
        this.invoices = [];
        this.payments = [];
        this.timecards = [];
        this.programsCount = 0;
        this.quotesCount = 0;
        this.workOrdersCount = 0;
        this.jobsitesCount = 0;
        this.priceListsCount = 0;
        this.casesCount = 0;
        this.salesOrdersCount = 0;
        this.invoicesCount = 0;
        this.paymentsCount = 0;
        this.timecardsCount = 0;
    }

    open(content, _size) {
        this.modalService.open(content, { size: _size });
    }

    loadData(paramObj) {
        // get data for filters
        this._preloaderService.showPreloader();
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    // programs
                    if (paramObj['models'].indexOf('Project') !== -1) {
                        this.programs = [];
                        this.programsCount = 0;
                        if (data['programs'] && data['programs']['list']) {
                            this.programs = data['programs']['list'];
                            this.programsCount = data['programs']['count'];
                            this.programs = new OrderBy().transform(this.programs, ['-updatedAt']);
                        }
                    }
                    // quotes
                    if (paramObj['models'].indexOf('QuoteManager') !== -1) {
                        this.quotes = [];
                        this.quotesCount = 0;
                        if (data['quotes'] && data['quotes']['list']) {
                            this.quotes = data['quotes']['list'];
                            this.quotes = new OrderBy().transform(this.quotes, ['-createdAt']);
                            this.quotesCount = data['quotes']['count'];
                            // get jobsites count for each quote
                            let jobsites = [];
                            this.quotes.forEach(qm => {
                                jobsites = [];
                                qm['QuoteLineManagers'].forEach(qlm => {
                                    if (qlm['Jobsite'] && qlm['Jobsite']['sfdcId'] && jobsites.indexOf(qlm['Jobsite']['sfdcId']) === -1) {
                                        jobsites.push(qlm['Jobsite']['sfdcId']);
                                    }
                                });
                                qm['Jobsites'] = jobsites.length;
                                qm['Program'] = '';
                                if (qm['Project'] && qm['Project']['Name']) {
                                    qm['Program'] = qm['Project']['Name'];
                                }
                            });
                        }
                    }
                    // jobsites
                    if (paramObj['models'].indexOf('Jobsite') !== -1) {
                        this.jobsites = [];
                        this.jobsitesCount = 0;
                        if (data['jobsites'] && data['jobsites']['list']) {
                            this.jobsites = data['jobsites']['list'];
                            this.jobsitesCount = data['jobsites']['count'];
                        }
                    }
                    // workOrders
                    if (paramObj['models'].indexOf('WorkOrder') !== -1) {
                        this.workOrders = [];
                        this.workOrdersCount = 0;
                        if (data['workOrders'] && data['workOrders']['list']) {
                            this.workOrders = data['workOrders']['list'];
                            this.workOrders = new OrderBy().transform(this.workOrders, ['-createdAt']);
                            this.workOrdersCount = data['workOrders']['count'];
                        }
                    }
                    // priceLists
                    if (paramObj['models'].indexOf('Pricelist') !== -1) {
                        this.priceLists = [];
                        this.priceListsCount = 0;
                        if (data['pricelists'] && data['pricelists']['list']) {
                            this.priceLists = data['pricelists']['list'];
                            this.priceListsCount = data['pricelists']['count'];
                            this.priceLists = new OrderBy().transform(this.priceLists, ['-updatedAt']);
                        }
                    }
                    // salesOrders
                    if (paramObj['models'].indexOf('SalesOrder') !== -1) {
                        this.salesOrders = [];
                        this.salesOrdersCount = 0;
                        if (data['salesOrders'] && data['salesOrders']['list']) {
                            this.salesOrders = data['salesOrders']['list'];
                            this.salesOrders = new OrderBy().transform(this.salesOrders, ['-Sales_Order_Start_Date__c']);
                            this.salesOrdersCount = data['salesOrders']['count'];
                        }
                    }
                    // invoices
                    if (paramObj['models'].indexOf('Invoice') !== -1) {
                        this.invoices = [];
                        this.invoicesCount = 0;
                        if (data['invoices'] && data['invoices']['list']) {
                            this.invoices = data['invoices']['list'];
                            this.invoices = new OrderBy().transform(this.invoices, ['-Due_Date__c']);
                            this.invoicesCount = data['invoices']['count'];
                        }
                    }
                    // cases
                    if (paramObj['models'].indexOf('Case') !== -1) {
                        this.cases = [];
                        this.casesCount = 0;
                        if (data['cases'] && data['cases']['list']) {
                            this.cases = data['cases']['list'];
                            this.cases = new OrderBy().transform(this.cases, ['-createdAt']);
                            this.casesCount = data['cases']['count'];
                        }
                    }
                    // timecards
                    if (paramObj['models'].indexOf('Timecard') !== -1) {
                        this.timecards = [];
                        this.timecardsCount = 0;
                        if (data['timecards'] && data['timecards']['list']) {
                            this.timecards = data['timecards']['list'];
                            this.timecardsCount = data['timecards']['count'];
                        }
                    }
                    // payments
                    if (paramObj['models'].indexOf('Payment') !== -1) {
                        this.payments = [];
                        this.paymentsCount = 0;
                        if (data['payments'] && data['payments']['list']) {
                            this.payments = data['payments']['list'];
                            this.payments = new OrderBy().transform(this.payments, ['-Payment_Date__c']);
                            this.paymentsCount = data['payments']['count'];
                        }
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

    // accounts
    onAccountChange(dataObj) {
        this.jobsites = [];
        this.jobsitesCount = 0;
        const paramObj = {
            'accountId': dataObj['selectedAccount'],
            'models': ['Project', 'QuoteManager', 'WorkOrder', 'Pricelist', 'SalesOrder', 'Invoice', 'Case', 'Payment', 'Timecard'],
            'limit': 5
        };
        this.loadData(paramObj);
    }

    // programs
    onProjectChange(dataObj) {
        if (dataObj['selectedProgram'] !== '' && dataObj['selectedProgram'] !== 'ALL' && dataObj['selectedProgram'] !== '--None--') {
            this.cases = [];
            this.casesCount = 0;
            const paramObj = {
                'accountId': dataObj['selectedAccount'],
                'programId': dataObj['selectedProgram'],
                'models': ['Project', 'Jobsite', 'QuoteManager', 'WorkOrder', 'Pricelist', 'Case'],
                'limit': 5
            };
            this.loadData(paramObj);
        } else {
            this.onAccountChange(dataObj);
        }
    }

    // jobsites
    onJobsiteChange(dataObj) {
        const paramObj = {
            'accountId': dataObj['selectedAccount'],
            'models': ['Jobsite'],
            'limit': 5
        };
        if (dataObj['selectedJobsite'] !== '' && dataObj['selectedJobsite'] !== 'ALL' && dataObj['selectedJobsite'] !== '--None--') {
            paramObj['jobsiteId'] = dataObj['selectedJobsite'];
        }
        if (dataObj['selectedProgram'] !== '' && dataObj['selectedProgram'] !== 'ALL' && dataObj['selectedProgram'] !== '--None--') {
            paramObj['programId'] = dataObj['selectedProgram'];
        }
        this.loadData(paramObj);
    }

    // quotes
    onQuoteChange(dataObj) {
        const paramObj = {
            'accountId': dataObj['selectedAccount'],
            'models': ['QuoteManager'],
            'limit': 5
        };
        if (dataObj['selectedQuote'] !== '' && dataObj['selectedQuote'] !== 'ALL' && dataObj['selectedQuote'] !== '--None--') {
            paramObj['quoteId'] = dataObj['selectedQuote'];
        }
        if (dataObj['selectedProgram'] !== '' && dataObj['selectedProgram'] !== 'ALL' && dataObj['selectedProgram'] !== '--None--') {
            paramObj['programId'] = dataObj['selectedProgram'];
        }
        this.loadData(paramObj);
    }

    // pricelists
    onPricelistChange(dataObj) {
        const paramObj = {
            'accountId': dataObj['selectedAccount'],
            'models': ['Pricelist'],
            'limit': 5
        };
        if (dataObj['selectedPriceList'] !== '' && dataObj['selectedPriceList'] !== 'ALL' && dataObj['selectedPriceList'] !== '--None--') {
            paramObj['pricelistId'] = dataObj['selectedPriceList'];
        }
        if (dataObj['selectedProgram'] !== '' && dataObj['selectedProgram'] !== 'ALL' && dataObj['selectedProgram'] !== '--None--') {
            paramObj['programId'] = dataObj['selectedProgram'];
        }
        this.loadData(paramObj);
    }

    // salesOrders
    onSalesOrderChange(dataObj) {
        const paramObj = {
            'accountId': dataObj['selectedAccount'],
            'models': ['SalesOrder'],
            'limit': 5
        };
        if (dataObj['selectedSalesOrder'] !== '' && dataObj['selectedSalesOrder'] !== 'ALL' &&
            dataObj['selectedSalesOrder'] !== '--None--') {
            paramObj['salesOrderId'] = dataObj['selectedSalesOrder'];
        }
        this.loadData(paramObj);
    }

    // invoices
    onInvoiceChange(dataObj) {
        const paramObj = {
            'accountId': dataObj['selectedAccount'],
            'models': ['Invoice'],
            'limit': 5
        };
        if (dataObj['selectedInvoice'] !== '' && dataObj['selectedInvoice'] !== 'ALL' && dataObj['selectedInvoice'] !== '--None--') {
            paramObj['invoiceId'] = dataObj['selectedInvoice'];
        }
        this.loadData(paramObj);
    }

    // payments
    onPaymentChange(dataObj) {
        const paramObj = {
            'accountId': dataObj['selectedAccount'],
            'models': ['Payment'],
            'limit': 5
        };
        if (dataObj['selectedPayment'] !== '' && dataObj['selectedPayment'] !== 'ALL' &&
            dataObj['selectedPayment'] !== '--None--') {
            paramObj['paymentId'] = dataObj['selectedPayment'];
        }
        this.loadData(paramObj);
    }

    // timecards
    onTimecardChange(dataObj) {
        const paramObj = {
            'accountId': dataObj['selectedAccount'],
            'models': ['Timecard'],
            'limit': 5
        };
        if (dataObj['selectedTimecard'] !== '' && dataObj['selectedTimecard'] !== 'ALL' &&
            dataObj['selectedTimecard'] !== '--None--') {
            paramObj['timecardId'] = dataObj['selectedTimecard'];
        }
        this.loadData(paramObj);
    }

    fromFilterNotify(dataObj) {
        if (dataObj['filterChanged'] !== undefined && dataObj['selectedAccount'] !== '' && dataObj['selectedAccount'] !== '--None--') {
            // Account
            if (dataObj['filterChanged'] === 'Account') {
                this.onAccountChange(dataObj);
            }
            // Project
            if (dataObj['filterChanged'] === 'Project') {
                this.onProjectChange(dataObj);
            }
            // Jobsite
            if (dataObj['filterChanged'] === 'Jobsite') {
                this.onJobsiteChange(dataObj);
            }
            // Quote
            if (dataObj['filterChanged'] === 'QuoteManager') {
                this.onQuoteChange(dataObj);
            }
            // Pricelist
            if (dataObj['filterChanged'] === 'Pricelist') {
                this.onPricelistChange(dataObj);
            }
            // SalesOrder
            if (dataObj['filterChanged'] === 'SalesOrder') {
                this.onSalesOrderChange(dataObj);
            }
            // Invoice
            if (dataObj['filterChanged'] === 'Invoice') {
                this.onInvoiceChange(dataObj);
            }
            // Timecard
            if (dataObj['filterChanged'] === 'Timecard') {
                this.onTimecardChange(dataObj);
            }
            // Payment
            if (dataObj['filterChanged'] === 'Payment') {
                this.onPaymentChange(dataObj);
            }
        } else {
            this.resetDataVariables();
        }
    }

    openDetailPage(content, _size, dataRow) {
        this.contentData = dataRow;
        if (this.contentData && this.contentData['sfdcId']) {
            this.contentData['page'] = 'dashboard-pms';
        }
        this.modalService.open(content, { size: _size });
    }
}
