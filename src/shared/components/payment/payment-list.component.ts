import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PreloaderService } from '../../services/preloader.service';
import { ModalService } from './../../services/modal.service';
import { PaymentApi, PurchaseOrderApi } from '../../sdk';
import { UtilityService } from '../../services/utility.service';
import { SharedService } from 'shared/services/pms/shared.services';

@Component({
    selector: 'app-invc-payment-list',
    templateUrl: './payment-list.component.html'
})

export class InvcPaymentsListComponent implements OnInit, AfterViewInit {

    @Input() modelName: string;
    @Input() modelId: string;
    @Input() IsActiveLink = false;
    @Input() Title = 'Payment List';
    @Input() embeddedView = false;

    relationsearchArray: any;
    order: any;
    fields: any;
    errorMessage = '';
    filterquery: any;
    currentExpandViewId: any;
    modelTitle: any;

    /*Boot-Datatable params */
    tableData = [];
    loadingIndicator = false;
    offset = 0;
    tableResource: any;
    tableDataCount = 0;
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 200;
    orderBy = 'Payment_Date__c DESC';
    columns: any;
    allColumns: any;
    filterObj = {};
    filteredItems: any;
    @ViewChild('myTable') table: any;
    noRecords = false;

    constructor(
        private paymentApi: PaymentApi,
        private purchaseOrderApi: PurchaseOrderApi,
        private _modalService: ModalService,
        private _utilityService: UtilityService,
        private _sharedservice: SharedService,
        private el: ElementRef,
        private _loader: PreloaderService
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
            { name: 'Vendor Name', prop: 'vendor', width: 250, visible: true, sortable: true },
            { name: 'Payment #', prop: 'Name', width: 200, visible: true, sortable: true },
            { name: 'Purchase Invoice #', prop: 'invoice', width: 150, visible: true, sortable: true },
            { name: 'Vendor Purchase Receipt Number', prop: 'Vendor_Purchase_Receipt_Number__c', width: 300, visible: true, sortable: true },
            { name: 'Currency', prop: 'CurrencyIsoCode', width: 160, visible: true, sortable: true },
            { name: 'Payment Amount', prop: 'Amount__c', width: 200, visible: true, sortable: true, type: 'decimal' },
            { name: 'Method of Payment', prop: 'Method_of_Payment__c', width: 200, visible: true, sortable: true },
            { name: 'Payment Date', prop: 'Payment_Date__c', width: 200, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'Payment Status', prop: 'Payment_Status__c', width: 200, visible: true, sortable: true },
            { name: 'Remittance Number', prop: 'Remittance_Number__c', width: 200, visible: true, sortable: true },
            { name: 'Promissory Note Number', prop: 'Promissory_Note_Number__c', width: 250, visible: true, sortable: true }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling

        this.fields = [
            'sfdcId',
            'Name',
            'Vendor_Purchase_Receipt_Number__c',
            'CurrencyIsoCode',
            'Amount__c',
            'Method_of_Payment__c',
            'Payment_Date__c',
            'Payment_Status__c',
            'Remittance_Number__c',
            'Promissory_Note_Number__c',
            'Invoice__c'
        ];

        this.relationsearchArray = [
            {
                relation: 'invoice',
                scope: {
                    fields: ['sfdcId', 'Account__c', 'Name'],
                    include: {
                        relation: 'vendor',
                        scope: { fields: ['sfdcId', 'Name'] }
                    }
                }
            }
        ];

        if (this.modelName.toLowerCase() === 'payment') {
            this.filterquery = {};
            this.getPaymentList(this.filterquery, 0);
        } else if (this.modelName.toLowerCase() === 'invoice' && this.modelId) {
            this.filterquery = { Invoice__c: this.modelId };
            this.getPaymentList(this.filterquery, 0);
        } else if (this.modelName.toLowerCase() === 'job' && this.modelId) {
            this.errorMessage = '';
            this.purchaseOrderApi.find({
                where: { Service_Dispatch__c: this.modelId },
                fields: { sfdcId: true }
            }).subscribe(
                order => {
                    if (order && order.length) {
                        this.order = order[0];
                        this.filterquery = { Purchase_Order__c: this.order.sfdcId };
                        this.getPaymentList(this.filterquery, 0);
                    } else {
                        this.errorMessage = 'No records to display.';
                    }
                },
                error => {
                    this.errorMessage = error.message;
                }
            );
        }
    }

    getPaymentList(params: any, offset: number) {
        this.loadingIndicator = true;
        this.errorMessage = '';
        this.paymentApi.find({
            include: this.relationsearchArray,
            fields: this.fields,
            where: params,
            limit: this.itemsPerBatch,
            order: this.orderBy,
            skip: offset
        }).subscribe(
            data => {
                const results = this.modifyData(data);
                this.noRecords = (results.length < this.itemsPerBatch) ? true : false;
                if (!this.isLoadMore) {
                    this.tableData = (results) ? results : [];
                    this.loadingIndicator = false;
                    this._loader.hidePreloader();
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
                item['vendor'] = (item.invoice && item.invoice.vendor && item.invoice.vendor.Name) ? item.invoice.vendor.Name : '';
                item['Name'] = (item.Name) ? item.Name : '';
                item['invoice'] = (item.invoice && item.invoice.Name) ? item.invoice.Name : '';
                item['Vendor_Purchase_Receipt_Number__c'] = (item.Vendor_Purchase_Receipt_Number__c) ? item.Vendor_Purchase_Receipt_Number__c : '';
                item['CurrencyIsoCode'] = (item.CurrencyIsoCode) ? item.CurrencyIsoCode : '';
                item['Amount__c'] = (item.Amount__c) ? item.Amount__c : 0.00;
                item['Method_of_Payment__c'] = (item.Method_of_Payment__c) ? item.Method_of_Payment__c : '';
                item['Payment_Date__c'] = (item.Payment_Date__c) ? this._utilityService.dateFormate(item.Payment_Date__c) : '';
                item['Payment_Status__c'] = (item.Payment_Status__c) ? item.Payment_Status__c : '';
                item['Remittance_Number__c'] = (item.Remittance_Number__c) ? item.Remittance_Number__c : '';
                item['Promissory_Note_Number__c'] = (item.Promissory_Note_Number__c) ? item.Promissory_Note_Number__c : '';
            });
            return data;
        } else {
            return [];
        }
    }

    loadMoreRecords() {
        this.isLoadMore = true;
        this.loadingIndicator = true;
        this.offset = this.tableData.length;
        this._loader.showPreloader();
        this.getPaymentList(this.filterquery, this.tableData.length);
    }

    refreshView() {
        this.isLoadMore = false;
        this.table.offset = 0
        let inputs;
        let index;
        inputs = document.querySelector('div.datatable-row-center').getElementsByTagName('input');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].value = '';
        }
        this.filterObj = {};
        this.getPaymentList(this.filterquery, 0);
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

    setEmptyMessage() {
        const msg = 'No data to display.';
        if (!this.tableData.length) {
            this.tableData = [{
                'message': msg
            }];
            this.tableData[0][this.columns[0]['prop']] = msg;
        }
    }

    toggle(col) {
        col.visible = !col.visible;
    }

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
    }

    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'Payment List');
    }

    openDetails(content, size, obj) {
        this.currentExpandViewId = obj.sfdcId;
        this.modelTitle = 'Invoice Payment: ' + obj.Name
        this._modalService.open(content, size);
    }
}
