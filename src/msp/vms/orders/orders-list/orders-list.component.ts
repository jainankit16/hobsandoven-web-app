import { ModalService } from './../../../../shared/services/modal.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PreloaderService } from '../../../../shared/services/preloader.service';
import { PurchaseOrderApi } from '../../../../shared/sdk/services/custom/PurchaseOrder';
import { UtilityService } from '../../../../shared/services/utility.service';
import { SharedService } from 'shared/services/pms/shared.services';

@Component({
    selector: 'app-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit, AfterViewInit {
    // Search form params ;
    pageTitle: string;
    relationModel: any;
    fields: any;
    pageSubTitle: string;
    errorMessage: string;
    /*Boot-Datatable params */
    tableData = [];
    loadingIndicator = false;
    tableDataCount = 0;
    offset = 0;
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 200;
    orderBy = 'LastModifiedDate  DESC';
    currentExpandViewId: any;
    modalTitle: any;
    columns: any;
    allColumns: any;
    filterObj = {};
    filteredItems: any;
    @ViewChild('myTable') table: any;
    isFilter: boolean;
    noRecords = false;

    constructor(
        private _purchaseOrderApi: PurchaseOrderApi,
        private _modalService: ModalService,
        private _utilityService: UtilityService,
        private _sharedservice: SharedService,
        private el: ElementRef,
        private _loader: PreloaderService
    ) {
        this.pageTitle = 'Purchase Order List';
        this.pageSubTitle = 'Listing all Orders';
    }

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
            { name: 'Vendor Name', prop: 'vendor', width: 350, visible: true, sortable: true },
            { name: 'Iron PO#', prop: 'Work_Order_num__c', width: 250, visible: true, sortable: true },
            { name: 'Job ID', prop: 'Iron_Job_num__c', width: 200, visible: true, sortable: true },
            { name: 'Jobsite Name', prop: 'Jobsite_Name__c', width: 350, visible: true, sortable: true },
            { name: 'Service Type', prop: 'Customer_Service_Type_From_Program__c', width: 200, visible: true, sortable: true },
            { name: 'Currency', prop: 'CurrencyIsoCode', width: 150, visible: true, sortable: true },
            { name: 'PPE Hour(s)', prop: 'Roll_up_PPE_Hours__c', width: 200, visible: true, sortable: true, type: 'decimal' },
            { name: 'PPE Hour(s) Cost', prop: 'List_Price_Total_from_Line_Items__c', width: 200, visible: true, sortable: true, type: 'decimal' },
            { name: 'VAT/GST Country', prop: 'VAT_GST', width: 200, visible: true, sortable: true },
            { name: 'VAT(%)', prop: 'Roll_up_VAT_Percent__c', width: 150, visible: true, sortable: true, type: 'percentage' },
            { name: 'Grand Total', prop: 'Grand_Total_Total_From_Line_Items__c', width: 200, visible: true, sortable: true, type: 'decimal' },
            { name: 'Job Service Resolution Status - FSE', prop: 'Dispatch_Service_Resolution_Status__c', width: 250, visible: true, sortable: true },
            { name: 'Last Modified', prop: 'LastModifiedDate', width: 250, visible: true, sortable: true, type: 'date', format: 'short' }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling

        this.fields = [
            'sfdcId',
            'Work_Order_num__c',
            'Roll_up_PPE_Hours__c',
            'List_Price_Total_from_Line_Items__c',
            'Roll_up_VAT_Percent__c',
            'Grand_Total_Total_From_Line_Items__c',
            'LastModifiedDate',
            'CurrencyIsoCode',
            'Vendor__c',
            'Jobsite__c',
            'Service_Dispatch__c',
            'WorkOrder'
        ];
        this.relationModel = [
            { relation: 'vendor', scope: { fields: ['Name'] } },
            { relation: 'lineItems', scope: { limit: 1, fields: ['VAT_GST__c'] } },
            {
                relation: 'job',
                scope: {
                    fields: [
                        'Iron_Job_num__c',
                        'Jobsite_Name__c',
                        'Customer_Service_Type_From_Program__c',
                        'Dispatch_Service_Resolution_Status__c'
                    ]
                }
            }
        ];
        this.getOrderList(0);
    }
    getOrderList(offset: number) {
        this.loadingIndicator = true;
        this._purchaseOrderApi
            .find({
                include: this.relationModel,
                fields: this.fields,
                limit: this.itemsPerBatch,
                order: this.orderBy,
                skip: offset
            })
            .subscribe(
                data => {
                    const results = this.modifyData(data);
                    this.noRecords = (results.length < this.itemsPerBatch) ? true : false;
                    if (!this.isLoadMore) {
                        this.tableData = (results) ? results : [];
                        this._loader.hidePreloader();
                        this.loadingIndicator = false;
                    } else {
                        if (results.length) {
                            results.forEach(c => {
                                this.tableData.push(c);
                            });
                            this.tableData = [...this.tableData];
                        }
                    }
                    if (this.tableData) {
                        this.filteredItems = this.tableData.slice();
                    }
                    this.loadingIndicator = false;
                    this._loader.hidePreloader();
                    this.setEmptyMessage();
                },
                error => {
                    this.errorMessage = error.message;
                    this._loader.hidePreloader();
                    this.loadingIndicator = false;
                }
            );
    }


    modifyData(data) {
        if (data.length) {
            data.forEach((item) => {
                item['vendor'] = (item.vendor && item.vendor.Name) ? item.vendor.Name : '';
                item['Work_Order_num__c'] = (item.Work_Order_num__c) ? item.Work_Order_num__c : '';
                item['Iron_Job_num__c'] = (item.job && item.job.Iron_Job_num__c) ? item.job.Iron_Job_num__c : '';
                item['Jobsite_Name__c'] = (item.job && item.job.Jobsite_Name__c) ? item.job.Jobsite_Name__c : '';
                item['Customer_Service_Type_From_Program__c'] = (item.job && item.job.Customer_Service_Type_From_Program__c) ?
                    item.job.Customer_Service_Type_From_Program__c : '';
                item['CurrencyIsoCode'] = (item.CurrencyIsoCode) ? item.CurrencyIsoCode : '';
                item['Roll_up_PPE_Hours__c'] = (item.Roll_up_PPE_Hours__c) ? item.Roll_up_PPE_Hours__c : '';
                item['List_Price_Total_from_Line_Items__c'] = (item.List_Price_Total_from_Line_Items__c) ?
                    item.List_Price_Total_from_Line_Items__c : '';
                item['VAT_GST'] = (item.lineItems[0] && item.lineItems[0].VAT_GST__c) ? item.lineItems[0].VAT_GST__c : '';
                item['Roll_up_VAT_Percent__c'] = (item.Roll_up_VAT_Percent__c) ? item.Roll_up_VAT_Percent__c + '%' : '';
                item['Grand_Total_Total_From_Line_Items__c'] = (item.Grand_Total_Total_From_Line_Items__c) ? item.Grand_Total_Total_From_Line_Items__c : '';

                item['Dispatch_Service_Resolution_Status__c'] = (item.job && item.job.Dispatch_Service_Resolution_Status__c) ?
                    item.job.Dispatch_Service_Resolution_Status__c : '';
                item['LastModifiedDate'] = (item.LastModifiedDate) ? this._utilityService.dateFormate(item.LastModifiedDate) : '';


                //  delete key
                delete item.job;
                // delete item.vendor;
            });
            return data;
        } else {
            return [];
        }
    }

    loadMoreRecords() {
        this.isLoadMore = true;
        this.loadingIndicator = true;
        this._loader.showPreloader();
        this.offset = this.tableData.length;
        this.getOrderList(this.tableData.length);
    }

    refreshView() {
        this.isLoadMore = false;
        this.table.offset = 0
        let inputs;
        let index;
        inputs = document.getElementsByTagName('input');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].value = '';
        }
        this.filterObj = {};
        this.getOrderList(0);
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

    checkFilterValidity(a, b, c) {
        return this._utilityService.dataTableSearch(a, b, c);
    }

    setEmptyMessage() {
        const msg = 'No data to display.';
        if (!this.tableData.length) {
            this.tableData = [{
                'message': msg
            }];
            this.tableData[0][this.columns[1]['prop']] = msg;
        }
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

    togglex(col) {
        col.visible = !col.visible;
    }

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
    }

    rowTooltip(item) {
        return item.sfdcId;
    }

    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'OrderList');
    }

    openDetails(content, size, obj) {
        this.currentExpandViewId = obj.sfdcId;
        this.modalTitle = 'Purchase Order: ' + obj['Work_Order_num__c']
        this._modalService.open(content, size);
    }
}
