import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { AppStateService } from '../../../../services/app-state.service';
import { SharedService } from '../../../../services/pms/shared.services';
import { PreloaderService } from '../../../../services/preloader.service';
import { UtilityService } from '../../../../services/utility.service';

import { CaseApi } from '../../../../sdk';

@Component({
    selector: 'service-manager-feeds-list',
    templateUrl: './service-manager-feeds-list.component.html',
    styleUrls: ['./service-manager-feeds-list.component.css']
})

export class ServiceManagerFeedsListComponent implements OnInit, OnDestroy, AfterViewInit {

    pageTitle = 'Work Order and Case List - MSP View';
    isCollapsed = true;
    isInternalUser = false;
    filterQuery = {};
    limitOptions = [10, 25, 50, 100, 200]
    errorMessage: any;
    translations: any;
    tableData = [];
    dataList: any;
    tableResource: any;
    tableDataCount = 0;
    itemsPerPage = 10;
    isLoadMore = false;
    userState: any;
    itemsPerBatch = 200;
    orderBy = 'createdAt DESC';
    customPagingControls = ['First', 'Previous', 'Next', 'Last'];
    initialMessage = 'Loading...';
    private appStateSub: Subscription;
    appState: any;
    loadingIndicator = true;
    columns: any[];
    allColumns: any[];
    filterObj = {};
    filterObjData = {};
    filteredItems: any;
    @ViewChild('myTable') table: any;
    offset = 0;
    expanded: any = {};
    moreRecords = false;

    constructor(
        private _router: Router,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _sharedService: SharedService,
        private _caseApi: CaseApi,
        private _utilityService: UtilityService,
        private el: ElementRef
    ) {
        this._sharedService.pushactivewizard(1);
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
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }

        this.columns = [
            { name: 'Action', prop: '__', width: 100, visible: true, sortable: false },
            { name: 'PMS Case ID(Status)', prop: 'CaseNumber', width: 200, visible: true, sortable: true },
            { name: 'WO Case ID(Status)', prop: 'Name', width: 200, visible: true, sortable: true },
            { name: 'ICC Case ID(Status)', prop: 'CaCaseNumber', width: 200, visible: true, sortable: true },
            { name: 'Job ID(Status)', prop: 'Iron_Job_num__c', width: 200, visible: true, sortable: true },
            { name: 'Job Resolution', prop: 'Dispatch_Service_Resolution_Status__c', width: 200, visible: true, sortable: true },
            { name: 'Partner Reference (Case / PO)', prop: 'Partner_Case_Number__c', width: 250, visible: true, sortable: true },
            { name: 'Program Name', prop: 'programName', width: 200, visible: true, sortable: true },
            { name: 'Jobsite Location', prop: 'JobsiteName', width: 200, visible: true, sortable: true },
            { name: 'Partner Name / Customer Name', prop: 'partnerName', width: 250, visible: true, sortable: true },
            { name: 'Worker Name / Phone', prop: 'workerName', width: 200, visible: true, sortable: true },
            { name: 'Appointment Activity', prop: 'AActivity', width: 200, visible: true, sortable: true },
            { name: 'PMS Case Summary', prop: 'Case_Summary__c', width: 200, visible: true, sortable: true },
            { name: 'All Case Comments', prop: 'AllCaseComment', width: 200, visible: true, sortable: true },
            { name: 'Messages PMS Case (from Partner)', prop: 'MessagesPMSCase', width: 250, visible: true, sortable: true },
            { name: 'Messages PMS Case (from IRON)', prop: 'MessagesIRONCase', width: 250, visible: true, sortable: true },
            { name: 'Messages PMS Case (MSP Internal)', prop: 'MessagesMSPInternalCase', width: 250, visible: true, sortable: true },
            { name: 'Messages ICC/3PS Case (MSP Internal)', prop: 'Messages3PSCase', width: 300, visible: true, sortable: true },
            { name: 'Messages ICC/3PL Case (MSP Internal)', prop: 'Messages3PLCase', width: 300, visible: true, sortable: true },
            { name: 'Messages (Worker) Job (from VMS/FMS)', prop: 'MessagesWorkerCase', width: 300, visible: true, sortable: true },
            { name: 'Date Posted', prop: 'DatePosted(PMSCase)', width: 200, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'Last Updated (PMS Case)', prop: 'DateUpdate(PMSCase)', width: 200, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'Last Updated (ICC Case)', prop: 'DateUpdateICCCase', width: 200, visible: true, sortable: true, type: 'date', format: 'short' },
            { name: 'Last Updated (Job)', prop: 'DateUpdate(Job)', width: 200, visible: true, sortable: true, type: 'date', format: 'short' }

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
        this.appState['redirectUrl'] = '/pms/service-manager/feeds-list';
        this._appState.setAppState(this.appState);
        localStorage.setItem('redirectUrl', '/pms/service-manager/feeds-list');
        this._router.navigate(['/pms/service-manager/list-details', id]);
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
            this.getActiveFeedList(0, true);
        }
    }
    /**
     * get all work order and case data.
     * @param Offset skip nomber of rows.
     */
    getActiveFeedList(Offset: number, newState: boolean) {
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
            'source': this.isInternalUser,
            'isFeed': false
        }
        this._caseApi.getServiceManagerActiveFeedList(findQuery).subscribe(data => {
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
            this._preloaderService.hidePreloader();
            this.loadingIndicator = false;
            this.setEmptyMessage();
        },
            error => {
                this.errorMessage = error.message;
                this.initialMessage = this.errorMessage;
                this.loadingIndicator = false;
                this._preloaderService.hidePreloader();
            }
        );

    }

    /*Data Table funcation start here*/
    search(e) {
        this.tableResource.filterData(e);
        this.tableResource.count().then(count => {
            this.tableDataCount = count;
            if (this.tableDataCount === 0) {
                this.initialMessage = 'No records found.';
            }
        });
    }

    modifyData(data) {
        if (data.length) {
            data.forEach((item, index) => {
                if (item.workOrder && item.workOrder.Name) {
                    item['Name'] = item.workOrder.Name;
                    if (item.workOrder && item.workOrder.Status__c) {
                        item['Name'] += '/' + item.workOrder.Status__c;
                    }

                }

                if (item.appointment && item.appointment.Case && item.appointment.Case.CaseNumber) {
                    item['CaCaseNumber'] = item.appointment.Case.CaseNumber;
                    if (item.appointment.Case && item.appointment.Case.Status) {
                        item['CaCaseNumber'] += '/' + item.appointment.Case.Status;
                    }
                }
                // if (item.appointment && item.appointment.Case.updatedAt) {
                //     item['caseUpdatedAt'] = this._utilityService.dateFormate(item.appointment.Case.updatedAt);
                // }
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
                item['partnerName'] = (item.Account) ? item.Account.Name : '';
                item['workerName'] = (item.worker) ? item.worker.Name : '';
                if (item.worker && item.worker.Work_Phone_Number__c) {
                    item['workerName'] += '/' + item.worker.Work_Phone_Number__c;
                }
                item['AActivity'] = 'N/A';
                item['Case_Summary__c'] = (item.Case_Summary__c) ? item.Case_Summary__c : '';
                item['AllCaseComment'] = 'N/A';
                item['MessagesPMSCase'] = 'N/A';
                item['MessagesIRONCase'] = 'N/A';
                item['MessagesMSPInternalCase'] = 'N/A';
                item['Messages3PSCase'] = 'N/A';
                item['Messages3PLCase'] = 'N/A';
                item['MessagesWorkerCase'] = 'N/A';
                item['DatePosted(PMSCase)'] = (item.createdAt) ? this._utilityService.dateFormate(item.createdAt) : '';
                item['DateUpdate(PMSCase)'] = (item.updatedAt) ? this._utilityService.dateFormate(item.updatedAt) : '';
                item['DateUpdateICCCase'] = (item.appointment && item.appointment.Case && item.appointment.Case.updatedAt) ? this._utilityService.dateFormate(item.appointment.Case.updatedAt) : '';
                item['DateUpdate(Job)'] = (item.Job && item.Job.updatedAt) ? this._utilityService.dateFormate(item.Job.updatedAt) : '';


                // for detail
                item['CaseNumberDetail'] = (item.CaseNumber) ? item.CaseNumber : '';
                item['workOrderStatus__c'] = (item.workOrder) ? item.workOrder.Status__c : '';
                item['workOrderPartner_PO_Number__c'] = (item.workOrder) ? item.workOrder.Partner_PO_Number__c : '';
                item['RecordTypeName'] = (item.RecordType) ? item.RecordType.Name : '';

                if (item.CaseNumber) {
                    item['CaseNumber'] = item.CaseNumber;
                    if (item.Status) {
                        item['CaseNumber'] += '/' + item.Status;
                    }

                }
                //  delete key
                delete item.appointment;
                delete item.Account;
                delete item.program;
                delete item.Jobsite;
                delete item.Job;
                delete item.workOrder;
                delete item.worker;

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
        this.getActiveFeedList(this.filteredItems.length, false);
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
        this.getActiveFeedList(0, true);
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

    exportCSV() {
        this._sharedService.exportNgxData(this.tableData, this.columns, 'ServiceManagerFeedList');
    }

}
