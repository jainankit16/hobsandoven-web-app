import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { PreloaderService } from '../../services/preloader.service';
import { ModalService } from './../../services/modal.service';
import { AppStateService } from '../../services/app-state.service';
import { UtilityService } from '../../../shared/services/utility.service';

import { TimecardApi } from '../../sdk/services/custom/Timecard';
import { SharedService } from 'shared/services/pms/shared.services';

@Component({
    moduleId: module.id,
    selector: 'app-timecard-list',
    templateUrl: './timecard-list.component.html'
})

export class TimecardListComponent implements OnInit, AfterViewInit {

    @Input() modelName: string;
    @Input() modelId: string;
    @Input() IsActiveLink = false;
    Title = 'Time Card List';
    currentExpandViewId: any;
    modalTitle: any;
    query = {};
    isInternalUser = false;
    /*Boot-Datatable params */
    tableData = [];
    loadingIndicator = false;
    offset = 0;
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 200;
    orderBy = 'CreatedDate  DESC';
    errorMessage = 'Loading...';
    filterObj = {};
    filteredItems: any;
    @ViewChild('myTable') table: any;
    columns: any;
    noRecords = false;
    allColumns: any;

    constructor(
        private _appState: AppStateService,
        private _modalService: ModalService,
        private _utilityService: UtilityService,
        private timeCardApi: TimecardApi,
        private _sharedservice: SharedService,
        private el: ElementRef,
        private _loader: PreloaderService
    ) { }

    updateData(savedTimeCard) {
        this.getTimeCardList(this.query, 0);
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
        const accessType = this._appState.getAccessType();
        this.columns = [
            { name: 'Vendor Name', prop: 'vendorName', width: 200, visible: true, sortable: true },
            {
                name: 'Timecard/ Timesheet #',
                prop: 'Name',
                width: 200, visible: true, sortable: true
            },
            { name: 'Iron PO #', prop: 'Work_Order_num__c', width: 200, visible: true, sortable: true },
            { name: 'Job ID', prop: 'Iron_Job_num__c', width: 200, visible: true, sortable: true },
            { name: 'Final Visit', prop: 'Final_Timecard', width: 200, visible: true, sortable: true },
            { name: 'Timecard/Timesheet Approval Status', prop: 'Customer_Approval_Status__c', width: 280, visible: true, sortable: true },
            { name: 'Visit Number', prop: 'Visit_Number_Calc__c', width: 200, visible: true, sortable: true },
            {
                name: 'Worker Site Check-in Time',
                prop: 'Vendor_Time_Card_Time_in_Actual__c',
                width: 200, visible: true, sortable: true, type: 'date', format: 'short'
            },
            {
                name: 'Worker Site Check-Out Time',
                prop: 'Vendor_Time_Card_Time_Out_Actual__c',
                width: 200, visible: true, sortable: true, type: 'date', format: 'short'
            },
            { name: 'Hours per Visit', prop: 'Total_Worked_Hours_Without_Offset__c', width: 200, visible: true, sortable: true },

            { name: 'Worker Name', prop: 'workerName', width: 200, visible: true, sortable: true },
            { name: 'Customer Site Sign-off Name (POD)', prop: 'Customer_Site_Signoff_Name__c', width: 280, visible: true, sortable: true },
            { name: 'Created Date', prop: 'CreatedDate', width: 200, visible: true, sortable: true, type: 'date', format: 'short' }
        ];
        if (accessType && accessType === 'internal') {
            this.isInternalUser = true;
        } else if (accessType && accessType === 'vendor') {
            this.columns.shift()
        }

        this.allColumns = this.columns.slice(); // Used for Columns Toggling


        if (this.modelName.toLowerCase() === 'job') {
            this.query = { Service_Dispatch__c: this.modelId, isDeleted: null };
        } else if (this.modelName.toLowerCase() === 'timecard') {
            this.query = { isDeleted: null };
        }
        this.getTimeCardList(this.query, 0);
    }

    toggle(col) {
        col.visible = !col.visible;
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
        this.getTimeCardList(this.query, 0);
    }

    getTimeCardList(params: any, offset: number) {
        this.loadingIndicator = true;
        const req = {
            'where': params,
            'limit': this.itemsPerBatch,
            'order': this.orderBy,
            'skip': offset,
        }
        this.timeCardApi.getTimeCardList(req).subscribe(
            data => {
                if (data.length < this.itemsPerBatch) {
                    this.noRecords = true;
                }
                if (data.length > 0) {
                    const results = this.modifyData(data);
                    this.noRecords = (results.length < this.itemsPerBatch) ? true : false;
                    if (!this.isLoadMore) {
                        this.tableData = (results) ? results : [];
                    } else {
                        if (results.length) {
                            results.forEach(c => {
                                this.tableData.push(c);
                            });
                            this.tableData = [...this.tableData];
                        }
                    }
                    this._loader.hidePreloader();
                    this.loadingIndicator = false;
                    if (this.tableData) {
                        this.filteredItems = this.tableData.slice();
                    }
                } else {
                    this.setEmptyMessage();
                    this.loadingIndicator = false;
                    this._loader.hidePreloader();
                    this.errorMessage = 'No Records Found';
                }
            },
            error => {
                this.loadingIndicator = false;
                this._loader.hidePreloader();
                this.errorMessage = error.message;
            }
        );
    }

    modifyData(data) {
        if (data.length) {
            data.forEach(item => {
                item['Name'] = (item.Name) ? item.Name : '';
                item['Customer_Approval_Status__c'] = item.Customer_Approval_Status__c ? item.Customer_Approval_Status__c : '';
                item['Final_Timecard__c'] = item.Final_Timecard__c ? item.Final_Timecard__c : '';
                item['Purchase_Order_Ref__c'] = item.Purchase_Order_Ref__c ? item.Purchase_Order_Ref__c : '';
                item['Vendor__c'] = item.Vendor__c ? item.Vendor__c : '';
                item['Visit_Number_Calc__c'] = item.Visit_Number_Calc__c ? item.Visit_Number_Calc__c : '';
                item['sfdcId'] = item.sfdcId ? item.sfdcId : '';
                item['Total_Worked_Hours_Without_Offset__c'] = item.Total_Worked_Hours_Without_Offset__c ? item.Total_Worked_Hours_Without_Offset__c : '';
                item['Customer_Site_Signoff_Name__c'] = item.Customer_Site_Signoff_Name__c ? item.Customer_Site_Signoff_Name__c : '';
                item['Final_Timecard'] = (item.Final_Timecard__c === true) ? 'Yes' : 'No';
                item['workerName'] = (item.worker) ? item.worker.Name : '';
                item['workersfdcId'] = (item.worker) ? item.worker.sfdcId : '';
                item['Iron_Job_num__c'] = (item.job) ? item.job.Iron_Job_num__c : '';
                item['Work_Order_num__c'] = (item.purchaseOrder) ? item.purchaseOrder.Work_Order_num__c : '';
                item['vendorName'] = (item.vendor) ? item.vendor.Name : '';
                item['vendorsfdcId'] = (item.vendor) ? item.vendor.sfdcId : '';
                item['Vendor_Time_Card_Time_in_Actual__c'] = (item.Vendor_Time_Card_Time_in_Actual__c) ?
                    this._utilityService.dateFormate(item.Vendor_Time_Card_Time_in_Actual__c) : '';
                item['Vendor_Time_Card_Time_Out_Actual__c'] = (item.Vendor_Time_Card_Time_Out_Actual__c) ?
                    this._utilityService.dateFormate(item.Vendor_Time_Card_Time_Out_Actual__c) : '';
                item['CreatedDate'] = (item.CreatedDate) ?
                    this._utilityService.dateFormate(item.CreatedDate) : '';
                if (item && item.job) {
                    delete item.job;
                }
                if (item && item.vendor) {
                    delete item.vendor;
                }
                if (item && item.purchaseOrder) {
                    delete item.purchaseOrder;
                }
                if (item && item.worker) {
                    delete item.worker;
                }
            });
            return data;
        }
    }
    /*Data Table funcation start here*/
    loadMoreRecords() {
        this.isLoadMore = true;
        this.loadingIndicator = true;
        this.offset = this.tableData.length;
        this._loader.showPreloader();
        this.getTimeCardList(this.query, this.tableData.length);
    }

    rowTooltip(item) {
        return item.sfdcId;
    }

    openDetails(content, size, obj) {
        this.currentExpandViewId = obj.sfdcId;
        this.modalTitle = 'Timecard: ' + obj.Name;
        this._modalService.open(content, size);
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
            this.tableData[0][this.columns[0]['prop']] = msg;
        }
    }

    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'TimeCardList');
    }
}
