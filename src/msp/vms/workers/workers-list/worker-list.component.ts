import { SharedService } from 'shared/services/pms/shared.services';
import { UtilityService } from './../../../../shared/services/utility.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WorkerApi } from '../../../../shared/sdk/services/custom/Worker';
import { ModalService } from '../../../../shared/services/modal.service';
import { PreloaderService } from 'shared/services/preloader.service';

@Component({
    selector: 'app-worker-list',
    templateUrl: './worker-list.component.html',
    styleUrls: ['./worker-list.component.css'],
    providers: [SharedService]
})
export class WorkerListComponent implements OnInit, OnDestroy, AfterViewInit {

    currentExpandViewId: any;
    ExpandViewTitle: any;
    /*ngxDataTable Related Variable */
    pageTitle: string;
    columns: any;
    allColumns: any;
    tableData = [];
    loadingIndicator = false;
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 200;
    orderBy = 'CreatedDate  DESC';
    errorMessage = 'Loading...';
    filterObj = {};
    filteredItems: any;
    noRecords = false;
    @ViewChild('myTable') table: any;

    constructor(private _workerapi: WorkerApi,
        private _utilityService: UtilityService,
        private _sharedservice: SharedService,
        private _modalService: ModalService,
        private el: ElementRef,
        private _loader: PreloaderService
    ) {
        this.pageTitle = 'Workers List';
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
            { prop: "Name", name: "Name", visible: true, width: 300, sortable: true },
            { prop: "Dispatch_Worker_num__c", name: "Dispatch Worker Num", visible: true, width: 200, sortable: true },
            { prop: "Worker_Type__c", name: "Worker Type", visible: true, width: 200, sortable: true },
            { prop: "Vendorsite__c", name: "Vendor Site", visible: true, width: 200, sortable: true },
            { prop: "Available__c", name: "Available", visible: true, width: 200, sortable: true },
            { prop: "CreatedDate", name: "Date Posted", visible: true, width: 200, sortable: true, type: 'date', format: 'short' },
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling
        this.getWorkerList(0);
    }
    ngOnDestroy() {

    }
    getWorkerList(offset: number) {
        this._workerapi.find({
            limit: this.itemsPerBatch,
            order: this.orderBy,
            skip: offset
        }).subscribe(data => {
            const results = this.modifyData(data);
            this.noRecords = (results.length < this.itemsPerBatch) ? true : false;
            if (!this.isLoadMore) {
                this.tableData = results;
            } else {
                results.forEach(c => {
                    this.tableData.push(c);
                });
                this.tableData = [...this.tableData];
            }
            this.loadingIndicator = false;
            this._loader.hidePreloader();
            this.filteredItems = this.tableData.slice();
            this.setEmptyMessage();
        },
            error => {
                this._loader.hidePreloader();
                this.errorMessage = error.message;
                this.loadingIndicator = false;
                this.setEmptyMessage();

            })
    }

    modifyData(data) {
        if (data.length) {
            data.forEach(item => {
                item['Name'] = (item.Name) ? item.Name : '';
                item['Dispatch_Worker_num__c'] = (item.Dispatch_Worker_num__c) ? item.Dispatch_Worker_num__c : '';
                item['Worker_Type__c'] = (item.Worker_Type__c) ? item.Worker_Type__c : '';
                item['Vendorsite__c'] = (item.Vendorsite__c) ? item.Vendorsite__c : '';
                item['Available__c'] = (item.Available__c) ? 'Yes' : 'No';
                item['CreatedDate'] = (item.CreatedDate) ? this._utilityService.dateFormate(item.CreatedDate) : '';

            });
            return data;
        } else {
            return [];
        }
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

    setEmptyMessage() {
        const msg = 'No data to display.';
        if (!this.tableData.length) {
            this.tableData = [{
                'message': msg
            }];
            this.tableData[0][this.columns[0]['prop']] = msg;
        }
    }

    loadMoreRecords() {
        this.isLoadMore = true;
        this._loader.showPreloader();
        this.getWorkerList(this.tableData.length);
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
        this.getWorkerList(0);
    }

    toggle(col) {
        col.visible = !col.visible;
    }
    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'WorkerList');
    }


    openDetails(content, size, id, title) {
        this.ExpandViewTitle = title;
        this.currentExpandViewId = id;
        this._modalService.open(content, size);
    }
}
