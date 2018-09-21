import { Component, OnInit, PipeTransform, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AppStateService } from '../../../../services/app-state.service';
import { UtilityService } from '../../../../services/utility.service';
import { SharedService } from 'shared/services/pms/shared.services';
import { ModalService } from '../../../../services/modal.service';
import { PreloaderService } from 'shared/services/preloader.service';
import { JobStatusInternalValues } from '../../../../models/static-list-data.service';
import { JobApi } from '../../../../sdk/services/custom/Job';
import { LoopBackAuth } from 'shared/sdk/services/core';

@Component({
    selector: 'app-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.css']
})

export class JobsListComponent implements OnInit, AfterViewInit, PipeTransform {

    pageTitle: string;
    pageSubTitle = '';
    private sub: any;
    datePipe: DatePipe;
    searchArray: any;
    /*Boot-Datatable params */
    tableData = [];
    dataList: any;
    loadingIndicator = false;
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 200;
    orderBy = 'CreatedDate  DESC';
    errorMessage = 'Loading...';
    filterObj = {};
    sSfilter = { 'Job_Status_Internal__c': '' };
    filteredItems: any;
    @ViewChild('myTable') table: any;
    columns: any;
    allColumns: any;
    JobStatusInternalValues = JobStatusInternalValues;
    filterJobValue = '';

    constructor(
        private route: ActivatedRoute,
        private _appState: AppStateService,
        private _utilityService: UtilityService,
        private jobApi: JobApi,
        private _sharedservice: SharedService,
        private _modalService: ModalService,
        private el: ElementRef,
        private _loader: PreloaderService,
        private _auth: LoopBackAuth
    ) {
        this.searchArray = {};
        this.sub = this.route.params.subscribe(params => {
            if (params['status']) {
                if (params['status'] === 'myjob') {
                    const user = this._auth.getCurrentUserData();
                    this.searchArray = {};
                    this.searchArray['Dispatch_Worker_Name__c'] = user['WorkerSfdcId'];
                    this.pageSubTitle = 'My';
                } else {
                    this.searchArray['Job_Status_Internal__c'] = params['status'];
                    this.sSfilter['Job_Status_Internal__c'] = params['status'];
                    this.pageSubTitle = (params && params['status']) ?
                        (params['status'].charAt(0).toUpperCase() + params['status'].substr(1).toLowerCase()) : '';
                }

                if (this.columns) {
                    this.columns.forEach(element => {
                        element['visible'] = true;
                    });
                }
            }
            if (localStorage.getItem('ImpersonationId')) {
                this.searchArray['Vendor__c'] = localStorage.getItem('ImpersonationId');
            }
            this.getJobListings(this.searchArray, 0, true);
            this.pageTitle = this.pageSubTitle + ' Job List';
        });
    }

    ngAfterViewInit() {
        const elHeader = this.el.nativeElement.querySelector('.datatable-header')
        const elBody = this.el.nativeElement.querySelector('datatable-body');
        elHeader.onscroll = () => {
            elBody.scrollLeft = elHeader.scrollLeft
        }
        elBody.onscroll = () => {
            elHeader.scrollLeft = elBody.scrollLeft
        }
    }

    ngOnInit() {
        this.columns = [
            { prop: 'Iron_Job_num__c', name: 'Job ID', visible: true, width: 250, sortable: true },
            { prop: 'Job_Status_Internal__c', name: 'Status', visible: true, width: 200, sortable: true },
            { prop: 'Dispatch_Service_Resolution_Status__c', name: 'Resolution', visible: true, width: 200, sortable: true },
            { prop: 'programName', name: 'Program', visible: true, width: 200, sortable: true },
            { prop: 'vendorName', name: 'Vendor(s)', visible: true, width: 200, sortable: true },
            { prop: 'Jobsite_Name__c', name: 'Jobsite Location', visible: true, width: 200, sortable: true },
            { prop: 'CKSW_BASE__Country__c', name: 'Country', visible: true, width: 100, sortable: true },
            { prop: 'csum__c', name: 'Summary', visible: true, width: 200, sortable: true },
            { prop: 'Customer_Service_Type__c', name: 'Service Type', visible: true, width: 200, sortable: true },
            { prop: 'Talent_Type__c', name: 'Talent Type', visible: true, width: 200, sortable: true },
            { prop: 'Technical_Level__c', name: 'Service Level', visible: true, width: 120, sortable: true },
            { prop: 'Service_Dispatch_SLA_Priority__c', name: 'Priority', visible: true, width: 100, sortable: true },
            { prop: 'SKU', name: 'Coverage', visible: true, width: 200, sortable: true },
            { prop: 'Customer_Requested', name: 'Customer Requested', visible: true, width: 200, sortable: true, type: 'date', format: 'short' },
            { prop: 'Cust_Scheduled__c', name: 'Customer Scheduled', visible: true, width: 200, sortable: true, type: 'date', format: 'short' },
            { prop: 'Worker_Scheduled__c', name: 'Worker Scheduled', visible: true, width: 200, sortable: true, type: 'date', format: 'short' },
            { prop: 'Worker_Arrival__c', name: 'Worker Arrival', visible: true, width: 200, sortable: true, type: 'date', format: 'short' },
            { prop: 'CreatedDate', name: 'Date Posted', visible: true, width: 200, sortable: true, type: 'date', format: 'short' },
            { prop: 'updatedAt', name: 'Last updated', visible: true, width: 200, sortable: true, type: 'date', format: 'short' }
        ];

        const accessType = this._appState.getAccessType();
        if (accessType === 'vendor') {
            this.columns.splice((this.columns.findIndex(x => x.prop === 'vendorName')), 1)
        }
        this.allColumns = this.columns.slice(); // Used for Columns Toggling
    }

    refreshView() {
        this.isLoadMore = false;
        if (this.table) {
            this.table['offset'] = 0
        }
        this.tableData = [];
        let inputs;
        let selects;
        inputs = document.getElementsByTagName('input');
        selects = document.getElementsByTagName('select');
        for (let index = 0; index < inputs.length; ++index) {
            inputs[index].value = '';
        }
        for (let index = 0; index < selects.length; ++index) {
            selects[index].value = '';
        }
        this.filterObj = {};
        this.getJobListings(this.searchArray, 0, true);
    }

    toggle(col) {
        col.visible = !col.visible;
    }

    getJobListings(searchArg: any, offset: number, newState: boolean) {

        this.loadingIndicator = true;
        if (newState) {
            this.dataList = [];
            this.tableData = [];
        }
        // to fetch data initially and after search
        this.jobApi.getList('all', {
            where: searchArg,
            limit: this.itemsPerBatch,
            order: this.orderBy,
            skip: offset
        }).subscribe(
            results => {
                this.isLoadMore = (results.length === this.itemsPerBatch) ? true : false;
                results = this.prepareJobData(results);
                this.dataList = this.dataList.concat(results);
                this.tableData = [...this.dataList];
                this.filteredItems = this.dataList.slice();
                if (Object.keys(this.filterObj).length > 0 && this.filterObj.constructor === Object) {
                    this.tableData = this.filteredItems.filter(item => {
                        const notMatchingField = Object.keys(this.filterObj).find(key =>
                            this._utilityService.dataTableSearch(item, this.filterObj, key));
                        return !notMatchingField;
                    });
                }
                this.loadingIndicator = false;
                this._loader.hidePreloader();
                this.setEmptyMessage();
            },
            error => {
                this.loadingIndicator = false;
                this._loader.hidePreloader();
                this.errorMessage = error.message;
            }
        )
    }

    setEmptyMessage() {
        const msg = 'No data to display.';
        if (!this.tableData.length) {
            this.tableData = [{
                'message': msg
            }];
            this.tableData[0][this.columns[0]['prop']] = msg;
        } else {
            if (this.tableData[0].hasOwnProperty('message')) {
                this.tableData.shift();
            }
        }
    }

    /*Data Table funcation start here*/
    loadMoreRecords() {
        this.isLoadMore = true;
        this._loader.showPreloader();
        if (this.dataList.length <= this.itemsPerBatch) {
            this.getJobListings(this.searchArray, this.itemsPerBatch, false);
        } else {
            this.getJobListings(this.searchArray, this.dataList.length, false);
        }
    }

    prepareJobData(data) {
        const jobData = [];
        if (data) {
            let obj;
            data.forEach((item, index) => {
                obj = {};
                obj = {
                    'sfdcId': item.sfdcId ? item.sfdcId : '',
                    'RecordTypeId': item.RecordTypeId ? item.RecordTypeId : '',
                    'Iron_Job_num__c': item.Iron_Job_num__c ? (item.Iron_Job_num__c + ' ' + item.Name) : '',
                    'Job_Status_Internal__c': item.Job_Status_Internal__c ? item.Job_Status_Internal__c : '',
                    'Dispatch_Service_Resolution_Status__c': item.Dispatch_Service_Resolution_Status__c ?
                        item.Dispatch_Service_Resolution_Status__c : '',
                    'programName': item.program ? item.program.Name ? item.program.Name : '' : '',
                    'vendorName': item.vendor ? item.vendor.Name ? item.vendor.Name : '' : '',
                    'Jobsite_Name__c': item.Jobsite_Name__c ? item.Jobsite_Name__c : '',
                    'CKSW_BASE__Country__c': item.CKSW_BASE__Country__c ? item.CKSW_BASE__Country__c : '',
                    'Customer_Service_Type__c': item.Customer_Service_Type__c ? item.Customer_Service_Type__c : '',
                    'Talent_Type__c': item.Talent_Type__c ? item.Talent_Type__c : '',
                    'Service_Dispatch_SLA_Priority__c': item.Service_Dispatch_SLA_Priority__c ? item.Service_Dispatch_SLA_Priority__c : '',
                    'SKU': item.product ? item.product.Name ? item.product.Name : '' : '',
                    'csum__c': item.csum__c ? item.csum__c : '',
                    'Technical_Level__c': (item.Talent_Type__c && item.Technical_Level__c) ?
                        (item.Talent_Type__c + '-' + item.Technical_Level__c) :
                        (item.Talent_Type__c ? item.Talent_Type__c :
                            (item.Technical_Level__c ? item.Technical_Level__c : '')),
                    'Cust_Scheduled__c': item.appointment ? item.appointment.Customer_Appointment_DateTime_Scheduled__c ?
                        this.transform(item.appointment.Customer_Appointment_DateTime_Scheduled__c) : '' : '',
                    'Worker_Scheduled__c': item.appointment ? item.appointment.Worker_Arrival_DateTime_Scheduled__c ?
                        this.transform(item.appointment.Worker_Arrival_DateTime_Scheduled__c) : '' : '',
                    'Worker_Arrival__c': item.appointment ? item.appointment.Worker_Arrival_Date_Time_Actual__c ?
                        this.transform(item.appointment.Worker_Arrival_Date_Time_Actual__c) : '' : '',
                    'CreatedDate': item.CreatedDate ? this.transform(item.CreatedDate) : '',
                    'updatedAt': item.updatedAt ? this.transform(item.updatedAt) : '',
                    'Customer_Requested': item.Customer_Requested ? this.transform(item.Customer_Requested) : ''
                };
                if (item.appointment) {
                    const date = new Date(item.appointment.Customer_Appointment_Start_Scheduled__c);
                    date.setHours(item.appointment.Customer_Appointment_Start_HRS_Scheduled__c)
                    date.setMinutes(item.appointment.Customer_Apptmnt_Start_Minutes_Scheduled__c)
                    obj['Customer_Requested'] = this.transform(date.toISOString())
                }
                jobData.push(obj);
            });
        }

        return jobData;
    }

    transform(value: string, type?) {
        let dateformate: string;
        type ? dateformate = type : dateformate = 'short';
        this.datePipe = new DatePipe('en-US');
        const formateddate = (value ? this.datePipe.transform(value, dateformate) : value);
        return formateddate;
    }


    filterData(event, type) {

        if (type === 'date') {
            if (event.value === '') {
                if (this.filterObj[event.input.id + '_temp']) {
                    delete this.filterObj[event.input.id];

                }
            } else {
                const date = this.transform(event.value).split(',');
                this.filterObj[event.input.id] = date[0];
            }
            this.tableData = this.filteredItems.filter(item => {
                const notMatchingField = Object.keys(this.filterObj).find(key =>
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
                const notMatchingField = Object.keys(this.filterObj).find(key =>
                    this._utilityService.dataTableSearch(item, this.filterObj, key));
                return !notMatchingField;
            });
        }
        this.table.offset = 0;
        this.setEmptyMessage();

    }
    resetsSfFilter() {
        this.sSfilter = {
            'Job_Status_Internal__c': ''
        };
        this.refreshView();
        this._modalService.closed();
    }
    sSfilterData() {
        const filter = {};
        const dateProp = this.columns.filter(x => x.type === 'date' ? x.prop : '');
        for (const key in this.sSfilter) {
            if (dateProp.findIndex(x => x.prop === key) === -1) {
                const searchPattern = { like: '%' + this.sSfilter[key].toLowerCase() + '%', options: 'i' };
                filter[key] = searchPattern
            } else {
                let dateFrom: any;
                let dateTo: any;
                if (this.sSfilter[key] && this.sSfilter[key].length > 0) {
                    dateFrom = this.sSfilter[key][0]
                        ? this.transform(this.sSfilter[key][0], 'MM-dd-yyyy') + ' 00:00:00'
                        : '';
                    dateTo = this.sSfilter[key][1]
                        ? this.transform(this.sSfilter[key][1], 'MM-dd-yyyy') + ' 23:59:59'
                        : '';
                    dateFrom = new Date(dateFrom);
                    dateTo = new Date(dateTo);
                }
                const searchPattern = { between: [dateFrom, dateTo] }
                filter[key] = searchPattern
            }
        }
        this.table.offset = 0;
        this.getJobListings(filter, 0, true);
        this._modalService.closed();
    }

    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'JobList');
    }

    clearSearch(col) {
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
    clearsSfilter(col) {
        delete this.sSfilter[col];
    }

    filterByJobId(obj) {
        const filter = {};
        const searchPattern = { like: '%' + this.filterJobValue.trim() + '%', options: 'i' };
        filter['Iron_Job_num__c'] = searchPattern
        this.table.offset = 0;
        this.getJobListings(filter, 0, true);
    }

    open(content, size) {
        this._modalService.open(content, size);
    }
}
