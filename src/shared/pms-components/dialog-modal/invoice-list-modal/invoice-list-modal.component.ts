import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { AppStateService } from '../../../services/app-state.service';

import { DashboardApi } from '../../../sdk/services/custom/Dashboard';
import { SharedService } from 'shared/services/pms/shared.services';
import { UtilityService } from 'shared/services/utility.service';

@Component({
    selector: 'invoice-list-modal',
    templateUrl: './invoice-list-modal.component.html',
    styleUrls: ['./invoice-list-modal.component.css']
})

export class InvoiceListModalComponent implements OnInit, AfterViewInit {

    selectedAccountId: string;
    private invoices: any[];
    // setup for ngx-datatable
    tableData = [];
    itemsPerPage = 10;
    itemsPerBatch = 200;
    orderBy = 'createdAt Asc';
    loadingIndicator = true;
    columns: any[];
    allColumns: any[];
    @ViewChild('myTable') table: any;
    errorMessage = '';
    isEnable = false;
    filterObj = {};
    filteredItems: any;

    constructor(
        private _appState: AppStateService,
        private _dashboardApi: DashboardApi,
        private _sharedservice: SharedService,
        private _utilityService: UtilityService,
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
        this.selectedAccountId = this._appState.getSelectedAccount();

        this.columns = [
            { name: 'Sales Invoice Number', prop: 'Name', width: 200, visible: true, sortable: true },
            { name: 'Currency', prop: 'CurrencyIsoCode', width: 100, visible: true, sortable: true },
            { name: 'Invoice Amount', prop: 'Amount__c', width: 200, visible: true, sortable: true },
            { name: 'Invoice Amount (Paid)', prop: 'Total_Paid__c', width: 200, visible: true, sortable: true },
            { name: 'Balance Invoice Amount', prop: 'Balance__c', width: 200, visible: true, sortable: true },
            { name: 'Invoice Due Date', prop: 'Due_Date__c', width: 200, visible: true, sortable: true, type: 'date', format: 'short' }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling

        this.loadInvoice(0);
    }

    loadInvoice(offset: number) {
        this.invoices = [];
        this.errorMessage = '';
        this.loadingIndicator = true;
        this.isEnable = false;
        const paramObj = {
            'accountId': this.selectedAccountId,
            'models': ['Invoice']
        };
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['invoices'] && data['invoices']['list']) {
                        this.invoices = this.dataModify(data['invoices']['list']);
                        this.tableData = (this.invoices) ? this.invoices : [];
                    }
                }
                if (this.tableData) {
                    this.filteredItems = this.tableData.slice();
                }
                this.setEmptyMessage();
                this.loadingIndicator = false;
                this.isEnable = true;
            },
            error => {
                console.log('Error fetching states>>', error.message);
                this.errorMessage = error.message;
                this.loadingIndicator = false;
                this.isEnable = true;
            }
        );
    }

    dataModify(data) {
        if (data.length) {
            data.forEach(element => {
                console.log(element);
                element['Due_Date__c'] = (element.Due_Date__c) ? this._utilityService.dateFormate(element.Due_Date__c) : '';

            });
        }
        return data;
    }

    toggle(col) {
        col.visible = !col.visible;
    }
    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
    }

    refreshView() {
        this.table.offset = 0
        let inputs;
        let index;
        inputs = document.getElementsByTagName('input');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].value = '';
        }
        this.filterObj = {};
        this.loadInvoice(0);
    }


    filterData(event, type) {
        if (type === 'date') {
            if (event.value === '') {
                if (this.filterObj[event.input.id + '_temp']) {
                    delete this.filterObj[event.input.id];

                }
            } else {
                const date = this._utilityService.dateFormate(event.value).split(',');
                this.filterObj[event.input.id] = date[0];
            }
            this.tableData = this.filteredItems.filter(item => {
                let notMatchingField = Object.keys(this.filterObj).find(key =>
                    this._utilityService.dataTableSearch(item, this.filterObj, key));
                return !notMatchingField;
            });

        } else {
            if (event.target.value === '') {
                delete this.filterObj[event.currentTarget.id];
            } else {
                this.filterObj[event.currentTarget.id] = event.target.value;
            }
            this.tableData = this.filteredItems.filter(item => {
                let notMatchingField = Object.keys(this.filterObj).find(key =>
                    this._utilityService.dataTableSearch(item, this.filterObj, key));
                return !notMatchingField;
            });
        }
        this.table.offset = 0;
        this.setEmptyMessage();

    }

    clearSearch(col) {
        if (col in this.filterObj) {
            this.filterObj[col] = ''
            delete this.filterObj[col];
            this.tableData = this.filteredItems.filter(item => {
                const notMatchingField = Object.keys(this.filterObj).find(key =>
                    this._utilityService.dataTableSearch(item, this.filterObj, key));
                return !notMatchingField;
            });
            this.table.offset = 0;
            this.setEmptyMessage();
        }
    }
    checkFilterValidity(a, b, c) {
        return this._utilityService.dataTableSearch(a, b, c);
    }
    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'InvoiceList');
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
}
