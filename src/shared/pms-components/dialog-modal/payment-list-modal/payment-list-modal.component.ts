import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { AppStateService } from '../../../services/app-state.service';
import { UtilityService } from '../../../services/utility.service'

import { DashboardApi } from '../../../sdk/services/custom/Dashboard';
import { SharedService } from 'shared/services/pms/shared.services';

@Component({
    selector: 'payment-list-modal',
    templateUrl: './payment-list-modal.component.html',
    styleUrls: ['./payment-list-modal.component.css']
})

export class PaymentListModalComponent implements OnInit, AfterViewInit {

    selectedAccountId: string;
    private payments = [];
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
            { name: 'Payment #', prop: 'Name', width: 150, visible: true, sortable: true },
            { name: 'Account', prop: 'VendorAccountName', width: 350, visible: true, sortable: true },
            { name: 'Method of Payment', prop: 'Method_of_Payment__c', width: 200, visible: true, sortable: true },
            { name: 'Payment Status', prop: 'Payment_Status__c', width: 200, visible: true, sortable: true },
            { name: 'Payment Date', prop: 'Payment_Date__c', width: 200, visible: true, sortable: true, type: 'date', format: 'short' }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Togglings

        this.selectedAccountId = this._appState.getSelectedAccount();
        if (this.selectedAccountId) {
            this.loadPayments(0);
        }
    }

    loadPayments(offset: number) {
        this.payments = [];
        this.errorMessage = '';
        this.loadingIndicator = true;
        this.isEnable = false;
        const paramObj = {
            'accountId': this.selectedAccountId,
            'models': ['Payment']
        };
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['payments'] && data['payments']['list']) {
                        this.payments = this.dataModify(data['payments']['list']);
                        this.tableData = (this.payments) ? this.payments : [];
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
                this.errorMessage = error.message;
                this.loadingIndicator = false;
                this.isEnable = true;

            }
        );
    }

    dataModify(data) {
        if (data.length) {
            data.forEach(element => {
                element['VendorAccountName'] = (element['invoice'] && element['invoice']['vendor']) ? element['invoice']['vendor']['Name'] : '';
                element['Payment_Date__c'] = element['Payment_Date__c'] ?
                    this._utilityService.dateFormate(element['Payment_Date__c']) : '';

                delete element['invoice']

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
        this.loadPayments(0);
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
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'PaymentList');
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
