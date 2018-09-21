import { NgbModal, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { QuoteService } from '../../../../services/pms/quote.service';
import { JobsiteApi, JobsiteProjectsApi } from '../../../../sdk';
import { jobLocationMapService } from '../../../../services/pms/job-location.service';
import { SharedService } from '../../../../services/pms/shared.services';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'jobsite-list',
    templateUrl: './jobsite-list.component.html',
    styleUrls: ['./jobsite-list.component.css']
})
export class JobsiteListComponent implements OnInit {
    //For Tab Alignment
    currentJustify = 'justified';
    currentStatus = 'Active';

    // setup for pagination
    tableData = [];
    loadingIndicator = false;
    errorMessage = 'Loading..';
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 100;

    userState: any;
    programID: string;
    jobsiteLocations: any;
    contentData: any;
    noRecords: any;

    constructor(
        public _sharedservice: SharedService,
        private _jobsiteApi: JobsiteApi,
        private _jobLocationService: jobLocationMapService,
        private _jobsiteProjectsApi: JobsiteProjectsApi,
        private _quoteService: QuoteService,
        private _modalService: NgbModal,
    ) {
        this._sharedservice.getUserState().subscribe(current => {
            this.userState = current;
            this.programID = current.program.programReferCode;
            this.jobsiteLocations = [];
            if (this.userState.program.programSFId) {
                this.loadJobsiteData(0);
            } else {
                this._jobLocationService.setJobLocations(this.jobsiteLocations);
                this._quoteService.setQuoteState({ 'jobsiteCount': this.jobsiteLocations.length });
            }
        });
    }

    ngOnInit() {
    }
    /*  function Load jobsite data from database based on condition */
    loadJobsiteData(offset: number) {
        /* filter are set to call jobsite api */
        this.loadingIndicator = true;
        this.jobsiteLocations = [];
        const req = {
            'programId': this.userState.program.programSFId,
            'source': 'list-jobsites-contact',
            'fields': ['GEO_Metro__c', 'Jobsite_ID__c', 'Name', 'Country__c', 'State__c', 'Zip__c', 'City__c', 'Street__c',
                'Jobsite_Description__c', 'Jobsite_Status__c', 'geolocation__Latitude__s', 'geolocation__Longitude__s', 'Type__c',
                'Jobsite_Approval_Status__c', 'sfdcId', 'Jobsite__c', 'Jobsite_Key_Contact__c', 'id', 'Account__c'],
            limit: this.itemsPerBatch,
            skip: offset
        }
        if (this.currentStatus !== 'All') {
            req['where'] = { 'Jobsite_Status__c': this.currentStatus }
        }
        this._jobsiteApi.getJobsitesByMasterProject(req).subscribe(result => {
            if (result.data && result.data.jobsites && result.data.jobsites.length > 0) {
                this.jobsiteLocations = result.data.jobsites;
                this._jobLocationService.setJobLocations(this.jobsiteLocations);
            }
            this.noRecords = (this.jobsiteLocations.length < this.itemsPerBatch) ? true : false;
            if (!this.isLoadMore) {
                this.tableData = this.jobsiteLocations;
                this.errorMessage = this.jobsiteLocations.length ? '' : 'No record found';
            } else {
                this.jobsiteLocations.forEach(c => {
                    this.tableData.push(c);
                });
                this.tableData = [...this.tableData];
            }
            this.loadingIndicator = false;
        },
            err => {
                this.loadingIndicator = false;
                this.errorMessage = err.message;
            }
        );
    }

    selectJobLocation(status: string) {
        this.isLoadMore = false;
        this.currentStatus = status;
        this.errorMessage = 'loading..';
        this.loadJobsiteData(0);
    }

    /* function used to open jobsite detail page on click of Edit button in list of jobsite. */
    openDetailPage(content, _size, dataRow, btnElement) {
        if (btnElement && btnElement.parentElement && btnElement.parentElement.parentElement) {
            btnElement.parentElement.parentElement.blur();
        }
        this._modalService.open(content, { size: _size });
        this.contentData = dataRow;
        this.contentData.openFor = 'EDIT';
    }

    loadMoreRecords() {
        this.isLoadMore = true;
        this.loadJobsiteData(this.tableData.length);
    }

}
