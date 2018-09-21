import { Component, OnInit, ViewChild } from '@angular/core';
import { AppStateService } from '../../../services/app-state.service';
import { DashboardApi } from '../../../sdk/services/custom/Dashboard';
import { SharedService } from 'shared/services/pms/shared.services';
import { UtilityService } from '../../../services/utility.service'

@Component({
    selector: 'pricebook-list-modal',
    templateUrl: './pricebook-list-modal.component.html',
    styleUrls: ['./pricebook-list-modal.component.css']
})

export class PricebookListModalComponent implements OnInit {

    selectedAccountId: string;
    private programs = [];
    errorMessage = '';
    // setup for ngx-datatable
    tableData = [];
    itemsPerPage = 10;
    itemsPerBatch = 200;
    orderBy = 'createdAt Asc';
    loadingIndicator = true;
    columns: any[];
    allColumns: any[];
    @ViewChild('myTable') table: any;
    offset = 0;
    isEnable = false;
    filterObj = {};
    filteredItems: any;
    pobj: any;

    constructor(
        private _appState: AppStateService,
        private _dashboardApi: DashboardApi,
        private _sharedservice: SharedService,
        private _utilityService: UtilityService,
    ) { }

    ngOnInit() {
        this.columns = [
            { name: 'Program', prop: 'programName', width: 350, visible: true, sortable: true },
            { name: 'Price Book', prop: 'PriceBookName', width: 300, visible: true, sortable: true }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling

        let paramObj = {
            'fields': ['sfdcId', 'Name', 'Project__c', 'Partner_Pricelist__c'],
            'include': [
                {
                    relation: 'PartnerPricelist',
                    scope: {
                        fields: ['sfdcId', 'Name'],
                    }
                }
            ],
            'models': ['Project']
        };

        this.selectedAccountId = this._appState.getSelectedAccount();
        if (localStorage.getItem('programId')) {
            paramObj['programId'] = localStorage.getItem('programId');
        } else {
            paramObj['accountId'] = this.selectedAccountId;
        }
        this.pobj = paramObj;
        this.loadPriceBook(paramObj);
    }

    loadPriceBook(paramObj) {
        this.loadingIndicator = true;
        this.errorMessage = '';
        this.isEnable = false;
        this.programs = []
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['programs'] && data['programs']['list']) {
                        this.programs = this.dataModify(data['programs']['list']);
                        this.tableData = (this.programs) ? this.programs : [];
                    }
                }
                if (this.tableData) {
                    this.filteredItems = this.tableData.slice();
                }
                this.setEmptyMessage();
                this.loadingIndicator = false;
                this.isEnable = true;
            },
            error => {
                this.errorMessage = error.message;
                this.loadingIndicator = false;
                this.isEnable = true;
            }
        );
    }

    dataModify(data) {
        if (data.length) {
            data.forEach(element => {
                element['programName'] = (element['Name']) ? element['Name'] : '';
                if (element['Name'] && element['Project__c']) {
                    element['programName'] += ' ' + element['Project__c'];
                }
                element['PriceBookName'] = (element['PriceBookName']) ? element['PriceBookName'] : '';
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
        inputs = document.querySelector('div.datatable-row-center').getElementsByTagName('input');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].value = '';
        }
        this.filterObj = {};
        this.loadPriceBook(this.pobj);
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
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'PriceBook');
    }
}
