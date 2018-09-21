import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { PreloaderService } from '../../../../../shared/services/preloader.service';
import { SharedService } from '../../../../../shared/services/pms/shared.services';
import { QuoteService } from '../../../../../shared/services/pms/quote.service';
import { MetroVirtualVendorPoolApi } from '../../../../../shared/sdk/services/custom/MetroVirtualVendorPool';
import { OrderBy } from '../../../../../shared/pipe/order/orderby.pipe';

@Component({
    selector: 'provider-global',
    templateUrl: './provider-global.component.html'
})

export class ProviderGlobalComponent implements OnDestroy, OnInit {

    @Input('canSelect') canSelect = true;
    globalProfiles: any = [];
    selectedProfile: any;
    providerProfiles: any;
    providerAll: any = [];
    private subscription: Subscription;
    constructor(
        private _preloaderService: PreloaderService,
        private _metroVirtualVendorPoolApi: MetroVirtualVendorPoolApi,
        private _sharedservice: SharedService,
        private _quoteService: QuoteService,
        private _location: Location
    ) { }

    ngOnInit() {
        this.subscription = this._sharedservice.getDispatchProfile().subscribe(data => {
            this.providerProfiles = data;
        });
        const subscription = this._sharedservice.getSelectedProfile().subscribe(data => {
            this.globalProfiles = [];
            this.selectedProfile = {};
            if (data && data.jobsite) {
                this.selectedProfile = data;
                this.getGlobalProfiles();
            }
        });
        this.subscription.add(subscription);
    }

    onSelectServiceProvider(data) {
        if (this.providerProfiles && this.providerProfiles.length > 0) {
            this.providerProfiles.map(item => {
                if (item.id === this.selectedProfile.id) {
                    item['provider'] = data;
                    item['vendorID'] = data.sfdcId;
                    item['vendorAccountID'] = data.Vendor__c;
                    if (this._location.path().indexOf('pricing') !== -1) {
                        this._quoteService.getProvidersLocations(item['provider'].Vendor__c)
                    }
                }
            });
            this._sharedservice.setServiceProvider(this.providerProfiles);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getGlobalProfiles() {
        if (this.selectedProfile && this.selectedProfile.jobsiteSFID && this.selectedProfile.serviceZone && this.selectedProfile.talentTypeID && this.selectedProfile.slaPriority
            && this.selectedProfile.technicalLevel) {
            const paramObj = {
                'jobsiteId': this.selectedProfile.jobsiteSFID,
                'where': { 'GEO_Metro__c': { 'inq': [this.selectedProfile.serviceZone] } }
            };
            this._preloaderService.showPreloader();
            this._metroVirtualVendorPoolApi.getGlobalProvidersData(paramObj).subscribe(
                data => {
                    const profiles = [];
                    if (data.providers) {
                        data.providers.map((item, index) => {
                            item['Match'] = '';
                            if (item['TalentType'].Talent_Type_Name__c && this.selectedProfile.talentType &&
                                item['TalentType'].Talent_Type_Name__c.indexOf(this.selectedProfile.talentType) !== -1) {
                                item['Match'] = item['Match'] + 'T';
                            }
                            if (item['Service_Technical_Level__c'] && this.selectedProfile.technicalLevel &&
                                item['Service_Technical_Level__c'].indexOf(this.selectedProfile.technicalLevel) !== -1) {
                                item['Match'] = item['Match'] + 'L';
                            }
                            if (item['SLA__c'] && this.selectedProfile.slaPriority) {
                                let sla = this.selectedProfile.slaPriority;
                                sla = sla.substr(4).replace(')', '');
                                if (item['SLA__c'].indexOf(sla) !== -1) {
                                    item['Match'] = item['Match'] + 'P';
                                }
                            }
                            switch (item['Match']) {
                                case 'TLP':
                                    item['Class'] = 'green';
                                    item['sortKey'] = 0;
                                    break;
                                case 'TL':
                                    item['Class'] = 'blue';
                                    item['sortKey'] = 1;
                                    break;
                                case 'T':
                                    item['Class'] = 'grey';
                                    item['sortKey'] = 2;
                                    break;
                                default: {
                                    item['Class'] = 'other'
                                    item['sortKey'] = 3;
                                    item['Match'] = 'none'
                                    break;
                                }
                            }
                            if (this.selectedProfile.vendorID && item['sfdcId'] === this.selectedProfile.vendorID) {
                                item['isSelected'] = true;
                                this.onSelectServiceProvider(item);
                            } else {
                                item['isSelected'] = false;
                            }
                            profiles.push(item);
                            if (item.account) {
                                this.providerAll.push(item.account);
                            }
                        });
                        this._sharedservice.setAllProviders(this.providerAll, false);
                        this.globalProfiles = new OrderBy().transform(profiles, ['sortKey']);
                    }
                    this._preloaderService.hidePreloader();
                },
                err => {
                    console.log(err);
                    this._preloaderService.hidePreloader();
                }
            );
        }
    }
}