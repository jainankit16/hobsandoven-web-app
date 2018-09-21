import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { dispatchProfile } from '../../../../../../shared/models/program/newprogram.class';

import { PreloaderService } from '../../../../../../shared/services/preloader.service';
import { SharedService } from '../../../../../../shared/services/pms/shared.services';
import { jobLocationMapService } from '../../../../../../shared/services/pms/job-location.service';

import { MetroVirtualVendorPoolApi } from '../../../../../../shared/sdk/services/custom/MetroVirtualVendorPool';
import { Subscription } from 'rxjs';

@Component({
    selector: 'dispatch-profiles',
    templateUrl: './dispatch-profiles.component.html'
})

export class DispatchProfileComponent implements OnInit, OnDestroy {
    dispatchProfiles: dispatchProfile[] = [];
    selectedJobsites: any;
    quoteLineObj: any;
    filterBy = 'Active';
    ttypes: any = {};
    tlevels: any = {};
    slas: any = {};
    coverageHours: any = {};
    coverageHoursData = ['Next Business Day, Business Hours (9H5D)', 'Same Day, Business Hours (DAY)', 'Same Day, After Hours (AFTH)',
        'Weekend Coverage (WKND)', 'Holiday Coverage (HLDY)', 'Full Day (24x7-DAY)'];
    private subscription: Subscription;

    constructor(
        private _jobLocationService: jobLocationMapService,
        private _sharedService: SharedService,
        private _preloaderService: PreloaderService,
        private _metroVirtualVendorPoolApi: MetroVirtualVendorPoolApi,
        private _cd: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.subscription = this._jobLocationService.getSelectedLocations().subscribe(data => {
            if (data.length > 0) {
                this.selectedJobsites = data;
                this.checkDispatchProfiles();
            }
        });
        const subscription = this._sharedService.getQuoteLineObj().take(1).subscribe(data => {
            if (data.length > 0) {
                this.quoteLineObj = data;
            }
        });
        this.subscription.add(subscription);
        this.addRow(0);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this._sharedService.setQuoteLineObj([]);
            this._sharedService.setSelectedProfile([]);
        }
    }

    checkDispatchProfiles() {
        if (this.quoteLineObj && this.quoteLineObj.length) {
            let jobsites = [];
            this.selectedJobsites.map(item => {
                jobsites.push(item.Jobsite.Jobsite_ID__c);
            });
            this.dispatchProfiles = this.dispatchProfiles.filter(item => {
                if (jobsites.indexOf(item.jobsite) !== -1) {
                    return item;
                }
            })
            if (this.dispatchProfiles && this.dispatchProfiles.length === 0 && this.selectedJobsites.length) {
                this._sharedService.setQuoteLineObj([]);
                this._sharedService.setSelectedProfile([]);
                this.dispatchProfiles.push(new dispatchProfile(0, '', '', '', '', '', 'Active', '', '', '', '', '', '', ''));
            }
            if (!this._cd['destroyed']) {
                this._cd.detectChanges();
            }
            this.updateDispatchProfiles();
        }
    }

    addRow(id: number) {
        if (this.quoteLineObj && this.quoteLineObj.length > 0 && id === 0) {
            this.dispatchProfiles = [];
            this.quoteLineObj.map((item, index) => {
                if (item.hasOwnProperty('TalentType')) {
                    let chr = ''
                    this.coverageHoursData.filter(chrs => {
                        if (chrs.indexOf(item.CoverageHour__c) !== -1) {
                            chr = chrs;
                        }
                    });
                    this.dispatchProfiles.push(
                        new dispatchProfile(index, item.Jobsite.Jobsite_ID__c, item.TalentType.Talent_Type_Name__c,
                            item.Service_Engineer_Technical_Level__c, item.Dispatch_SLA_Priority__c, chr, item.Status__c,
                            item.Jobsite.GEO_Metro__c, item.Jobsite.GeoMetro.Country__c, item.Jobsite.sfdcId, item.TalentType.sfdcId,
                            item.Vendor_Account__c, item.Vendor__c, item.Service_Type__c)
                    );
                    this.loadTalentType(item.Jobsite.Jobsite_ID__c, index);
                } else {
                    if (!this.dispatchProfiles.length) {
                        this.dispatchProfiles.push(new dispatchProfile(id, '', '', '', '', '', 'Active', '', '', '', '', '', '', ''));
                    }
                }
            });
            this._sharedService.setSelectedProfile(this.dispatchProfiles[0]);
        } else {
            this.dispatchProfiles.push(new dispatchProfile(id, '', '', '', '', '', 'Active', '', '', '', '', '', '', ''));
        }
        this.updateDispatchProfiles();
    }

    getActiveNavBarStatus(choice: string) {
        if (this.filterBy === choice) {
            return true;
        } else {
            return false;
        }
    }


    deleteRow(id: number, profile) {
        this._sharedService.getSelectedProfile().subscribe(selectedProfile => {
            if (profile === selectedProfile) {
                this._sharedService.setSelectedProfile({});
            }
        });
        let index = 0;
        for (let i = 0; i < this.dispatchProfiles.length; i++) {
            if (this.dispatchProfiles[i]['id'] === id) {
                index = i;
                break;
            }
        }
        this.dispatchProfiles.splice(index, 1);
        this.updateDispatchProfiles();
        if (!this._cd['destroyed']) {
            this._cd.detectChanges();
        }
    }

    updateDispatchProfiles() {
        if (!this._cd['destroyed']) {
            this._cd.detectChanges();
        }
        this._sharedService.setDispatchProfile(this.dispatchProfiles);
    }

    clearDispatchDropdowns(index) {
        this.dispatchProfiles[index].coverageHrs = '';
        this.dispatchProfiles[index].slaPriority = '';
        this.dispatchProfiles[index].technicalLevel = '';
        this.dispatchProfiles[index].talentType = '';
        this.dispatchProfiles[index].talentTypeID = '';
    }

    setInitialValuesForDropdown(index) {
        this.dispatchProfiles[index].coverageHrs = '';
        this.dispatchProfiles[index].slaPriority = '';
        this.dispatchProfiles[index].technicalLevel = '';
        this.dispatchProfiles[index].talentType = '';
    }

    resetDropdowns(jobName) {
        this.ttypes[jobName] = [];
        this.tlevels[jobName] = [];
        this.slas[jobName] = [];
        this.coverageHours[jobName] = [];
    }

    loadTalentType(e, index) {
        let jobName = '';
        if (e.target !== undefined) {
            jobName = e.target.value;
            this.selectedJobsites.filter(item => {
                if (item.Jobsite.Jobsite_ID__c === e.target.value) {
                    this.dispatchProfiles[index].serviceZone = item.Jobsite.GEO_Metro__c;
                    this.dispatchProfiles[index].jobsiteSFID = item.Jobsite.sfdcId;
                    this.setInitialValuesForDropdown(index)
                }
            });
            this.clearDispatchDropdowns(index);
        } else {
            jobName = e;
        }

        this._preloaderService.showPreloader();
        const reqObj = {
            'geoMetroID': this.dispatchProfiles[index].serviceZone
        };
        this._metroVirtualVendorPoolApi.getDropdownValues(reqObj).subscribe(
            data => {
                this.resetDropdowns(jobName);
                let tTypes = [];
                if (data.data && Object.keys(data.data).length) {
                    data = data.data;
                    tTypes = data['TalentTypes'];
                    this.tlevels[jobName] = data['TechnicalLevels'];
                    this.slas[jobName] = data['SLAs'];
                    this.coverageHours[jobName] = data['CoverageHours'];

                    if (tTypes.length) {
                        let exists = false;
                        tTypes.forEach(item1 => {
                            exists = false;
                            this.ttypes[jobName].forEach(item2 => {
                                if (item1['Talent_Type_Name__c'] === item2['Talent_Type_Name__c']) {
                                    exists = true;
                                }
                            });
                            if (!exists) {
                                this.ttypes[jobName].push(item1);
                            }
                        });
                    }
                }
                if (e.target && e.target.value === '') {
                    this.resetDropdowns(jobName);
                }
                this._preloaderService.hidePreloader();
            },
            err => {
                this._preloaderService.hidePreloader();
            }
        );

    }

    updateTalentType(e, profile) {
        let index = -1;
        this.dispatchProfiles.map((item, i) => {
            if (item.id === profile.id) {
                index = i;
                return;
            }
        });
        if (index > -1) {
            this.dispatchProfiles[index].talentType = e.target.selectedOptions[0].text;
        }
        this.updateDispatchProfiles();
    }

    changeTab(status) {
        this.filterBy = status;
        if (!this._cd['destroyed']) {
            this._cd.detectChanges();
        }
    }
}
