import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UniquePipe } from '../../../../../../shared/pipe/unique/unique.pipe';

import { AppStateService } from '../../../../../../shared/services/app-state.service';
import { PreloaderService } from '../../../../../../shared/services/preloader.service';
import { SharedService } from '../../../../../../shared/services/pms/shared.services';

import { JobsiteProjectsApi, ApprovedProjectVendorPoolApi, JobsiteApi, ProjectApi } from '../../../../../../shared/sdk';

@Component({
    selector: 'compliance',
    templateUrl: './compliance.component.html',
    styleUrls: ['./compliance.component.css']
})

export class ComplianceComponent implements OnInit {

    selectedAccountId: string;
    @Input() query: string;
    /* Variable Initializing */
    queryString: any;
    jobsites: any; // Hold Jobsites list
    jobsiteList: any; // Hold Jobsite list after data manipulation
    vendorData: any = [];
    contentData: any;
    private programs: any;
    private programSFDCID: any;
    errorMessage: string;

    constructor(
        private modalService: NgbModal,
        private _uniquePipe: UniquePipe,
        private _preloaderService: PreloaderService,
        private _appState: AppStateService,
        private _sharedservice: SharedService,
        private _jobsiteProjectsApi: JobsiteProjectsApi,
        private _jobsiteApi: JobsiteApi,
        private _approvedProjectVendorPoolApi: ApprovedProjectVendorPoolApi,
        private _projectApi: ProjectApi
    ) { }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        switch (this.query) {
            case '3PS':
                this.queryString = {
                    Vendor_Type__c: '3PS'
                }
                break;
            case '3PL':
                this.queryString = {
                    or: [
                        { Vendor_Type__c: '3PL' },
                        { Vendor_Type__c: '3PL/FSL' }
                    ]
                }
                break;
            case 'BOTH':
                this.queryString = {
                    or: [
                        { Vendor_Type__c: '3PL' },
                        { Vendor_Type__c: '3PL/FSL' },
                        { Vendor_Type__c: '3PS' }
                    ]
                }
                break;
        }

        /* Showing pre loader gif */
        this._preloaderService.showPreloader();
        /* loading jobsite on load of health check tab */
        this._sharedservice.getUserState().subscribe(current => {
            let accountId;
            accountId = (current.partner) ? current.partner.sfdcId : '';
            if (accountId) {
                this._appState.setSelectedAccount(accountId);
            } else if (this.selectedAccountId) {
                accountId = this.selectedAccountId;
            }
            this.jobsiteList = [];
            /* To get program details from service instance */
            const req = {
                'accountId': accountId,
                'fields': ['CreatedDate', 'Name', 'sfdcId', 'Project__c', 'Service_Technical_Level__c', 'Service_Dispatch_SLA_Priority__c',
                    'Talent_Type__c', 'Customer_Service_Type__c']
            }
            this._projectApi.getMasterProjects(req).subscribe(
                data => {
                    if (data.programs && data.programs.length > 0) {
                        this.programs = data.programs;
                        this.programSFDCID = [];
                        // gathering all Program List
                        this.programs.forEach(element => {
                            this.programSFDCID.push(element['sfdcId']);
                        });
                        // passing projects sfdcId to get all jobsites
                        if (this.programSFDCID.length > 0) {
                            this.loadJobsites(this.programSFDCID);
                        } else {
                            this.setErrorMessage();
                        }
                    } else {
                        this.setErrorMessage();
                    }
                },
                error => {
                    console.log('Error fetching states>>', error.message);
                });
        });
    }

    /**
     *
     * @param programId
     */
    loadJobsites(programId) {
        if (programId) {
            /* Loader start */
            // loading jobsite for listing and for jobsite detail page 
            this._preloaderService.showPreloader();
            const req = {
                // passing Master Program sfdcId
                'programId': programId,
                fields: ['GEO_Metro__c', 'Jobsite_ID__c', 'Name', 'Country__c', 'State__c', 'Zip__c', 'City__c', 'Street__c',
                    'Jobsite_Description__c', 'Jobsite_Status__c', 'geolocation__Latitude__s', 'geolocation__Longitude__s', 'Type__c',
                    'Jobsite_Approval_Status__c', 'sfdcId', 'Jobsite__c', 'Jobsite_Key_Contact__c', 'id', 'Account__c'],
                // relation passed to get contact details of jobsite
                source: 'list-jobsites-contact',
            }
            this._jobsiteApi.getJobsitesByMasterProject(req).subscribe(current => {
                if (current && current.data.jobsites) {
                    this.jobsites = current.data.jobsites;
                    // filtering out duplicate jobsite having same Geo metro sfdcId
                    this.jobsites = this._uniquePipe.transform(
                        this.jobsites,
                        'GEO_Metro__c'
                    );
                    // Building up jobsite contact information into a json object
                    this.jobsites.forEach(item => {
                        if (
                            item.hasOwnProperty('jobsiteContacts') &&
                            item['jobsiteContacts'].length > 0
                        ) {
                            item['jobsiteContacts'].forEach(value => {
                                switch (value['Jobsite_Contact_Type__c']) {
                                    case 'Customer Site (Technical Escalation)':
                                        value['contact']
                                            ? (item['technicalEscalationCS'] = value['contact'])
                                            : (item['technicalEscalationCS'] = {});
                                        break;
                                    case 'Customer Site (Admin Escalation)':
                                        value['contact']
                                            ? (item['adminEscalationCS'] = value['contact'])
                                            : (item['adminEscalationCS'] = {});
                                        break;
                                    case 'Customer Site (Service Desk)':
                                        value['contact']
                                            ? (item['serviceDeskCS'] = value['contact'])
                                            : (item['serviceDeskCS'] = {});
                                        break;
                                }
                            });
                        }
                    });
                    if (this.jobsites) {
                        // calling Complaince function to get records and their distance
                        this.getCompliances();
                    } else {
                        this.setErrorMessage();
                    }
                } else {
                    this.setErrorMessage();
                }
            },
                error => {
                    console.log('Error fetching jobsites>>', error.message);
                    this._preloaderService.hidePreloader();
                }
            );
        } else {
            // No program selected case
        }
    }

    /* get3psCompliances Function used to call Approved Project Vendor Pool Api to gather data based on unique jobsite (Geo Metro) */
    getCompliances() {
        this._preloaderService.showPreloader();
        // fetching Approved Project Vendor pool records based on Geom Metro of Jobsite
        this._approvedProjectVendorPoolApi
            .find({
                // Need to call Account Metro vendor pool relations records for approved vendor pool
                include: [
                    {
                        relation: 'account',
                        scope: {
                            fields: [
                                'geolocation__Latitude__s',
                                'geolocation__Longitude__s',
                                'geolocation__c',
                                'Name',
                                'LastModifiedById'
                            ],
                            where: this.queryString,
                        }
                    },
                    {
                        relation: 'MetroVirtualVendorPool',
                        scope: {
                            where: {
                                GEO_Metro__c: {
                                    inq: this.jobsites.map(element => {
                                        return element['GEO_Metro__c'];
                                    })
                                }
                            },
                            include: {
                                relation: 'GeoMetro',
                                scope: {
                                    fields: [
                                        'Name',
                                        'Geo_Location__Longitude__s',
                                        'Geo_Location__Latitude__s'
                                    ]
                                }
                            }
                        }
                    }
                ]
            })
            .subscribe(
                data => {
                    this.vendorData = [];
                    // getting approved project vendor pool unique records based on Metro Virtual Vendor Pool 
                    this.vendorData = this._uniquePipe.transform(
                        data, 'Metro_Virtual_Vendor_Pool__c'
                    );
                    data.forEach(value => {
                        /* Checking Account , metro vendor pool and Geo metro is present in list of jobsite */
                        if (value['account'] && value['MetroVirtualVendorPool']) {
                            // calling function to get distance between vendor and Jobsite location
                            // passing approved Project vendor records one by one.
                            this.mergeVendorJobsiteData(value);
                        }
                    })
                    this.jobsiteList = this._uniquePipe.transform(
                        this.jobsiteList,
                        'Jobsite_ID__c'
                    );

                    if (this.jobsiteList.length === 0) {
                        this.setErrorMessage();
                    } else {
                        this.errorMessage = '';
                    }
                },
                error => {
                    this._preloaderService.hidePreloader();
                }
            )
    }

    mergeVendorJobsiteData(vendor) {
        this.jobsites.forEach(item => {
            if (
                vendor['MetroVirtualVendorPool']['GEO_Metro__c'] === item['GEO_Metro__c']
            ) {
                item['vendor'] = vendor;
                /*  Building Account geo coordinate as a source for calculating distance   */
                if (
                    item['vendor']['account'] && item['vendor']['MetroVirtualVendorPool'] &&
                    item['vendor']['MetroVirtualVendorPool']['GeoMetro'] &&
                    item['vendor']['account']['geolocation__Latitude__s'] !== null &&
                    item['vendor']['account']['geolocation__Longitude__s'] !== null &&
                    item['geolocation__Latitude__s'] !== null && item['geolocation__Longitude__s'] !== null
                ) {
                    let dDepartLat = item['geolocation__Latitude__s'] * 3.14159 / 180;
                    let dDepartLong = item['geolocation__Longitude__s'] * 3.14159 / 180;
                    let dArrivalLat = item['vendor']['account']['geolocation__Latitude__s'] * 3.14159 / 180;
                    let dArrivalLong = item['vendor']['account']['geolocation__Longitude__s'] * 3.14159 / 180;
                    let dDeltaLong = dArrivalLong - dDepartLong;
                    let dDeltaLat = dArrivalLat - dDepartLat;
                    // calculate angle using the haversine formula
                    let dHaversineResult = ((Math.sin(dDeltaLat / 2)) * (Math.sin(dDeltaLat / 2)))
                        + (((Math.cos(dDepartLat)) * (Math.cos(dArrivalLat))) *
                            ((Math.sin(dDeltaLong / 2)) * (Math.sin(dDeltaLong / 2))));
                    // calculate distance by multiplying arc-tangent by the planet radius in miles
                    item['distance'] = 3958.76 * (2 * (Math.atan2(Math.sqrt(dHaversineResult), Math.sqrt(1 - dHaversineResult))));
                    // placing color code based on distance 
                    if (item['distance'] > 0 && item['distance'] < 50) {
                        item['color'] = 'lightgreen';
                        item['textColor'] = 'black';
                    } else if (
                        item['distance'] > 50 &&
                        item['distance'] < 100
                    ) {
                        item['color'] = 'orange';
                        item['textColor'] = 'black';
                    } else if (item['distance'] > 100) {
                        item['color'] = 'red';
                        item['textColor'] = 'white';
                    } else if (item['distance'] === 0) {
                        item['color'] = 'black';
                        item['textColor'] = 'white';
                    }
                } else {
                    // Condition handled when their is no lat long present in a record
                    item['distance'] = 0;
                    item['color'] = 'black';
                    item['textColor'] = 'white';
                }
                /* Building up list of jobsite with all data manipulation and distance calculated based on passed Geo coordinates */
                this.jobsiteList.push(item);
            }
        });
        this._preloaderService.hidePreloader();
    }
    openDetailPage(content, _size, dataRow) {
        this.contentData = dataRow;
        this.modalService.open(content, { size: _size });
    }
    setErrorMessage() {
        this.errorMessage = 'No ' + ((this.query === 'BOTH') ? '3PS/3PL' : this.query) + ' compliance available';
        this._preloaderService.hidePreloader();
    }
}
