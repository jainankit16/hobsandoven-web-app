import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { AppStateService } from '../../../services/app-state.service';

import { DashboardApi } from '../../../sdk/services/custom/Dashboard';
import { SharedService } from 'shared/services/pms/shared.services';
import { UtilityService } from '../../../services/utility.service'

@Component({
    selector: 'timecard-list-modal',
    templateUrl: './timecard-list-modal.component.html'
})

export class TimecardListModalComponent implements OnInit, AfterViewInit {

    selectedAccountId: string;
    private timecards = [];
    // setup for ngx-datatable
    tableData = [];
    itemsPerPage = 10;
    itemsPerBatch = 200;
    orderBy = 'createdAt Asc';
    loadingIndicator = true;
    columns: any[];
    allColumns: any[];
    @ViewChild('myTable') table: any;
    errorMessage = '';
    // isEnable = false;
    filterObj = {};
    filteredItems: any;
    constructor(
        private _appState: AppStateService,
        private _dashboardApi: DashboardApi,
        private _sharedservice: SharedService,
        private _utilityService: UtilityService,
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
            { name: 'Timecard#', prop: 'timecardName', width: 200, visible: true, sortable: true },
            { name: 'Visit Number', prop: 'Total_Visit_Hours__c', width: 150, visible: true, sortable: true },
            { name: 'Final Visit?', prop: 'Timecard_Received_Final__c', width: 200, visible: true, sortable: true },
            {
                name: 'Customer Sign-off Name (POD)', prop: 'Vendor_Timecard_Cust_Site_Sign_off_Name__c',
                width: 300, visible: true, sortable: true
            },
            { name: 'Dispatch Service Resolution Status - FSE', prop: 'Job_Status__c', width: 300, visible: true, sortable: true },
            { name: 'Worker Name', prop: 'Job_Worker__c', width: 200, visible: true, sortable: true },
            {
                name: 'Visit Task(s) Performed',
                prop: 'Vendor_Time_Card_Notes_Tasks_Performed__c', width: 250, visible: true, sortable: true
            },
            {
                name: 'Visit Oberservation/Suggestion', prop: 'Vendor_Time_Card_Observation_Suggestion__c',
                width: 250, visible: true, sortable: true
            }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling

        this.selectedAccountId = this._appState.getSelectedAccount();
        if (this.selectedAccountId) {
            this.loadPayments(0);
        }
    }

    loadPayments(offset: number) {
        this.timecards = [];
        this.errorMessage = '';
        this.loadingIndicator = true;
        // this.isEnable = false;
        const paramObj = {
            'accountId': this.selectedAccountId,
            'models': ['Timecard']
        };
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['timecards'] && data['timecards']['list']) {
                        this.timecards = this.dataModify(data['timecards']['list']);
                        this.tableData = (this.timecards) ? this.timecards : [];
                    }
                }
                if (this.tableData) {
                    this.filteredItems = this.tableData.slice();
                }
                this.setEmptyMessage();
                this.loadingIndicator = false;
                //    this.isEnable = true;
            },
            error => {
                console.log('Error fetching states>>', error.message);
                this.errorMessage = error.message;
                this.loadingIndicator = false;
                //    this.isEnable = true;
            }
        );
    }

    dataModify(data) {
        if (data.length) {
            data.forEach(element => {
                if (element['timecard'] && element['timecard']['Name']) {
                    element['timecardName'] = element['timecard']['Name'];
                }

                delete element['timecard']

            });
        }
        return data;
    }

    toggle(col) {
        col.visible = !col.visible;
    }
    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
    }

    refreshView() {
        this.table.offset = 0
        let inputs;
        let index;
        inputs = document.getElementsByTagName('input');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].value = '';
        }
        this.filterObj = {};
        this.loadPayments(0);
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

    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'TimeCardList');
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
}
