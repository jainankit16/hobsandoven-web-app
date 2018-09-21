import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PreloaderService } from '../../../../shared/services/preloader.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog.service';

import { DepartmentApi } from '../../../../shared/sdk';
import { SharedService } from '../../../../shared/services/pms/shared.services';
import { UtilityService } from '../../../../shared/services/utility.service';

@Component({
    selector: 'list-department',
    templateUrl: './list-department.component.html',
    styleUrls: ['./list-department.component.css']
})

export class ListDepartmentComponent implements OnInit {

    /*Boot-Datatable params */
    loadingIndicator = false;
    noRecords = false;
    isLoadMore = false;
    tableData = [];
    itemsPerPage = 10;
    itemsPerBatch = 200;
    /*Component params*/
    departments: any;
    columns: any;
    allColumns: any;
    filterObj = {};
    filteredItems: any;
    @ViewChild('myTable') table: any;
    offset = 0;

    constructor(
        private _router: Router,
        private _preloaderService: PreloaderService,
        private _alertService: AlertService,
        private _confirmDialogService: ConfirmDialogService,
        private _departmentApi: DepartmentApi,
        private _sharedservice: SharedService,
        private _utilityService: UtilityService,
    ) { }

    ngOnInit() {
        this.columns = [
            { prop: 'Name', name: 'Name', visible: true, width: 250, sortable: true },
            { prop: 'RecordType', name: 'Record Type', visible: true, width: 150, sortable: true },
            { prop: 'Department_Access__c', name: 'Department Access', visible: true, width: 150, sortable: true },
            { prop: 'Department_Name__c', name: 'Department Name', visible: true, width: 150, sortable: true },
            { prop: 'Status', name: 'Status', visible: true, width: 100, sortable: true },
            { prop: 'Action', name: 'Action', visible: true, width: 100, sortable: false },
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling
        this.getDepartmentList(0);
    }

    getDepartmentList(offset) {
        this._preloaderService.getShowLoader();
        this.loadingIndicator = true;
        const obj = {
            order: 'Name'
        }
        this._departmentApi.find(obj).subscribe(
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
                this._preloaderService.hidePreloader();
                this.setEmptyMessage();
            },
            error => {
                this._alertService.warn('Oops! something went wrong.');
                this.loadingIndicator = false;
                this._preloaderService.hidePreloader();
            }
        )
    }

    modifyData(data) {
        if (data.length) {
            data.forEach((item, index) => {
                item['Name'] = (item.Name) ? item.Name : '';
                item['RecordType'] = (item.RecordType) ? item.RecordType : '';
                item['Department_Access__c'] = (item.Department_Access__c) ? item.Department_Access__c : '';
                item['Department_Name__c'] = (item.Department_Name__c) ? item.Department_Name__c : '';
                item['IsActive'] = item.IsActive;
                item['Status'] = (item.IsActive) ? 'Active' : 'Inactive';
            });
            return data;
        } else {
            return [];
        }
    }

    onActionButtonClick(dept, button) {
        if (button === 'Delete') {
            this.onClickDelete(dept);
        } else if (button === 'View') {
            this._router.navigate(['/admin/department/manage'], { queryParams: { 'action': 'view', 'id': dept.id } });
        } else if (button === 'Add') {
            this._router.navigate(['/admin/department/manage'], { queryParams: { 'action': 'add' } });
        } else if (button === 'Edit') {
            this._router.navigate(['/admin/department/manage'], { queryParams: { 'action': 'update', 'id': dept.id } });
        }
    }

    onClickDelete(dept) {
        const _thisEvnt = this;
        const msg = dept.IsActive ? 'deactivate' : 'activate';
        this._confirmDialogService.confirmThis(
            {
                title: 'Warning!!',
                titleIcon: 'mdi mdi-alert text-warning',
                text: 'Do you want to ' + msg + ' ' + dept.Name + ' ?'
            },
            function () {
                _thisEvnt._preloaderService.showPreloader();
                dept.IsActive = dept.IsActive ? false : true
                _thisEvnt._departmentApi.upsert(dept).subscribe(
                    res => {
                        if (res) {
                            _thisEvnt.getDepartmentList(0);
                            _thisEvnt._alertService.success('Department ' + msg + 'd successfully.');
                            window.scrollTo(0, 0);
                        }
                        _thisEvnt._preloaderService.hidePreloader();
                    }, err => {
                        _thisEvnt._alertService.warn('Oops! something went wrong.');
                        window.scrollTo(0, 0);
                        _thisEvnt._preloaderService.hidePreloader();
                    }
                )
            },
            function () {
                // Do nothing on cancel
                _thisEvnt._preloaderService.hidePreloader();
            }
        );
    }

    loadMoreRecords() {
        this.isLoadMore = true;
        this.loadingIndicator = true;
        this.offset = this.tableData.length;
        this.getDepartmentList(this.tableData.length);
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
        this.getDepartmentList(0);
    }

    filterData(event) {
        if (event.target.value === '') {
            this.filterObj = this.__remove(this.filterObj, event.currentTarget.id);
        } else {
            this.filterObj[event.currentTarget.id] = event.target.value;
        }
        this.tableData = this.filterDataTable(this.filteredItems, this.filterObj);
        this.table.offset = 0;
        this.setEmptyMessage();
    }

    filterDataTable(items, filterObj) {
        return items.filter(item => {
            const notMatchingField = Object.keys(filterObj).find(key =>
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
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'DepartmentList');
    }
}

