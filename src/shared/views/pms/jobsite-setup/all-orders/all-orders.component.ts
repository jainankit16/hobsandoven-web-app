import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateJobsiteComponent } from '../../../../pms-components/create-jobsite/create-jobsite.component';

import { SharedService } from '../../../../services/pms/shared.services';
import { AppStateService } from '../../../../services/app-state.service';
import { PreloaderService } from '../../../../services/preloader.service';

import { JobsiteApi, GeoMetroApi } from '../../../../sdk';

@Component({
    selector: 'all-orders',
    templateUrl: './all-orders.component.html',
    styleUrls: ['./all-orders.component.css']
})

export class AllOrdersComponent implements OnInit, OnDestroy {

    selectedAccountId: string;
    // To get method  and form data sharing
    @ViewChild(CreateJobsiteComponent) child: CreateJobsiteComponent;
    jobTypeSelection: string;
    programSelected: boolean;
    userState: any;
    selectedProgram: any;
    filteredServiceZones = [];
    serviceZones = [];
    selectedServiceZone: any;
    successMsg: string;
    errorMsg: string;
    jobsiteCount = 0;
    searchedEmpty = false;

    constructor(
        private _modalService: NgbModal,
        private _preloaderService: PreloaderService,
        private _sharedservice: SharedService,
        private _appState: AppStateService,
        private _geoMetroApi: GeoMetroApi,
        private _jobsiteApi: JobsiteApi
    ) {
        this._sharedservice.getUserState().subscribe(current => {
            this.userState = current;
            if (current.program && current.program.programSFId) {
                this.programSelected = true;
            } else {
                this.programSelected = false;
            }
        });
    }
    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        this.jobTypeSelection = 'jobsiteList';
        this.serviceZones = [];
        this.loadServiceZones();

    }
    ngOnDestroy() {
        this.userState.program = {};
        this._sharedservice.setUserState(this.userState);
    }

    /* Function that set type of creation Jobsite */
    updateJobsiteCount(value) {
        this.jobsiteCount = value
    }

    /* Function that set type of creation Jobsite */
    setJobsiteSelection(value) {
        this.serviceZones = [];
        this.jobTypeSelection = value;
    }

    /* Function execute when project is selected or change */
    onProjectSelected(project: any): void {
        // Setting project data for further use
        this.selectedProgram = project;

    }

    /* Functio to Load list of Geo metro */
    loadServiceZones() {
        this.filteredServiceZones = [];
        this.serviceZones = [];
        this._geoMetroApi.find().subscribe(
            data => {
                this.filteredServiceZones = data;
            },
            err => {
                console.log('Error loading service zones>>', err.message);
            }
        );
    }

    /*  Function is use to filter Service Zone base on create jobsite form selection */
    updateZones(filters) {
        this.searchedEmpty = false;
        this.serviceZones = [];
        // to filter country
        if (filters.data.countryid) {
            this.serviceZones = this.filteredServiceZones.filter(item => {
                return item.GEO_Country__c === filters.data.countryid;
            });
        } else {

        }
        // to filter state
        if (filters.data.stateid) {
            this.serviceZones = this.filteredServiceZones.filter(item => {
                return item.State_Province__c === filters.data.stateid;
            });
            this.serviceZones.length > 0 ? this.searchedEmpty = false : this.searchedEmpty = true;
        }
        // to filter zip Code
        if (filters.data.ZipCode) {
            this.serviceZones = this.serviceZones.filter(item => {
                return item.Postal_Zip_Code__c.toLowerCase() === filters.data.ZipCode.toLowerCase();
            });
            this.serviceZones.length > 0 ? this.searchedEmpty = false : this.searchedEmpty = true;
        }
        // to filter city
        if (filters.data.City) {
            this.serviceZones = this.serviceZones.filter(item => {
                return item.City__c.toLowerCase() === filters.data.City.toLowerCase();
            });
            this.serviceZones.length > 0 ? this.searchedEmpty = false : this.searchedEmpty = true;
        }
        // to filter street
        if (filters.data.Street) {
            this.serviceZones = this.serviceZones.filter(item => {
                if (item.Street__c) {
                    return item.Street__c.toLowerCase() === filters.data.Street.toLowerCase();
                }

            });
            this.serviceZones.length > 0 ? this.searchedEmpty = false : this.searchedEmpty = true;
        }

    }

    /*  Function is use to set Service Zone */
    setSelectedZone(zone) {
        this.selectedServiceZone = zone;
    }

    /*  Function is use to create new Jobsite */
    createJobsite() {
        this.errorMsg = '';
        this.successMsg = '';
        if (this.child.validateForm()) {
            if (this.userState.program.programSFId) {
                if (this.selectedServiceZone !== undefined) {
                    const reqObj = {
                        masterProgram: this.userState.program.programSFId,
                        Account__c: this.selectedAccountId,
                        City__c: this.child.newForm.City,
                        GEO_Metro__c: this.selectedServiceZone.sfdcId,
                        Country__c: this.child.newForm.countryid,
                        Street__c: this.child.newForm.Street,
                        State__c: this.child.newForm.stateid,
                        Zip__c: this.child.newForm.ZipCode,
                        Jobsite_Status__c: 'Active'
                    };
                    this._preloaderService.showPreloader();
                    this._jobsiteApi.createNewJobsite(reqObj).subscribe(
                        result => {
                            if (result.data.status == 200) {
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

    /* Open modal for al jobsite list  */
    open(content, _size) {
        this._modalService.open(content, { size: _size });
    }
}
