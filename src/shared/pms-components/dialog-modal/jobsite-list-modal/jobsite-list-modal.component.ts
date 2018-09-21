import { jobLocationMapService } from './../../../services/pms/job-location.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SharedService } from './../../../services/pms/shared.services';
import { AppStateService } from '../../../services/app-state.service';

import { DashboardApi, JobsiteApi } from '../../../sdk';

@Component({
    selector: 'jobsite-list-modal',
    templateUrl: './jobsite-list-modal.component.html',
    styleUrls: ['./jobsite-list-modal.component.css']
})

export class JobsiteListModalComponent implements OnInit {

    selectedAccountId: string;
    @Output() jobsiteCount: EventEmitter<any> = new EventEmitter<any>();
    private jobsites: any[];
    tableData = [];
    loadingIndicator = false;
    userState: any;
    initialMessage = '';
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 20;

    constructor(
        private _sharedservice: SharedService,
        private _jobLocationMapService: jobLocationMapService,
        private _appState: AppStateService,
        private _dashboardApi: DashboardApi,
        private _jobsiteApi: JobsiteApi
    ) { }

    ngOnInit() {
        this._sharedservice.getUserState().subscribe(current => {
            this.userState = current;
            this.getJobsite(0);
        });
    }

    getJobsite(offset: number) {
        if (this.userState && this.userState.program && this.userState.program.programSFId) {
            this.loadJobsitesByProgramId(offset);
        } else {
            this.loadJobsiteByAccountId(offset);
        }
    }
    loadJobsitesByProgramId(offset: number) {
        this.loadingIndicator = true;
        this.jobsites = [];
        this.initialMessage = '';
        const paramObj = {
            'programId': this.userState.program.programSFId,
            'models': ['Jobsite']
        };
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                data = data ? data.data : [];
                if (data && data['jobsites'] && data['jobsites']['list']) {
                    this.jobsites = data['jobsites']['list'];
                }
                this.setDataTable();
            },
            error => {
                this.initialMessage = error.message;
                this.loadingIndicator = false;
            }
        );
    }

    loadJobsiteByAccountId(offset: number) {
        this.selectedAccountId = this._appState.getSelectedAccount();
        this.loadingIndicator = true;
        const req = {
            'where': { 'Account__c': this.selectedAccountId },
            'fields': ['Jobsite_ID__c', 'Name', 'Country__c', 'State__c', 'Zip__c', 'City__c', 'Street__c',
                'sfdcId', 'geolocation__Latitude__s', 'geolocation__Longitude__s']
        }
        this._jobsiteApi.getJobsitesDT(req).subscribe(
            (result) => {
                this.jobsites = result.data ? result.data['jobsites'] : [];
                this.setDataTable();
            },
            error => {
                this.loadingIndicator = false;
                this.initialMessage = error.message
            }
        );
    }
    setDataTable() {
        if (!this.isLoadMore) {
            this.tableData = this.jobsites;
            this.initialMessage = this.jobsites.length ? '' : 'No record found';
        } else {
            this.jobsites.forEach(c => { this.tableData.push(c) });
            this.tableData = [...this.tableData];
        }
        if (!this.userState || !this.userState.program || !this.userState.program.programSFId) {
            this._jobLocationMapService.setJobLocations(this.jobsites)
        }
        this.jobsiteCount.emit(this.tableData.length);
        this.loadingIndicator = false;
    }
}
