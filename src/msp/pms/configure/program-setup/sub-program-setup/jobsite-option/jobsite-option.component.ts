import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, ViewChild, Output } from '@angular/core';

import { PreloaderService } from './../../../../../../shared/services/preloader.service';
import { SharedService } from '../../../../../../shared/services/pms/shared.services';
import { jobLocationMapService } from '../../../../../../shared/services/pms/job-location.service';
import { AppStateService } from '../../../../../../shared/services/app-state.service';
import { ModalService } from '../../../../../../shared/services/modal.service';

import { CreateJobsiteComponent } from '../../../../../../shared/pms-components/create-jobsite/create-jobsite.component';
import { UploadJobsiteComponent } from '../../../../../../shared/pms-components/upload-jobsite/upload-jobsite.component';
import { UploadFinalJobsiteComponent } from '../../../../../../shared/pms-components/upload-finaljobsite/upload-finaljobsite.component';

import { GeoMetroApi, JobsiteApi } from '../../../../../../shared/sdk';

@Component({
    selector: 'jobsite-option',
    templateUrl: './jobsite-option.component.html'
})

export class JobsiteOptionComponent implements OnInit {

    selectedAccountId: string;
    @Output() jobType: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild(CreateJobsiteComponent) child: CreateJobsiteComponent;
    existingJobList = true;
    selectedjoblist = false;
    userState: any = {};
    newprogram = false;
    existingprogram = false;
    serviceZones = [];
    filteredServiceZones = [];
    selectedZone: any;
    successMsg = '';
    errorMsg = '';
    jobTypeSelection = 'useExisting';
    contentData: any;

    constructor(
        private _sharedService: SharedService,
        private _jobLocationService: jobLocationMapService,
        private _preloaderService: PreloaderService,
        private _appState: AppStateService,
        private _modalService: ModalService,
        private _jobsiteApi: JobsiteApi,
        private _geoMetroApi: GeoMetroApi
    ) {
        this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
            if (this.userState.program && this.userState.program.isExisting) {
                this.newprogram = false;
                this.existingprogram = true;
                this.jobTypeSelection = 'useExisting';
                this.enableNextStep();
            } else {
                this.existingprogram = false;
                this.newprogram = true;
            }
        });
    }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        this.serviceZones = [];
        this.loadServiceZones();
    }

    /* Function that set type of creation Jobsite */
    enableNextStep() {
        this.serviceZones = [];
        if (this.jobTypeSelection === 'useExisting') {
            this.existingJobList = true;
            this.newprogram = false;
        } else {
            this.existingJobList = false;
            this.newprogram = true;
            // this._jobLocationService.setSelectedLocations([]);
        }
        this.jobType.emit({
            jobType: this.jobTypeSelection
        });
    }

    loadServiceZones() {
        this.filteredServiceZones = [];
        this.serviceZones = [];
        this._preloaderService.showPreloader();
        this._geoMetroApi.find().subscribe(
            data => {
                this.filteredServiceZones = data;
                this._preloaderService.hidePreloader();
            },
            err => {
                console.log('Error loading service zones>>', err.message);
                this._preloaderService.hidePreloader();
            }
        );
    }

    updateZones(filters) {
        this.serviceZones = [];
        // to filter country
        if (filters.data.countryid) {
            this.serviceZones = this.filteredServiceZones.filter(item => {
                return item.GEO_Country__c === filters.data.countryid;
            });
        } else {
            // On reset filter
            // this.serviceZones = this.filteredServiceZones;
        }
        // to filter state
        if (filters.data.stateid) {
            this.serviceZones = this.filteredServiceZones.filter(item => {
                return item.State_Province__c === filters.data.stateid;
            });
        }
        // to filter zip Code
        if (filters.data.ZipCode) {
            this.serviceZones = this.serviceZones.filter(item => {
                return item.Postal_Zip_Code__c.toLowerCase() === filters.data.ZipCode.toLowerCase();
            });
        }
        // to filter city
        if (filters.data.City) {
            this.serviceZones = this.serviceZones.filter(item => {
                return item.City__c.toLowerCase() === filters.data.City.toLowerCase();
            });
        }
        // to filter street
        if (filters.data.Street) {
            this.serviceZones = this.serviceZones.filter(item => {
                if (item.Street__c) {
                    return item.Street__c.toLowerCase() === filters.data.Street.toLowerCase();
                }
            });
        }
    }

    setSelectedZone(zone) {
        this.selectedZone = zone;
    }

    createJobsite() {
        this.errorMsg = '';
        this.successMsg = '';
        if (this.child.validateForm()) {
            if (this.userState.program.programSFId) {
                if (this.selectedZone !== undefined) {
                    const reqObj = {
                        masterProgram: this.userState.program.programSFId,
                        Account__c: this.selectedAccountId,
                        City__c: this.child.newForm.City,
                        GEO_Metro__c: this.selectedZone.sfdcId,
                        Country__c: this.child.newForm.countryid,
                        Street__c: this.child.newForm.Street,
                        State__c: this.child.newForm.stateid,
                        Zip__c: this.child.newForm.ZipCode,
                        Jobsite_Status__c: 'Active'
                    };
                    this._preloaderService.showPreloader();
                    this._jobsiteApi.createNewJobsite(reqObj).subscribe(
                        result => {
                            this.existingJobList = true;
                            if (result.data && result.data.status == 200) {
                                this.successMsg = 'Jobsite created successfully. Latest creation will be available after 5 minutes.';
                            }
                            this._preloaderService.hidePreloader();
                        },
                        err => {
                            console.log(err);
                            this.errorMsg = 'Jobsite creation failed. Please try again later.';
                            this._preloaderService.hidePreloader();
                        }
                    );
                } else {
                    // No service zone selected case
                    this.errorMsg = 'Please select service zone.';
                }
            } else {
                // No service zone selected case
                this.errorMsg = 'Please select program.';
            }
        }
    }

    openUploadPage(content, _size, dataRow) {
        this._modalService.open(content, _size);
        this.contentData = dataRow;
    }
}
