import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { AppStateService } from '../../../services/app-state.service';
import { UtilityService } from '../../../services/utility.service'

import { DashboardApi } from '../../../sdk/services/custom/Dashboard';
import { SharedService } from 'shared/services/pms/shared.services';

@Component({
    selector: 'quote-list-modal',
    templateUrl: './quote-list-modal.component.html',
    styleUrls: ['./quote-list-modal.component.css']
})

export class QuoteListModalComponent implements OnInit, AfterViewInit {

    selectedAccountId: string;
    initialMessage: any;
    quotes = [];
    filteredQuotes = [];
    filter = {
        quoteNos: [],
        selectedQuoteNo: '--None--',
        programNames: [],
        selectedProgramName: '--None--',
        jobsitesCount: [],
        selectedJobsitesCount: '--None--'
    };
    // setup for ngx-datatable
    tableData = [];
    itemsPerPage = 10;
    itemsPerBatch = 200;
    orderBy = 'createdAt Asc';
    loadingIndicator = true;
    columns: any[];
    allColumns: any[];
    @ViewChild('myTable') table: any;
    isEnable = false

    constructor(
        private _appState: AppStateService,
        private _utilityService: UtilityService,
        private _dashboardApi: DashboardApi,
        private _sharedservice: SharedService,
        private el: ElementRef
    ) { }

    ngAfterViewInit() {
        let elHeader = this.el.nativeElement.querySelector('.datatable-header')
        let elBody = this.el.nativeElement.querySelector('datatable-body');
        elHeader.onscroll = () => {
            elBody.scrollLeft = elHeader.scrollLeft
        }
        elBody.onscroll = () => {
            elHeader.scrollLeft = elBody.scrollLeft
        }
    }

    ngOnInit() {
        this.columns = [
            { name: 'Quote Number', prop: 'Name', width: 250, visible: true, sortable: true },
            { name: 'Quote Date', prop: 'CreatedDate', width: 200, visible: true, sortable: true },
            { name: 'Program', prop: 'Program', width: 250, visible: true, sortable: true },
            { name: 'JobSite', prop: 'JobSite', width: 200, visible: true, sortable: true },
            { name: 'Quote Amount', prop: 'Total_Amount__c', width: 200, visible: true, sortable: true }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling

        this.selectedAccountId = this._appState.getSelectedAccount();
        if (this.selectedAccountId) {
            this.loadQuotes(0);
        }
    }

    loadQuotes(offset: number) {
        this.quotes = [];
        this.filteredQuotes = [];
        this.loadingIndicator = true;
        this.initialMessage = '';
        this.isEnable = false;
        let paramObj = {
            'accountId': this.selectedAccountId,
            'models': ['QuoteManager']
        };
        if (localStorage.getItem('programId')) {
            paramObj['programId'] = localStorage.getItem('programId');
        }
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                this.loadingIndicator = false;
                if (data.data) {
                    data = data.data;
                    if (data['quotes'] && data['quotes']['list']) {
                        this.quotes = data['quotes']['list'];
                    }
                    this.filteredQuotes = this.prepareQuotesData();
                    this.setPagination();
                    this.isEnable = true;
                }
            },
            error => {
                console.log('Error fetching states>>', error.message);
                this.initialMessage = error.message;
                this.isEnable = true;
            }
        );
    }

    prepareQuotesData() {
        let jobsites = [];
        this.quotes.forEach(qm => {
            jobsites = [];
            qm['QuoteLineManagers'].forEach(qlm => {
                if (qlm['Jobsite'] && qlm['Jobsite']['sfdcId'] && jobsites.indexOf(qlm['Jobsite']['sfdcId']) === -1) {
                    jobsites.push(qlm['Jobsite']['sfdcId']);
                }
            });
            qm['Jobsites'] = jobsites.length;
            if (this.filter['jobsitesCount'].indexOf(qm['Jobsites']) === -1) {
                this.filter['jobsitesCount'].push(qm['Jobsites']);
            }
            if (this.filter['quoteNos'].indexOf(qm['Name']) === -1) {
                this.filter['quoteNos'].push(qm['Name']);
            }
            qm['Program'] = '';
            if (qm['Project'] && qm['Project']['Name']) {
                qm['Program'] = qm['Project']['Name'];
            }
            if (qm['Program'] && this.filter['programNames'].indexOf(qm['Program']) === -1) {
                this.filter['programNames'].push(qm['Program']);
            }

            qm['CreatedDate'] = (qm['CreatedDate']) ? this._utilityService.dateFormate(qm['CreatedDate']) : '';
        });
        return this.quotes;
    }

    filterQuoteData() {
        let filter = this.filter;
        this.filteredQuotes = this.quotes;
        if (this.filter['selectedProgramName'] !== '--None--') {
            this.filteredQuotes = this.filteredQuotes.filter(function (item) {
                return item['Program'] === filter['selectedProgramName'];
            });
        }
        if (this.filter['selectedQuoteNo'] !== '--None--') {
            this.filteredQuotes = this.filteredQuotes.filter(function (item) {
                return item['Name'] === filter['selectedQuoteNo'];
            });
        }
        if (this.filter['selectedJobsitesCount'] !== '--None--') {
            this.filteredQuotes = this.filteredQuotes.filter(function (item) {
                return item['Jobsites'] === filter['selectedJobsitesCount'];
            });
        }
        this.setPagination();
    }

    setPagination() {
        this.loadingIndicator = false;
        this.tableData = (this.filteredQuotes) ? this.filteredQuotes : [];
        this.setEmptyMessage();
    }

    filterReset() {
        this.filter['selectedQuoteNo'] = '--None--';
        this.filter['selectedProgramName'] = '--None--';
        this.filter['selectedJobsitesCount'] = '--None--';
        this.filteredQuotes = this.quotes;
        this.setPagination();
    }

    toggle(col) {
        col.visible = !col.visible;
    }

    setEmptyMessage() {
        const msg = 'No data to display.';
        if (!this.tableData.length) {
            this.tableData = [{
                'message': msg
            }];
            this.tableData[0][this.columns[0]['prop']] = msg;
        }
    }
    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'QuoteList');
    }
}
