import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProjectApi } from '../../../../shared/sdk/services/custom/Project';
import { ModalService } from '../../../../shared/services/modal.service';
import { UtilityService } from 'shared/services/utility.service';
import { SharedService } from 'shared/services/pms/shared.services';
import { PreloaderService } from 'shared/services/preloader.service';

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.css'],
    providers: [SharedService]
})
export class ProjectsListComponent implements OnInit, OnDestroy, AfterViewInit {
    ExpandViewTitle: any;
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
    constructor(
        private _projectApi: ProjectApi,
        private _modalService: ModalService,
        private _utilityService: UtilityService,
        private _sharedservice: SharedService,
        private _loader: PreloaderService,
        private el: ElementRef
    ) {
        this.pageTitle = 'Projects List';
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
            { prop: "Name", name: "Name", visible: true, width: 350, sortable: true },
            { prop: "APVP_Group_Number__c", name: "APVP Group Num", visible: true, width: 150, sortable: true },
            { prop: "Customer_Service_Type__c", name: "Customer Service Type", visible: true, width: 250, sortable: true },
            { prop: "Field_Service_Program_Type__c", name: "Field Service Program Type", visible: true, width: 250, sortable: true },
            { prop: "Jobsite_Contact_Phone_Service_Desk__c", name: "Contact", visible: true, width: 200, sortable: true },
            { prop: "Partner_Name_Text__c", name: "Partner Name", visible: true, width: 350, sortable: true },
            { prop: "Service_Technical_Level__c", name: "Service Technical Level", visible: true, width: 200, sortable: true },
            { prop: "Status__c", name: "Status", visible: true, width: 150, sortable: true },
            { prop: "Vendor_Type__c", name: "Vendor Type", visible: true, width: 150, sortable: true }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling
        this.getProjectsList(0);
    }
    ngOnDestroy() { }
    getProjectsList(offset: number) {
        this._projectApi
            .find({
                fields: [
                    'Name', 'APVP_Group_Number__c',
                    'Customer_Service_Type__c',
                    'Field_Service_Program_Type__c',
                    'Jobsite_Contact_Phone_Service_Desk__c',
                    'Partner_Name_Text__c',
                    'Service_Technical_Level__c',
                    'Status__c', 'sfdcId',
                    'Vendor_Type__c'],
                limit: this.itemsPerBatch,
                order: this.orderBy,
                skip: offset
            })
            .subscribe(
                data => {
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
                    this.isEnable = true;
                    this.filteredItems = this.tableData.slice();
                    this.setEmptyMessage();
                },
                error => {
                    this._loader.hidePreloader();
                    this.errorMessage = error.message;
                    this.loadingIndicator = false;
                }

            );
    }
    modifyData(data) {
        if (data.length) {
            data.forEach(item => {
                item['sfdcId'] = (item.sfdcId) ? item.sfdcId : '';
                item['Name'] = (item.Name) ? item.Name : '';
                item['APVP_Group_Number__c'] = (item.APVP_Group_Number__c) ? item.APVP_Group_Number__c : '';
                item['Customer_Service_Type__c'] = (item.Customer_Service_Type__c) ? item.Customer_Service_Type__c : '';
                item['Field_Service_Program_Type__c'] = (item.Field_Service_Program_Type__c) ? item.Field_Service_Program_Type__c : '';
                item['Jobsite_Contact_Phone_Service_Desk__c'] = (item.Jobsite_Contact_Phone_Service_Desk__c) ? item.Jobsite_Contact_Phone_Service_Desk__c : '';
                item['Partner_Name_Text__c'] = (item.Partner_Name_Text__c) ? item.Partner_Name_Text__c : '';
                item['Service_Technical_Level__c'] = (item.Service_Technical_Level__c) ? item.Service_Technical_Level__c : '';
                item['Status__c'] = (item.Status__c) ? item.Status__c : '';
                item['Vendor_Type__c'] = (item.Vendor_Type__c) ? item.Vendor_Type__c : '';
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
    loadMoreRecords() {
        this.isLoadMore = true;
        this._loader.showPreloader();
        this.getProjectsList(this.tableData.length);
    }

    refreshView() {
        this.isLoadMore = false;
        this.table.offset = 0
        let inputs;
        let index;
        inputs = document.querySelector('div.datatable-row-center').getElementsByTagName('input')
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].value = '';
        }
        this.filterObj = {};
        this.getProjectsList(0);
    }

    toggle(col) {
        col.visible = !col.visible;
    }

    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'ProjectList');
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

    openDetails(content, size, id, title) {
        this.ExpandViewTitle = title;
        this.currentExpandViewId = id;
        this._modalService.open(content, size);
    }
}
