import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/services/pms/shared.services';
import { jobLocationMapService } from '../../../../../shared/services/pms/job-location.service';

@Component({
    selector: 'selected-jobsites',
    templateUrl: './selected-jobsite.component.html'
})
export class SelectedJobSitesComponent implements OnInit {

    selectedJobsite: any[] = [];
    programID: string;
    isSchedule = false;
    isProgram = false;
    errorMessage = ''
    quoteLineObjs: any;

    constructor(
        private _jobLocationService: jobLocationMapService,
        public _sharedservice: SharedService,
        private _location: Location
    ) { }

    ngOnInit() {
        this._jobLocationService.getSelectedLocations().subscribe(data => {
            if (data && data.length) {
                this.selectedJobsite = data;
                this.errorMessage = '';
                if (this._location.path().indexOf('program') === -1 && data.length > 0) {
                    this.setJobLocationMap();
                }
                if (this._location.path().indexOf('schedule') !== -1) {
                    this.isSchedule = true;
                    this.setDataForSelectedJobsite(this.selectedJobsite[0]);
                } else {
                    this.isSchedule = false;
                }
            } else {
                this.selectedJobsite = [];
                this.errorMessage = 'No record found.'
                this._sharedservice.setServiceProvider([]);
                this._sharedservice.setAllProviders([], true);
            }
        });
        this._sharedservice.getUserState().subscribe(current => {
            this.programID = (current.program) ? current.program.programReferCode : '';
        });
        this.isProgram = (this._location.path().indexOf('program') !== -1) ? true : false;
    }
    setJobLocationMap() {
        const jobsiteArray = [];
        this.selectedJobsite.forEach(item => {
            jobsiteArray.push(item.Jobsite);
        });
        this._jobLocationService.setJobLocations(jobsiteArray);
    }

    setDataForSelectedJobsite(jobsite) {
        this._sharedservice.getQuoteLineObj().subscribe(data => {
            if (data && data.length > 1) {
                this.quoteLineObjs = data;
                this.filterQuoteLineObjs(jobsite);
            } else if (data && data.length === 1) {
                this._sharedservice.setFilteredQuoteLineObj(data);
            }
        })
    }

    filterQuoteLineObjs(jobsite) {
        const filteredQuoteLines = this.quoteLineObjs.filter(item => item.Jobsite.sfdcId === jobsite.Jobsite.sfdcId)
        if (filteredQuoteLines && filteredQuoteLines.length) {
            this._sharedservice.setFilteredQuoteLineObj(filteredQuoteLines);
        }
    }

    removeSelectedJobsite(jobLoc, i) {
        this.selectedJobsite.splice(i, 1);
        this._jobLocationService.setSelectedLocations(this.selectedJobsite);
    }
}