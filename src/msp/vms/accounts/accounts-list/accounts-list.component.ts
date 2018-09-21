import { SharedService } from 'shared/services/pms/shared.services';
import { UtilityService } from './../../../../shared/services/utility.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AccountApi } from '../../../../shared/sdk/services/custom/Account';
import { ModalService } from '../../../../shared/services/modal.service';
import { PreloaderService } from 'shared/services/preloader.service';
@Component({
    selector: 'app-accounts-list',
    templateUrl: './accounts-list.component.html',
    styleUrls: ['./accounts-list.component.css']
})
export class AccountsListComponent implements OnInit, AfterViewInit {
    accountName: any;
    currentExpandViewId: any;
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
    noRecords = false;
    @ViewChild('myTable') table: any;
    /*gridview effects using css*/
    gridOptions = { mainClass: '' };

    constructor(
        private accountApi: AccountApi,
        private _modalService: ModalService,
        private _utilityService: UtilityService,
        private _sharedservice: SharedService,
        private el: ElementRef,
        private _loader: PreloaderService
    ) {
        this.pageTitle = 'Accounts List';
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
            { prop: "AccountSource", name: "Account Source", visible: true, width: 250, sortable: true },
            { prop: "Vendor_Type__c", name: "Vendor Type", visible: true, width: 250, sortable: true },
            { prop: "Service_Global_Ref__c", name: "Service Global Ref", visible: true, width: 250, sortable: true },
            { prop: "IsPartner", name: "Partner", visible: true, width: 200, sortable: true },
            { prop: "Business_Size_c__c", name: "Business Size", visible: true, width: 250, sortable: true },
            { prop: "CreatedDate", name: "Created On", visible: true, width: 250, sortable: true, type: 'date', format: 'short' }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling
        this.getAccounts(0);
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

    /*Data Table funcation start here*/
    loadMoreRecords() {
        this.isLoadMore = true;
        this._loader.showPreloader();
        this.getAccounts(this.tableData.length);
    }
    getAccounts(offset: number) {
        this.accountApi
            .find({
                fields: [
                    'sfdcId',
                    'Name',
                    'AccountSource',
                    'Vendor_Type__c',
                    'Service_Global_Ref__c',
                    'IsPartner',
                    'Business_Size_c__c',
                    'CreatedDate'
                ],
                where: { Name: { neq: null } },
                limit: this.itemsPerBatch,
                order: this.orderBy,
                skip: offset
            })
            .subscribe(
                data => {
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
                        this.setEmptyMessage();
                    } else {
                        this._loader.hidePreloader();
                        this.loadingIndicator = false;
                        // this.errorMessage = 'No Records Found';
                    }
                },
                error => {
                    this._loader.hidePreloader();
                    this.errorMessage = error.message;
                    this.loadingIndicator = false;
                    this.setEmptyMessage();
                }
            );
    }
    modifyData(data) {
        if (data.length) {
            data.forEach(item => {
                item['Name'] = (item.Name) ? item.Name : '';
                item['AccountSource'] = item.AccountSource ? item.AccountSource : '';
                item['Vendor_Type__c'] = item.Vendor_Type__c ? item.Vendor_Type__c : '';
                item['Service_Global_Ref__c'] = item.Service_Global_Ref__c ? item.Service_Global_Ref__c : '';
                item['IsPartner'] = item.IsPartner ? 'Yes' : 'No';
                item['Business_Size_c__c'] = item.Business_Size_c__c ? item.Business_Size_c__c : '';
                item['CreatedDate'] = (item.CreatedDate) ? this._utilityService.dateFormate(item.CreatedDate) : '';

            });
            return data;
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
        this.getAccounts(0);
    }

    toggle(col) {
        col.visible = !col.visible;
    }


    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'AccountList');
    }

    openDetails(content, size, id, name) {
        this.currentExpandViewId = id;
        this.accountName = name;
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
        this.refreshView();
    }

}
