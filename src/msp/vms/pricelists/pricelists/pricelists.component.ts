import { SharedService } from 'shared/services/pms/shared.services';
import { UtilityService } from './../../../../shared/services/utility.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PricelistApi } from '../../../../shared/sdk/services/custom/Pricelist';
import { ModalService } from '../../../../shared/services/modal.service';
import { PreloaderService } from 'shared/services/preloader.service';

@Component({
    selector: 'app-pricelists',
    templateUrl: './pricelists.component.html',
    styleUrls: ['./pricelists.component.css']
})
export class PriceListComponent implements OnInit, OnDestroy, AfterViewInit {

    noRecord = false;
    currentExpandViewId: any;
    title: any;
    priceTitle: any;
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
    isEnable = false;
    todaysDate = new Date()
    @ViewChild('myTable') table: any;
    /*gridview effects using css*/
    gridOptions = {mainClass:''};

    constructor(
        private _pricelistApi: PricelistApi,
        private _utilityService: UtilityService,
        private _sharedservice: SharedService,
        private _modalService: ModalService,
        private el: ElementRef,
        private _loader: PreloaderService
    ) {
        this.pageTitle = 'Price Book List';
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
            { prop: "Name", name: "Price Book Name", visible: true, width: 400, sortable: true },
            { prop: "Type__c", name: "Type", visible: true, width: 250, sortable: true },
            { prop: "IsActive", name: "Status", visible: true, width: 250, sortable: true },
            { prop: "IsStandard", name: "Is Standard?", visible: true, width: 300, sortable: true },
            { prop: "CreatedDate", name: "Created On", visible: true, width: 250, sortable: true, type: 'date', format: 'short' },
            { prop: "updatedAt", name: "Last Modified", visible: true, width: 200, sortable: true, type: 'date', format: 'short' }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling
        this.getPriceList(0);
    }
    ngOnDestroy() { }

    getPriceList(offset: number) {
        this._pricelistApi
            .find({
                limit: this.itemsPerBatch,
                order: this.orderBy,
                skip: offset
            })
            .subscribe(
                results => {

                    if (results.length === 0) {
                        this.errorMessage = 'No records found.';
                    }
                    if (results.length < this.itemsPerBatch) {
                        this.noRecord = true;
                    }
                    results.forEach(x => {
                        (x['IsActive']) ? x['IsActive'] = 'Yes' : x['IsActive'] = 'No';
                        (x['IsStandard']) ? x['IsStandard'] = 'Yes' : x['IsStandard'] = 'No';
                        x['CreatedDate'] = x['CreatedDate'] ? this._utilityService.dateFormate(x['CreatedDate']) : '';
                        x['updatedAt'] = x['updatedAt'] ? this._utilityService.dateFormate(x['updatedAt']) : '';
                    });
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
                    this.isEnable = true;
                    this.setEmptyMessage();
                    this.filteredItems = this.tableData.slice();
                },
                error => {
                    this.errorMessage = error.message;
                    this._loader.hidePreloader();
                    this.loadingIndicator = false;
                    this.setEmptyMessage();
                })
    }


    clearSearch(col) {
        this.filterObj[col] = ''
        delete this.filterObj[col];
        this.tableData = this.filteredItems.filter(item => {
            let notMatchingField = Object.keys(this.filterObj).find(key =>
                this._utilityService.dataTableSearch(item, this.filterObj, key));
            return !notMatchingField;
        });
        this.table.offset = 0;
        this.isEnable = true;
    }
    clearAllSearch() {
        this.columns.forEach(element => {
            if (element.type === 'date') {
                element.value = ''
            }
        });
        this.filterObj = {};
        this.tableData = this.filteredItems.filter(item => {
            let notMatchingField = Object.keys(this.filterObj).find(key =>
                this._utilityService.dataTableSearch(item, this.filterObj, key));
            return !notMatchingField;
        });
        this.table.offset = 0;
        this.isEnable = true;
    }

    filterData(event, type) {

        if (type === 'date') {
            if (event.value === '') {
                if (this.filterObj[event.input.id + '_temp']) {
                    delete this.filterObj[event.input.id];
                }
            }
            let date = this._utilityService.dateFormate(event.value).split(',');
            this.filterObj[event.input.id] = date[0];
        } else {
            if (event.target.value === '') {
                if (this.filterObj[event.target.id]) {
                    delete this.filterObj[event.target.id];
                }
            }
            this.filterObj[event.target.id] = event.target.value;
        }
        this.tableData = this.filteredItems.filter(item => {
            let notMatchingField = Object.keys(this.filterObj).find(key =>
                this._utilityService.dataTableSearch(item, this.filterObj, key));
            return !notMatchingField;
        });
        this.table.offset = 0;
        this.setEmptyMessage();
        this.isEnable = true;
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
        this.getPriceList(this.tableData.length);
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
        this.getPriceList(0);
    }

    togglex(col) {
        col.visible = !col.visible;
    }

    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'PriceList');
    }


    openDetails(content, size, id, title) {
        this.priceTitle = title;
        this.currentExpandViewId = id;
        this._modalService.open(content, size);
    }

    /**
     * 
     * @param options 
     */
    showPanel(options) {
        this.gridOptions = options;
    }

    /**
     * 
     * @param options 
     */
    handleClass(event) {
        this.gridOptions = event;
       // console.log(this.gridOptions)
        this.refreshView();
    }

}
