import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { AppStateService } from '../../../services/app-state.service';

import { DashboardApi } from '../../../sdk/services/custom/Dashboard';
import { SharedService } from 'shared/services/pms/shared.services';
import { UtilityService } from 'shared/services/utility.service';

@Component({
    selector: 'sales-order-list-modal',
    templateUrl: './sales-order-list-modal.component.html',
    styleUrls: ['./sales-order-list-modal.component.css']
})

export class SalesOrderListModalComponent implements OnInit, AfterViewInit {

    selectedAccountId: string;
    private salesOrders = [];
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
        this.columns = [
            { name: 'Sales Order Number', prop: 'Sales_Order_Number__c', width: 200, visible: true, sortable: true },
            { name: 'Sales Order Date', prop: 'Sales_Order_Start_Date__c', width: 200, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'Currency', prop: 'CurrencyIsoCode', width: 200, visible: true, sortable: true },
            {
                name: 'Count of Line Items (SO)', prop: 'Count_of_Order_Items__c',
                width: 200, visible: true, sortable: true
            },
            { name: 'PPE Hours (SO)', prop: 'SO_PPE_Hours__c', width: 200, visible: true, sortable: true },
            {
                name: 'PPE Hour(s) Price (SO)',
                prop: 'SO_PPE_Hours_Price__c', width: 200, visible: true, sortable: true
            },
            {
                name: 'Hours per Visit (Overage)', prop: 'SO_Additional_Hours__c',
                width: 200, visible: true, sortable: true
            }
            ,
            {
                name: 'Total Visit Hours Ref (Overage)', prop: 'Vendor_Time_Card_Total_Hours_All_Visits__c',
                width: 220, visible: true, sortable: true
            },
            {
                name: 'Total Visit Hours Ref (PPE + Overage)', prop: 'SO_Already_Invoiced_Hours__c',
                width: 270, visible: true, sortable: true
            },
            {
                name: 'TM Hourly Price (Overage)', prop: 'SO_Roll_up_Additional_Rate__c',
                width: 200, visible: true, sortable: true
            },
            {
                name: 'Helpdesk Price', prop: 'Roll_up_helpdesk_Price__c',
                width: 200, visible: true, sortable: true
            },
            {
                name: 'VAT %', prop: 'Roll_up_VAT__c',
                width: 200, visible: true, sortable: true
            },
            {
                name: 'VAT Amount', prop: 'Actual_VAT_Tax__c',
                width: 200, visible: true, sortable: true
            },
            {
                name: 'Total Sales Order Amt Ref', prop: 'SO_Already_Invoiced_Amount__c',
                width: 200, visible: true, sortable: true
            },
            {
                name: 'Total Sales Order Amt Ref (Open)', prop: 'Total_Un_Invoiced_Amount__c',
                width: 250, visible: true, sortable: true
            },
            {
                name: 'Sales Order Closed Date', prop: 'Sales_Order_End_Date__c',
                width: 200, visible: true, sortable: true, type: 'date', format: 'short'
            },
            {
                name: 'Total Invoice Amt Ref (Billed)', prop: 'SO_Already_Invoiced_Amount__c',
                width: 200, visible: true, sortable: true
            },
            {
                name: 'Total Invoice Hours Ref (Billed)', prop: 'SO_Already_Invoiced_Hours__c',
                width: 240, visible: true, sortable: true
            },
            {
                name: 'Visit Hours Approval Status', prop: 'Roll_up_Timecard_s_IRON_Approval_Status__c',
                width: 200, visible: true, sortable: true
            }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling

        this.selectedAccountId = this._appState.getSelectedAccount();
        if (this.selectedAccountId) {
            this.loadSalesOrder(0);
        }
    }

    loadSalesOrder(offset: number) {
        this.salesOrders = [];
        this.errorMessage = '';
        this.loadingIndicator = true;
        this.isEnable = false;
        const paramObj = {
            'accountId': this.selectedAccountId,
            'models': ['SalesOrder']
        };
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['salesOrders'] && data['salesOrders']['list']) {
                        this.salesOrders = this.dataModify(data['salesOrders']['list']);
                        this.tableData = (this.salesOrders) ? this.salesOrders : [];
                    }
                }
                if (this.tableData) {
                    this.filteredItems = this.tableData.slice();
                }
                this.loadingIndicator = false;
                this.isEnable = true;
                this.setEmptyMessage();
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
                element['Sales_Order_Start_Date__c'] = (element.Sales_Order_Start_Date__c) ? this._utilityService.dateFormate(element.Sales_Order_Start_Date__c) : '';
                element['Sales_Order_End_Date__c'] = (element.Sales_Order_End_Date__c) ? this._utilityService.dateFormate(element.Sales_Order_End_Date__c) : '';

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
        this.loadSalesOrder(0);
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
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'SalesOrdersList');
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
