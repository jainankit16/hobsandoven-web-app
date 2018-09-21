import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivityApi } from '../../sdk';
import { ModalService } from '../../services/modal.service';
import { UtilityService } from '../../services/utility.service';
import { SharedService } from 'shared/services/pms/shared.services';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit, AfterViewInit {
    @Input() modelId;
    @Input() modelName;
    errorMessage = '';
    pageTitle: any;
    filterCondition: any;
    public feeds: Array<any>;

    /*Boot-Datatable params */
    tableData = [];
    loadingIndicator = false;
    tableDataCount = 0;
    itemsPerPage = 10;
    offset = 0;
    isLoadMore = false;
    itemsPerBatch = 200;
    orderBy = 'createdAt DESC';
    attrContent = 'data-content';
    ExpandViewTitle: any;
    currentExpandViewId: any;
    columns: any;
    allColumns: any;
    noRecords = false;
    filterObj = {};
    filteredItems: any;
    @ViewChild('myTable') table: any;

    constructor(
        private _activityApi: ActivityApi,
        private _modalService: ModalService,
        private _utilityService: UtilityService,
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
            { name: 'Title', prop: 'title', width: 2, visible: true, sortable: true },
            { name: 'Description', prop: 'description', width: 3, visible: true, sortable: true },
            { name: 'Activity By', prop: 'activityByName', width: 2, visible: true, sortable: true },
            { name: 'Date', prop: 'createdAt', width: 2, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'Action', prop: 'action', width: 1, visible: true, sortable: false }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling
        this.getFeeds(0);
    }

    getFeeds(offset) {
        this.loadingIndicator = true;
        const findObj = this.getFilterCondition(offset);

        this._activityApi.find(findObj).subscribe(
            data => {
                if (data.length < this.itemsPerBatch) {
                    this.noRecords = true;
                }
                const results = this.modifyData(data);
                if (!this.isLoadMore) {
                    this.tableData = (results) ? results : [];
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
                this.setEmptyMessage();
            },
            err => {
                this.errorMessage = err.messages;
                this.loadingIndicator = false;
            }
        );
    }

    modifyData(data) {
        if (data.length) {
            data.forEach((item, index) => {
                item['title'] = (item.title) ? item.title : '';
                item['description'] = (item.description) ? item.description : '';
                item['activityByName'] = (item.context && item.context.activityByName) ? item.context.activityByName : '';
                item['createdAt'] = (item.createdAt) ? this._utilityService.dateFormate(item.createdAt) : '';
                item['title'] = (item.title) ? item.title : '';

                //  delete key
                delete item.context;
            });
            return data;
        } else {
            return [];
        }
    }

    getFilterCondition(offset) {
        const findObj = {
            where: { modelName: this.modelName, modelId: this.modelId },
            limit: this.itemsPerBatch,
            order: this.orderBy,
            skip: offset
        };

        return findObj;
    }

    toggle(col) {
        col.visible = !col.visible;
    }
    refreshView() {
        this.isLoadMore = false;
        this.table.offset = 0
        let inputs;
        let index;
        inputs = document.getElementById('dataTable').getElementsByTagName('input');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].value = '';
        }
        this.getFeeds(0);
    }

    loadMoreRecords() {
        this.isLoadMore = true;
        this.loadingIndicator = true;
        this.offset = this.tableData.length;
        this.getFeeds(this.tableData.length);
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

    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'ActivityFeedList');
    }

    openDetails(content, size, id, title) {
        this.ExpandViewTitle = title;
        this.currentExpandViewId = id;
        this._modalService.open(content, size);
    }
}
