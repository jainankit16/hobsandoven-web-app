import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../../../services/app-state.service';
import { SharedService } from '../../../../services/pms/shared.services';
import { UtilityService } from '../../../../services/utility.service';
import { PreloaderService } from '../../../../services/preloader.service';
import { CaseApi } from '../../../../sdk';

@Component({
    selector: 'service-manager-orders-list',
    templateUrl: './service-manager-orders-list.component.html',
    styleUrls: ['./service-manager-orders-list.component.css']
})

export class ServiceManagerOrdersListComponent implements OnInit, OnDestroy, AfterViewInit {

    isInternalUser = false;
    tableData = [];
    dataList: any;
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 200;
    orderBy = 'createdAt Asc';
    loadingIndicator = true;
    columns: any[];
    allColumns: any[];
    filterObj = {};
    filterObjData = {};
    filteredItems: any;
    @ViewChild('myTable') table: any;
    offset = 0;
    orderType: string;
    userState: any;
    private appStateSub: Subscription;
    appState: any;

    filterQuery: any;
    initialMessage: any;
    moreRecords = false;
    constructor(
        private router: Router,
        private _appState: AppStateService,
        private _utilityService: UtilityService,
        private _preloaderService: PreloaderService,
        private _sharedService: SharedService,
        private _caseApi: CaseApi,
        private el: ElementRef
    ) { }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }

        this.columns = [
            { name: 'Action', prop: '__', width: 100, visible: true, sortable: false },
            { name: 'PMS Case ID(Status)', prop: 'CaseNumber', width: 200, visible: true, sortable: true },
            { name: 'WO Case ID(Status)', prop: 'workOrderName', width: 200, visible: true, sortable: true },
            { name: 'ICC Case ID(Status)', prop: 'CaCaseNumber', width: 200, visible: true, sortable: true },
            { name: 'Job ID(Status)', prop: 'Iron_Job_num__c', width: 200, visible: true, sortable: true },
            { name: 'Job Resolution', prop: 'Dispatch_Service_Resolution_Status__c', width: 200, visible: true, sortable: true },
            { name: 'SLA Remaining', prop: 'Dispatch_SLA_Priority__cgh', width: 200, visible: true, sortable: true },
            { name: 'Partner Reference (Case / PO)', prop: 'Partner_Case_Number__c', width: 220, visible: true, sortable: true },
            { name: 'Case Summary', prop: 'Case_Summary__c', width: 200, visible: true, sortable: true },
            { name: 'Program Name', prop: 'programName', width: 200, visible: true, sortable: true },
            { name: 'Jobsite Location', prop: 'JobsiteName', width: 200, visible: true, sortable: true },
            { name: 'Country', prop: 'Country__c', width: 200, visible: true, sortable: true },
            { name: 'Type/Level', prop: 'Talent_Type_Name__c', width: 200, visible: true, sortable: true },
            { name: 'Priority', prop: 'Dispatch_SLA_Priority__c', width: 200, visible: true, sortable: true },
            { name: 'Vendor Name', prop: 'partnerName', width: 200, visible: true, sortable: true },
            { name: 'Worker Name / Phone', prop: 'workerName', width: 200, visible: true, sortable: true },
            { name: 'Date Posted (PMS Case)', prop: 'createdAt', width: 200, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'Customer Requested', prop: 'Worker_Arrival_DateTime_Cust_Requested__c', width: 200, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'Customer Scheduled', prop: 'Customer_Appointment_DateTime_Scheduled__c', width: 200, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'Worker Scheduled', prop: 'Worker_Arrival_DateTime_Scheduled__c', width: 200, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'Worker Arrival', prop: 'Worker_Arrival_Date_Time_Actual__c', width: 200, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'Date Posted (WO)', prop: 'woCreatedAt', width: 200, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'Last Updated (PMS Case)', prop: 'updatedAt', width: 200, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'Last Updated (ICC Case)', prop: 'caseUpdatedAt', width: 200, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'SO Price (w/VAT)(Status)', prop: 'Total_Price_Customer_PreTax_Rollup__c', width: 200, visible: true, sortable: true },
            { name: 'Created By', prop: 'CreatedBy', width: 200, visible: true, sortable: true }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling

        this.appStateSub = this._appState.getAppState().subscribe(appState => {
            this.appState = appState;
        });
    }

    ngOnDestroy() {
        if (this.appStateSub) {
            this.appStateSub.unsubscribe();
        }
    }

    redirectToDetails(id) {
        if (!this.appState) {
            this.appState = {};
        }
        this.appState['redirectUrl'] = '/pms/service-manager/orders-list';
        this._appState.setAppState(this.appState);
        localStorage.setItem('redirectUrl', '/pms/service-manager/orders-list');
        this.router.navigate(['/pms/service-manager/list-details', id]);
    }

    filterDataList(filterObj) {
        this.filterObjData = {};
        this.isLoadMore = false;
        this.table.offset = 0
        let inputs = document.getElementById('dataTable').getElementsByTagName('input');
        for (let index = 0; index < inputs.length; ++index) {
            inputs[index].value = '';
        }
        if (filterObj) {
            this.filterQuery = filterObj;
            this.isLoadMore = false;
            this.getWorkorderList(0, true);
        }
    }

    /**
     * get all work order and case data.
     * @param Offset skip nomber of rows.
     */
    getWorkorderList(Offset: number, newState: boolean) {
        this._preloaderService.showPreloader();
        this.loadingIndicator = true;
        if (newState) {
            this.dataList = [];
            this.tableData = [];
        }
        const findQuery = {
            'where': this.filterQuery,
            'order': this.orderBy,
            'skip': Offset,
            'limit': this.itemsPerBatch,
            'source': this.isInternalUser
        }
        this._caseApi.getServiceManagerOrderList(findQuery).subscribe(data => {
            const results = this.modifyData(data);
            this.moreRecords = (results.length == this.itemsPerBatch) ? true : false;
            this.dataList = (newState) ? results : this.dataList.concat(results);
            if (!this.isLoadMore) {
                this.tableData = (results) ? results : [];
                this.filteredItems = this.tableData;
            } else {
                if (results.length) {
                    this.filteredItems = this.dataList;
                    if (Object.keys(this.filterObjData).length > 0) {
                        this.tableData = this.filteredItems.filter(item => {
                            let notMatchingField = Object.keys(this.filterObjData).find(key =>
                                this._utilityService.dataTableSearch(item, this.filterObjData, key));
                            return !notMatchingField;
                        });
                        this.tableData = this.tableData;
                    } else {
                        this.tableData = this.dataList;
                    }
                }
            }
            this.loadingIndicator = false;
            this.setEmptyMessage();
            this._preloaderService.hidePreloader();
        },
            error => {
                this.loadingIndicator = false;
                this.initialMessage = error.message;
            }
        );

    }

    modifyData(data) {
        if (data.length) {
            data.forEach((item, index) => {
                if (item.CaseNumber) {
                    item['CaseNumber'] = item.CaseNumber;
                    if (item.Status) {
                        item['CaseNumber'] += '/' + item.Status;
                    }

                }
                if (item.workOrder && item.workOrder.Name) {
                    item['workOrderName'] = item.workOrder.Name;
                    if (item.workOrder && item.workOrder.Status__c) {
                        item['workOrderName'] += '/' + item.workOrder.Status__c;
                    }

                }

                if (item.appointment && item.appointment.Case && item.appointment.Case.CaseNumber) {
                    item['CaCaseNumber'] = item.appointment.Case.CaseNumber;
                    if (item.appointment.Case && item.appointment.Case.Status) {
                        item['CaCaseNumber'] += '/' + item.appointment.Case.Status;
                    }
                }
                if (item.appointment && item.appointment.Case && item.appointment.Case.updatedAt) {
                    item['caseUpdatedAt'] = this._utilityService.dateFormate(item.appointment.Case.updatedAt);
                }
                if (item.Job && item.Job.Iron_Job_num__c) {
                    item['Iron_Job_num__c'] = item.Job.Iron_Job_num__c;
                    if (item.Job && item.Job.Job_Status_Internal__c) {
                        item['Iron_Job_num__c'] += '/' + item.Job.Job_Status_Internal__c;
                    }
                }
                if (item.Job && item.Job.Dispatch_Service_Resolution_Status__c) {
                    item['Dispatch_Service_Resolution_Status__c'] = item.Job.Dispatch_Service_Resolution_Status__c;
                }
                item['Dispatch_SLA_Priority__cgh'] = (item.Dispatch_SLA_Priority__c) ? item.Dispatch_SLA_Priority__c : '';

                if (item && item.Partner_Case_Number__c) {
                    item['Partner_Case_Number__c'] = item.Partner_Case_Number__c;
                    if (item.Partner_PO_Number__c) {
                        item['Partner_Case_Number__c'] += '/' + item.Partner_PO_Number__c;
                    }
                }

                item['programName'] = (item.program && item.program.Name) ? item.program.Name : '';
                item['JobsiteName'] = (item.Jobsite && item.Jobsite.Name) ? item.Jobsite.Name : '';
                item['Country__c'] = (item.Jobsite && item.Jobsite.countryCode) ? item.Jobsite.countryCode.Country__c : '';
                item['Talent_Type_Name__c'] = (item.talentType && item.talentType.Talent_Type_Name__c) ?
                    item.talentType.Talent_Type_Name__c : '';

                item['Dispatch_SLA_Priority__c'] = (item.Dispatch_SLA_Priority__c) ? item.Dispatch_SLA_Priority__c : '';
                item['partnerName'] = (item.Account) ? item.Account.Name : '';
                item['workerName'] = (item.worker) ? item.worker.Name : '';
                if (item.worker && item.worker.Work_Phone_Number__c) {
                    item['workerName'] += '/' + item.worker.Work_Phone_Number__c;
                }

                item['Worker_Arrival_DateTime_Cust_Requested__c'] = (item.appointment &&
                    item.appointment.Worker_Arrival_DateTime_Cust_Requested__c) ?
                    this._utilityService.dateFormate(item.appointment.Worker_Arrival_DateTime_Cust_Requested__c) : '';

                item['Customer_Appointment_DateTime_Scheduled__c'] = (item.appointment &&
                    item.appointment.Customer_Appointment_DateTime_Scheduled__c) ?
                    this._utilityService.dateFormate(item.appointment.Customer_Appointment_DateTime_Scheduled__c) : '';

                item['Worker_Arrival_DateTime_Scheduled__c'] = (item.appointment &&
                    item.appointment.Worker_Arrival_DateTime_Scheduled__c) ?
                    this._utilityService.dateFormate(item.appointment.Worker_Arrival_DateTime_Scheduled__c) : '';
                item['Worker_Arrival_Date_Time_Actual__c'] = (item.appointment &&
                    item.appointment.Worker_Arrival_Date_Time_Actual__c) ?
                    this._utilityService.dateFormate(item.appointment.Worker_Arrival_Date_Time_Actual__c) : '';

                item['woCreatedAt'] = (item.workOrder && item.workOrder.createdAt) ?
                    this._utilityService.dateFormate(item.workOrder.createdAt) : '';
                item['Total_Price_Customer_PreTax_Rollup__c'] = (item.workOrder && item.workOrder.Status__c) ?
                    item.workOrder.Status__c : '';
                item['Total_Price_Customer_PreTax_Rollup__c'] = (item && item.Status) ? item.Status : '';
                item['CreatedBy'] = (item.contact) ? item.contact.Name : '';

                // for detail
                item['workOrderStatus__c'] = (item.workOrder) ? item.workOrder.Status__c : '';
                item['workOrderPartner_PO_Number__c'] = (item.workOrder) ? item.workOrder.Partner_PO_Number__c : '';
                item['workOrderWork_Summary__c'] = (item.workOrder) ? item.workOrder.Work_Summary__c : '';
                item['workOrderInstructions__c'] = (item.workOrder) ? item.workOrder.Instructions__c : '';
                item['RecordTypeName'] = (item.RecordType) ? item.RecordType.Name : '';
                item['programName'] = (item.program) ? item.program.Name : '';
                item['createdAt'] = (item.createdAt) ? this._utilityService.dateFormate(item.createdAt) : '';
                item['updatedAt'] = (item.updatedAt) ? this._utilityService.dateFormate(item.updatedAt) : '';
                item['expanded'] = false;
                //  delete key
                delete item.appointment;
                delete item.Account;
                delete item.program;
                delete item.RecordType;
                delete item.Jobsite;
                delete item.Job;
                delete item.talentType;
                delete item.workOrder;
                delete item.worker;
                delete item.contact;

            });
            return data;
        } else {
            return [];
        }
    }

    /*Data Table funcation start here*/
    loadMoreRecords() {
        this.isLoadMore = true;
        this.loadingIndicator = true;
        this.offset = this.filteredItems.length;
        this.getWorkorderList(this.filteredItems.length, false);
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
        this.filterObj = {};
        this.filterObjData = {};
        this.getWorkorderList(0, true);
    }

    openMessageTab(item) {
        this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
        });
        // set messaging in userState
        this.userState['messaging'] = {
            tab: 'messaging',
        }
        this._sharedService.setUserState(this.userState);
        this.redirectToDetails(item);
    }

    clearSearch(col) {
        if (col in this.filterObj) {
            this.filterObj[col] = ''
            delete this.filterObj[col];
            this.tableData = this.filteredItems.filter(item => {
                let notMatchingField = Object.keys(this.filterObj).find(key =>
                    this._utilityService.dataTableSearch(item, this.filterObj, key));
                return !notMatchingField;
            });
            this.table.offset = 0;
            this.setEmptyMessage();
        }
    }
    filterData(event, type) {

        if (type == 'date') {
            if (event.value === '') {
                if (this.filterObj[event.input.id + '_temp']) {
                    delete this.filterObj[event.input.id];
                }
            }
            const date = this._utilityService.dateFormate(event.value).split(',');
            this.filterObj[event.input.id] = date[0];
        }
        else {
            if (event.target.value === '') {
                delete this.filterObj[event.target.id];
            } else {
                this.filterObj[event.target.id] = event.target.value;
            }

        }
        this.filterObjData = this.filterObj
        this.tableData = this.filteredItems.filter(item => {
            let notMatchingField = Object.keys(this.filterObj).find(key =>
                this._utilityService.dataTableSearch(item, this.filterObj, key));
            return !notMatchingField;
        });
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
        this._sharedService.exportNgxData(this.tableData, this.columns, 'ServiceManagerOrderList');
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
}
