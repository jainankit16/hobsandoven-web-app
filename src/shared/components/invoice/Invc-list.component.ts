import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { InvoiceApi } from '../../sdk/services/custom/Invoice';
import { ModalService } from '../../services/modal.service';
import { SharedService } from 'shared/services/pms/shared.services';
import { UtilityService } from '../../services/utility.service';
import { PreloaderService } from '../../../shared/services/preloader.service';

@Component({
    selector: 'app-ordr-invoice-list',
    templateUrl: './Invc-list.component.html'
})
export class OrdrInvoiceListComponent implements OnInit, AfterViewInit {
    @Input() modelName: string;
    @Input() modelId: string;
    @Input() IsActiveLink = false;
    @Input() Title = 'Invoice List';

    relationsearchArray: any;
    errorMessage = 'Loading..';
    fields: any;
    filterquery: any;
    /*Boot-Datatable params */
    currentExpandViewId: any;
    modelTitle: any;
    tableData = [];
    loadingIndicator = false;
    offset = 0;
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 200;
    orderBy = 'Due_Date__c DESC';
    columns: any;
    allColumns: any;
    filterObj = {};
    filteredItems: any;
    @ViewChild('myTable') table: any;
    noRecords = false;


    constructor(
        private invoiceApi: InvoiceApi,
        private _modalService: ModalService,
        private _sharedservice: SharedService,
        private _utilityService: UtilityService,
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
            { name: 'Vendor Name', prop: 'vendor', width: 350, visible: true, sortable: true },
            { name: 'Purchase Invoice #', prop: 'Name', width: 200, visible: true, sortable: true },
            { name: 'Job ID', prop: 'Iron_Job_num__c', width: 150, visible: true, sortable: true },
            { name: 'TimeCard/Timesheet #', prop: 'timecard', width: 200, visible: true, sortable: true },
            { name: 'Hours per Visit', prop: 'Total_Worked_Hours_Without_Offset__c', width: 200, visible: true, sortable: true },
            { name: 'PPE Hour(s)', prop: 'PO_PPE_Hours__c', width: 150, visible: true, sortable: true },
            { name: 'Currency', prop: 'CurrencyIsoCode', width: 150, visible: true, sortable: true },
            { name: 'PPE Hour(s) Cost', prop: 'PO_PPE_Hours_Price__c', width: 200, visible: true, sortable: true, type: 'decimal' },
            { name: 'T&M Hourly Cost(Overage)', prop: 'PO_Additional_Hours_Price__c', width: 200, visible: true, sortable: true, type: 'decimal' },
            { name: 'VAT Amount', prop: 'Actual_VAT_Tax__c', width: 160, visible: true, sortable: true, type: 'decimal' },
            { name: 'Grand Total', prop: 'Amount__c', width: 150, visible: true, sortable: true, type: 'decimal' },
            { name: 'Balance PI Amount', prop: 'Balance__c', width: 200, visible: true, sortable: true, type: 'decimal' },
            { name: 'Purchase Invoice Due Date', prop: 'Due_Date__c', width: 250, visible: true, sortable: true, type: 'date', format: 'short' }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling

        this.relationsearchArray = [
            {
                relation: 'purchaseOrder',
                scope: {
                    fields: ['sfdcId', 'Purchase_Order__c', 'Service_Dispatch__c'],
                    include: {
                        relation: 'job',
                        scope: {
                            fields: ['sfdcId', 'Iron_Job_num__c']
                        }
                    }
                }
            },
            {
                relation: 'vendor',
                scope: {
                    fields: ['sfdcId', 'Name']
                }
            },
            {
                relation: 'timecard',
                scope: {
                    fields: ['sfdcId', 'Name', 'Total_Worked_Hours_Without_Offset__c']
                }
            }
        ];
        this.fields = [
            'sfdcId',
            'Name',
            'PO_PPE_Hours__c',
            'CurrencyIsoCode',
            'PO_PPE_Hours_Price__c',
            'PO_Additional_Hours_Price__c',
            'Actual_VAT_Tax__c',
            'Amount__c',
            'Balance__c',
            'Due_Date__c',
            'Account__c',
            'Purchase_Order__c',
            'Timecard_Timesheet__c'
        ];
        if (
            this.modelName === 'undefined' ||
            this.modelName.toLowerCase() === 'timecard'
        ) {
            this.filterquery = { Timecard_Timesheet__c: this.modelId };
        } else if (this.modelName.toLowerCase() === 'order') {
            this.filterquery = { Purchase_Order__c: this.modelId };
        }
        this.getInvoiceList(0);
    }
    getInvoiceList(offset: number) {
        this.loadingIndicator = true;
        this.invoiceApi
            .find({
                include: this.relationsearchArray,
                where: this.filterquery,
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
                item['vendor'] = (item.vendor && item.vendor.Name) ? item.vendor.Name : '';
                item['Name'] = (item.Name) ? item.Name : '';
                item['Iron_Job_num__c'] = (item.purchaseOrder && item.purchaseOrder.job && item.purchaseOrder.job.Iron_Job_num__c)
                    ? item.purchaseOrder.job.Iron_Job_num__c : '';
                item['timecard'] = (item.timecard && item.timecard.Name) ? item.timecard.Name : '';
                item['Total_Worked_Hours_Without_Offset__c'] = (item.timecard.Total_Worked_Hours_Without_Offset__c) ?
                    item.timecard.Total_Worked_Hours_Without_Offset__c : '';
                item['PO_PPE_Hours__c'] = (item.PO_PPE_Hours__c) ? item.PO_PPE_Hours__c : '';
                item['CurrencyIsoCode'] = (item.CurrencyIsoCode) ? item.CurrencyIsoCode : '';
                item['PO_PPE_Hours_Price__c'] = (item.PO_PPE_Hours_Price__c) ? item.PO_PPE_Hours_Price__c : '';
                item['PO_Additional_Hours_Price__c'] = (item.PO_Additional_Hours_Price__c) ? item.PO_Additional_Hours_Price__c : '';
                item['Actual_VAT_Tax__c'] = (item.Actual_VAT_Tax__c) ? item.Actual_VAT_Tax__c : '';
                item['Amount__c'] = (item.Amount__c) ? item.Amount__c : '';
                item['Balance__c'] = (item.Balance__c) ? item.Balance__c : '';
                item['Due_Date__c'] = (item.Due_Date__c) ? this._utilityService.dateFormate(item.Due_Date__c) : '';

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
        this.getInvoiceList(this.tableData.length);
    }

    refreshView() {
        this.isLoadMore = false;
        this.table.offset = 0;
        let inputs;
        let index;
        inputs = document.getElementsByTagName('input');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].value = '';
        }
        this.filterObj = {};
        this.getInvoiceList(0);
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
    private __remove(array, element) {
        if (array[element]) {
            delete array[element];
        }

        return array;
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

    toggle(col) {
        col.visible = !col.visible;
    }

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
    }

    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'Invoice List');
    }

    openDetails(content, size, obj) {
        this.currentExpandViewId = obj.sfdcId;
        this.modelTitle = 'Purchase Invoice: ' + obj.Name;
        this._modalService.open(content, size);
    }
}
