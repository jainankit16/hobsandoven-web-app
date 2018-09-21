import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentTitleApi } from './../../../../shared/sdk'
import { PreloaderService } from 'shared/services/preloader.service';
import { ConfirmDialogService } from './../../../../shared/services/confirm-dialog.service';
import { AlertService } from './../../../../shared/services/alert.service';
import { Router } from '@angular/router';
import { UtilityService } from '../../../../shared/services/utility.service';
import { SharedService } from '../../../../shared/services/pms/shared.services';

@Component({
    selector: 'app-list-document-title',
    templateUrl: './list-document-title.component.html',
    styleUrls: ['./list-document-title.component.css']
})
export class ListDocumentTitleComponent implements OnInit {


    /*Boot-Datatable params */
    loadingIndicator = false;
    noRecords = false;
    isLoadMore = false;
    tableData = [];
    itemsPerPage = 10;
    itemsPerBatch = 200;
    orderBy = 'title';
    columns: any;
    allColumns: any;
    filterObj = {};
    filteredItems: any;
    @ViewChild('myTable') table: any;
    offset = 0;
    constructor(
        private _router: Router,
        private _alertService: AlertService,
        private _preloaderService: PreloaderService,
        private _documentTitleApi: DocumentTitleApi,
        private _confirmDialogService: ConfirmDialogService,
        private _utilityService: UtilityService,
        private _sharedservice: SharedService
    ) { }

    ngOnInit() {
        this.columns = [
            { prop: 'title', name: 'Title', visible: true, width: 300, sortable: true },
            { prop: 'documentCategory', name: 'Document Category', visible: true, width: 300, sortable: true },
            { prop: 'status', name: 'Status', visible: true, width: 100, sortable: true },
            { prop: 'Action', name: 'Action', visible: true, width: 100, sortable: false },
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling
        this.getDocumentCategory(0);
    }

    getDocumentCategory(offset) {
        this.loadingIndicator = true;
        const obj = {
            order: this.orderBy,
            include: ['documentCategory']
        }
        this._documentTitleApi.find(obj).subscribe(
            data => {
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
                if (this.tableData) {
                    this.filteredItems = this.tableData.slice();
                }
                this.loadingIndicator = false;
                this.setEmptyMessage();
            },
            error => {
                this.loadingIndicator = false;
            });
    }

    modifyData(data) {
        if (data.length) {
            data.forEach((item, index) => {
                item['title'] = (item.title) ? item.title : '';
                item['documentCategory'] = (item.documentCategory && item.documentCategory.title) ? item.documentCategory.title : '';
                item['status'] = (item.isActive) ? 'Active' : 'Inactive';
                item['isActive'] = (item.isActive);

            });
            return data;
        } else {
            return [];
        }
    }

    onClickActive(_item) {
        const _thisEvnt = this;
        const msg = _item.isActive ? 'deactivate' : 'activate'
        this._confirmDialogService.confirmThis(
            {
                title: 'Warning!!',
                titleIcon: 'mdi mdi-alert text-warning',
                text: 'Do you want to ' + msg + ' \"' + _item.title + '\" document title ?'
            },
            function () {
                _thisEvnt._preloaderService.showPreloader();
                _item['isActive'] = _item.isActive ? false : true;
                _thisEvnt._documentTitleApi.upsert(_item).subscribe(res => {
                    _thisEvnt.getDocumentCategory(0);
                    _thisEvnt._alertService.success('Document Title ' + _item.title + ' ' + msg + 'd successfully!')
                    _thisEvnt._preloaderService.hidePreloader();
                }, err => {
                    _thisEvnt._alertService.warn('Oops! something went wrong.');
                    _thisEvnt._preloaderService.hidePreloader();
                })
            },
            function () {
                // Do nothing on cancel
                _thisEvnt._preloaderService.hidePreloader();
            }
        );
    }
    onButtonClick(button, item) {
        if (button === 'Active') {
            this.onClickActive(item);
        } else if (button === 'View') {
            this._router.navigate(['/admin/document-title/manage'], { queryParams: { 'action': 'view', 'id': item.id } });
        } else if (button === 'Add') {
            this._router.navigate(['/admin/document-title/manage'], { queryParams: { 'action': 'add' } });
        } else if (button === 'Edit') {
            this._router.navigate(['/admin/document-title/manage'], { queryParams: { 'action': 'update', 'id': item.id } });
        }
    }

    loadMoreRecords() {
        this.isLoadMore = true;
        this.loadingIndicator = true;
        this.offset = this.tableData.length;
        this.getDocumentCategory(this.tableData.length);
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
        this.getDocumentCategory(0);
    }

    filterData(event) {
        if (event.target.value === '') {
            this.filterObj = this.__remove(this.filterObj, event.currentTarget.id);
        } else {
            this.filterObj[event.currentTarget.id] = event.target.value;
        }
        this.tableData = this.filterData1(this.filteredItems, this.filterObj);
        this.table.offset = 0;
        this.setEmptyMessage();
    }

    filterData1(items, filterObj) {
        return items.filter(item => {
            let notMatchingField = Object.keys(filterObj).find(key =>
                this.checkFilterValidity(item, filterObj, key));
            return !notMatchingField; // true if matches all fields
        });
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
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'DocumentTitleList');
    }

}

