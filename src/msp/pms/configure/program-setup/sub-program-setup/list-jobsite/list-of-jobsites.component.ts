import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { jobLocationMapService } from '../../../../../../shared/services/pms/job-location.service';
import { ModalService } from '../../../../../../shared/services/modal.service';
import { SharedService } from '../../../../../../shared/services/pms/shared.services';
import { QuoteService } from '../../../../../../shared/services/pms/quote.service';
import { PreloaderService } from '../../../../../../shared/services/preloader.service';

import { JobsiteApi } from '../../../../../../shared/sdk/services/custom/Jobsite';
import { JobsiteOptionComponent } from '../jobsite-option/jobsite-option.component';

@Component({
    selector: 'list-jobsites',
    templateUrl: './list-of-jobsites.component.html'
})

export class ListJobSitesComponent implements OnInit {

    selectedJobsite: any = [];
    selectedJobsiteModal: any = [];
    programID: string;
    jobsiteLocations: any;
    filteredJL: any;
    selectedjoblist: any = [];
    userState: any;
    contentData: any;
    selectedJobStatus = 'Active';
    errorMessage = 'Loading...';

    constructor(
        @Inject(forwardRef(() => JobsiteOptionComponent))
        public _jobsiteOptionComponent: JobsiteOptionComponent,
        private _preloaderService: PreloaderService,
        private _jobLocationService: jobLocationMapService,
        public _sharedservice: SharedService,
        private _quoteService: QuoteService,
        private modalService: NgbModal,
        private _jobsiteApi: JobsiteApi,
        private _modalService: ModalService
    ) {

    }

    ngOnInit() {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        this.enableSelection();
        this._sharedservice.getUserState().subscribe(current => {
            this.userState = current;
            if (current.program && current.program.programReferCode) {
                this.programID = current.program.programReferCode;
            }
            if (this.userState.program === undefined || this.userState.program.programSFId === undefined) {
                // Reset data variables
                this.selectedJobsite = [];
                this.jobsiteLocations = [];
                this.filteredJL = [];
                this.selectedjoblist = [];
                if (this.jobsiteLocations) {
                    this._jobLocationService.setJobLocations(this.jobsiteLocations);
                    this._jobLocationService.setSelectedLocations(this.selectedjoblist);
                    this._quoteService.setQuoteState({ 'jobsiteCount': this.jobsiteLocations.length });
                }
            } else {
                this.loadJobsiteData();
            }
        });
    }

    loadJobsiteData() {
        this._quoteService.getJobsites().subscribe(jobsites => {
            if (jobsites && jobsites.length) {
                this.jobsiteLocations = jobsites;
                if (this.jobsiteLocations && this.jobsiteLocations.length) {
                    this._jobLocationService.setJobLocations(this.jobsiteLocations);
                    this._quoteService.setQuoteState({ 'jobsiteCount': this.jobsiteLocations.length });
                }
                this.filterJobLocation('Active');
            } else {
                this.jobsiteLocations = [];
            }
        });
    }

    enableSelection() {
        this._jobLocationService.getSelectedLocations().subscribe(data => {
            this.selectedjoblist = data;
            this.selectedJobsite = [];
            this.selectedjoblist.map(
                (item) => {
                    if (item.Jobsite) {
                        this.selectedJobsite.push(item.Jobsite.Jobsite_ID__c);
                    } else if (item.Jobsite_ID__c) {
                        this.selectedJobsite.push(item.Jobsite_ID__c);
                    }
                }
            );
            if (this.selectedjoblist.length > 0) {
                this.filterJobLocation(this.selectedJobStatus);
            }
        });
    }

    toggleSelection(event) {
        if (event.target.checked) {
            this._jobsiteOptionComponent.successMsg = '';
            this.updateSelectedJoblist(event.target.value);
        }
    }

    updateSelectedJoblist(jobsiteID: string) {
        this.filteredJL.filter(item => {
            if (item['Jobsite_ID__c'] === jobsiteID) {
                this.selectedjoblist.push({ 'Jobsite': item });
            }
        });
        this._jobLocationService.setSelectedLocations(this.selectedjoblist);
    }

    filterJobLocation(status: string) {
        this.selectedJobStatus = status;
        if (status !== 'All' && (this.jobsiteLocations && this.jobsiteLocations.length > 0)) {
            this.filteredJL = this.jobsiteLocations.filter(
                item => item['Jobsite_Status__c'] === status
            );
        } else {
            this.filteredJL = this.jobsiteLocations;
        }
        this.errorMessage = this.filteredJL && this.filteredJL.length ? '' : 'No record found';
    }

    getActiveNavBarStatus(choice: string) {
        if (this.selectedJobStatus === choice) {
            return true;
        } else {
            return false;
        }
    }

    openDetailPage(content, _size, dataRow) {
        this.modalService.open(content, { size: _size });
        this.contentData = dataRow;
        this.contentData.openFor = 'EDIT';
    }

    isChecked(jobName: string) {
        if (this.selectedJobsite.indexOf(jobName) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    openExpandedViewModal(content, size) {
        this._jobLocationService.getSelectedLocations().take(1).subscribe(data => {
            this.selectedJobsiteModal = data;
            this._sharedservice.getUserState().subscribe(current => {
                // console.log(current);
                this.programID = current.program.programReferCode;
            });
        });
        this._modalService.open(content, size);
    }

    exportToCsv() {
        const data = [];
        this.selectedJobsiteModal.forEach((element, index) => {
            const obj = {
                'Program #': this.programID,
                'Jobsite #': element['Jobsite'].Jobsite_ID__c ? element['Jobsite'].Jobsite_ID__c : '',
                'Jobsite Name': element['Jobsite'].Name ? element['Jobsite'].Name : '',
                'Country': element['Jobsite'].Country__c ? element['Jobsite'].Country__c : '',
                'State': element['Jobsite'].State__c ? element['Jobsite'].State__c : '',
                'Zip': element['Jobsite'].Zip__c ? element['Jobsite'].Zip__c : '',
                'City': element['Jobsite'].City__c ? element['Jobsite'].City__c : '',
                'Street': element['Jobsite'].Street__c ? element['Jobsite'].Street__c : '',
                'Job Description': element['Jobsite'].Jobsite_Description__c ? element['Jobsite'].Jobsite_Description__c : '',
                'Service Zone': element['Jobsite']['GeoMetro'].Name ? element['Jobsite']['GeoMetro'].Name : ''
            };
            data.push(obj);
        });

        this._sharedservice.exportData(data, 'JobsiteExportView');
    }
}
