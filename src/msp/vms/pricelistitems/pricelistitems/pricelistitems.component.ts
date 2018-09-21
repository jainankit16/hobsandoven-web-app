import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'shared/services/pms/shared.services';
import { UtilityService } from './../../../../shared/services/utility.service';
import { PricelistItemApi } from '../../../../shared/sdk/services/custom/PricelistItem';

@Component({
    selector: 'app-pricelistitems',
    templateUrl: './pricelistitems.component.html',
    styleUrls: ['./pricelistitems.component.css'],
    providers: [SharedService]
})
export class PriceListItemComponent implements OnInit, AfterViewInit {
    @Input() modelName: string;
    @Input() pricebook2Id: string;
    @Input() IsActiveLink: true;
    pricelistitems: any;
    sfdcId: any;
    currentExpandViewId: any;
    ExpandViewTitle: any;
    /*ngxDataTable Related Variable */
    pageTitle: string;
    columns: any;
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
    allColumns: any;
    noRecords = false;
    @ViewChild('myTable') table: any;
    /* gridview */
    @Output() loadItemDetail = new EventEmitter<any>();
    @Input()
    get modelId() {
        return this.pricebook2Id;
    }
    set modelId(value) {
        this.pricebook2Id = value;
        this.getPriceListItems(0);
    }

    constructor(
        private pricelistitemApi: PricelistItemApi,
        private _utilityService: UtilityService,
        private _sharedservice: SharedService,
        private el: ElementRef

    ) {
        this.pageTitle = 'Price List Items';
    }

    ngOnInit() {
        this.columns = [
            { prop: "sfdcId", name: "SFDCID", width: 300, visible: true, sortable: true },
            { prop: "Country__c", name: "Country Code", width: 200, visible: true, sortable: true },
            { prop: "StandardPrice", name: "Talent Level", width: 200, visible: true, sortable: true },
            { prop: "StandardPrice", name: "SLA(Priority)", width: 200, visible: true, sortable: true },
            { prop: "StandardPrice", name: "Coverage Hours", width: 200, visible: true, sortable: true },
            { prop: "CurrencyIsoCode", name: "Currency", width: 200, visible: true, sortable: true },
            { prop: "PPE_1HR_Standard_Cost__c", name: "PPE-1HR", width: 200, visible: true, sortable: true },
            { prop: "Additional_Hours_T_M_Standard_Price__c", name: "Additional Hourse T&M", width: 200, visible: true, sortable: true },
            { prop: "IsActive", name: "Active Or Status", width: 200, visible: true, sortable: true },
            { prop: "CreatedDate", name: "Created On", width: 200, visible: true, sortable: true, type: 'date', format: 'short' }
        ]
        this.allColumns = this.columns.slice(); // Used for Columns Toggling
        this.getPriceListItems(0);
    }

    toggle(col) {
        col.visible = !col.visible;
    }

    getPriceListItems(offset: number) {
        this.pricelistitemApi
            .find({
                where: { Pricebook2Id: this.pricebook2Id },
                limit: this.itemsPerBatch,
                order: this.orderBy,
                skip: offset
            })
            .subscribe(
                results => {

                    if (results.length === 0) {
                        this.errorMessage = 'No records found.';
                    }
                    this.noRecords = (results.length < this.itemsPerBatch) ? true : false;
                    results.forEach(x => {
                        x['CreatedDate'] = x['CreatedDate'] ? this._utilityService.dateFormate(x['CreatedDate']) : '';
                        (x['IsActive']) ? x['IsActive'] = 'Yes' : x['IsActive'] = 'No';
                        (x['PPE_1HR_Standard_Cost__c']) ? x['PPE_1HR_Standard_Cost__c'] = x['PPE_1HR_Standard_Cost__c'].toFixed(2) : x['PPE_1HR_Standard_Cost__c'] = '0.00';
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
                    this.isEnable = true;
                    this.filteredItems = this.tableData.slice();
                    this.setEmptyMessage();
                },
                error => {
                    this.errorMessage = error.message;
                    this.loadingIndicator = false;

                })

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
        this.getPriceListItems(this.tableData.length);
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
        this.getPriceListItems(0);
    }
    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'pricelistitems');
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

    showPanel(options) {
        this.loadItemDetail.emit(options);
    }
}
