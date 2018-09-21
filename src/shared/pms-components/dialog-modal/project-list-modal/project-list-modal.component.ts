import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { AppStateService } from '../../../services/app-state.service';

import { DashboardApi } from '../../../sdk/services/custom/Dashboard';
import { SharedService } from 'shared/services/pms/shared.services';

@Component({
    selector: 'project-list-modal',
    templateUrl: './project-list-modal.component.html',
    styleUrls: ['./project-list-modal.component.css']
})
 
export class ProjectListModalComponent implements OnInit, AfterViewInit {

    selectedAccountId: string;
    errorMessage = '';
    private programs = [];
    private filteredPrograms = [];
    private filter = {
        accounts: [],
        accountFilter: '--None--',
        programs: [],
        programFilter: '--None--',
        quotes: [],
        quoteFilter: '--None--',
        jobsites: [],
        jobsiteFilter: '--None--',
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
    offset = 0;
    isFilter: boolean;
    filterQuery: any;
    isEnable = false

    constructor(
        private _appState: AppStateService,
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
            { name: 'Account', prop: 'AccountName', width: 350, visible: true, sortable: true },
            { name: 'Program #', prop: 'Project__c', width: 200, visible: true, sortable: true },
            { name: 'Name', prop: 'Name', width: 350, visible: true, sortable: true },
            { name: 'Quotes', prop: 'quoteCount', width: 100, visible: true, sortable: true },
            { name: 'JobSite', prop: 'jobsiteCount', width: 100, visible: true, sortable: true }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling

        this.selectedAccountId = this._appState.getSelectedAccount();
        if (this.selectedAccountId) {
            this.loadPrograms(0);
        }
    }

    loadPrograms(offset: number) {
        this.loadingIndicator = true;
        this.isEnable = false;
        this.errorMessage = '';
        this.programs = [];
        this.filteredPrograms = [];
        let paramObj = {
            'accountId': this.selectedAccountId,
            'models': ['Project']
        };
        if (localStorage.getItem('programId')) {
            paramObj['programId'] = localStorage.getItem('programId');
        }
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['programs'] && data['programs']['list']) {
                        this.programs = data['programs']['list'];
                    }
                    this.filteredPrograms = this.programs;
                }
                this.loadingIndicator = false;
                this.isEnable = true;
                this.prepareFilters();
                this.setPagination();
            },
            error => {
                this.loadingIndicator = false;
                this.errorMessage = error.message;
                this.isEnable = true;
            }
        );
    }

    setPagination() {
        this.tableData = (this.filteredPrograms) ? this.filteredPrograms : [];
        this.setEmptyMessage();
    }

    prepareFilters() {
        this.programs.forEach(program => {
            if (this.filter['accounts'].indexOf(program['AccountName']) === -1) {
                this.filter.accounts.push(program['AccountName']);
            }
            if (this.filter['programs'].indexOf(program['Project__c']) === -1) {
                this.filter.programs.push(program['Project__c']);
            }
            if (this.filter['quotes'].indexOf(program['quoteCount']) === -1) {
                this.filter.quotes.push(program['quoteCount']);
            }
            if (this.filter['jobsites'].indexOf(program['jobsiteCount']) === -1) {
                this.filter.jobsites.push(program['jobsiteCount']);
            }
        })
    }

    filterDataList(filterObj) {
        if (filterObj) {
            this.filterQuery = filterObj;
            this.isFilter = false;
            this.loadPrograms(0);
        }
    }

    filterProgramsData() {
        let filter = this.filter;
        this.filteredPrograms = this.programs;
        if (this.filter['accountFilter'] !== '--None--') {
            this.filteredPrograms = this.filteredPrograms.filter(function (item) {
                return item['AccountName'] === filter['accountFilter'];
            });
        }
        if (this.filter['programFilter'] !== '--None--') {
            this.filteredPrograms = this.filteredPrograms.filter(function (item) {
                return item['Project__c'] === filter['programFilter'];
            });
        }
        if (this.filter['quoteFilter'] !== '--None--') {
            this.filteredPrograms = this.filteredPrograms.filter(function (item) {
                return item['quoteCount'] === filter['quoteFilter'];
            });
        }
        if (this.filter['jobsiteFilter'] !== '--None--') {
            this.filteredPrograms = this.filteredPrograms.filter(function (item) {
                return item['jobsiteCount'] === filter['jobsiteFilter'];
            });
        }
        this.setPagination();
    }

    filterReset() {
        this.filter['accountFilter'] = '--None--';
        this.filter['programFilter'] = '--None--';
        this.filter['quoteFilter'] = '--None--';
        this.filter['jobsiteFilter'] = '--None--';
        this.filteredPrograms = this.programs;
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
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'ProgramList');
    }
}
