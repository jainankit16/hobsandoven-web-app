import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { dispatchProfile } from '../../../../../shared/models/program/newprogram.class';

import { SharedService } from '../../../../../shared/services/pms/shared.services';
import { jobLocationMapService } from '../../../../../shared/services/pms/job-location.service';

@Component({
    selector: 'provider-option',
    templateUrl: './provider.component.html'
})

export class ProviderComponent implements OnInit {
    @Input() isActive: boolean;
    @Input() isInput = true;

    private isSchedule = false;
    providers: dispatchProfile[] = [];
    dataproviders: dispatchProfile[] = [];
    jobsites: any;
    jobTypeSelection = '1';
    coverageHoursData = ['Next Business Day, Business Hours (9H5D)', 'Same Day, Business Hours (DAY)', 'Same Day, After Hours (AFTH)',
        'Weekend Coverage (WKND)', 'Holiday Coverage (HLDY)', 'Full Day (24x7-DAY)'];

    constructor(
        public _sharedService: SharedService,
        private _jobLocationService: jobLocationMapService,
        private _location: Location
    ) {
        this.isSchedule = (_location.path().indexOf('schedule') !== -1) ? true : false;
    }

    ngOnInit() {
        if (this.isActive) {
            this._sharedService.getDispatchProfile().subscribe(data => {
                this.providers = (Object.keys(data).length > 0) ? data : [];
            });
        }

        if (!this.isSchedule) {
            this._sharedService.getQuoteLineObj().take(1).subscribe(data => {
                this.setProviderInfo(data);
            });
        } else {
            this._sharedService.getFilteredQuoteLineObj().subscribe(data => {
                this.providers = [];
                this.setProviderInfo(data);
            });
        }

        /* Get updated data frmo DispatchProfile
          For compairision provider option
       */
        this._sharedService.getSelectedProfile().subscribe(data => {
            this.dataproviders = data;
        });
    }

    setProviderInfo(data) {
        if (data && data.length > 0) {
            this.jobsites = data;
            this.autoSelectProvider();
        }
    }

    autoSelectProvider() {
        if (this.jobsites.length > 0 && !this.isActive) {
            this.jobsites.map((item, index) => {
                if (item.hasOwnProperty('TalentType')) {
                    let chr = ''
                    this.coverageHoursData.filter(chrs => {
                        if (chrs.indexOf(item.CoverageHour__c) !== -1) {
                            chr = chrs;
                        }
                    })
                    this.providers.push(new dispatchProfile(index, item.Jobsite.Jobsite_ID__c, item.TalentType.Talent_Type_Name__c,
                        item.Service_Engineer_Technical_Level__c, item.Dispatch_SLA_Priority__c, chr, item.Status__c,
                        item.Jobsite.GEO_Metro__c, item.Jobsite.GeoMetro.Country__c, item.Jobsite.sfdcId, item.TalentType.sfdcId,
                        item.Vendor_Account__c, item.Vendor__c, item.Service_Type__c));
                }
            });
            this._sharedService.setDispatchProfile(this.providers);
        }
    }

    selectProvider(provider) {
        this._sharedService.setAllProviders([], true);
        provider['isSelected'] = true;
        this._sharedService.setSelectedProfile(provider);
    }
}
