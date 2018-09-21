import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { PreloaderService } from '../../../../../shared/services/preloader.service';
import { SharedService } from '../../../../../shared/services/pms/shared.services';
import { QuoteService } from '../../../../../shared/services/pms/quote.service';
import { ApprovedProjectVendorPoolApi } from '../../../../../shared/sdk/services/custom/ApprovedProjectVendorPool';

@Component({
    selector: 'provider-iron',
    templateUrl: './provider-iron.component.html'
})

export class ProviderIronComponent implements OnDestroy, OnInit {

    @Input('canSelect') canSelect = true;
    ironProfiles: any = [];
    selectedProfile: any;
    providerProfiles: any;
    providerAll: any = [];
    private subscription: Subscription;

    constructor(
        private _preloaderService: PreloaderService,
        private _approvedProjectVendorPool: ApprovedProjectVendorPoolApi,
        public _sharedservice: SharedService,
        private _quoteService: QuoteService,
        private _location: Location
    ) { }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    ngOnInit() {
        this.subscription = this._sharedservice.getDispatchProfile().subscribe(data => {
            this.providerProfiles = data;
        });
        const subscription = this._sharedservice.getSelectedProfile().subscribe(data => {
            this.ironProfiles = [];
            this.selectedProfile = {};
            if (data && data.jobsite) {
                this.selectedProfile = data;
                this.getIronProfiles();
            }
        });
        this.subscription.add(subscription);
    }

    onSelectServiceProvider(data) {
        this.providerProfiles.map(item => {
            if (item.id === this.selectedProfile.id) {
                item['provider'] = data;
                item['vendorID'] = data.Metro_Virtual_Vendor_Pool__c;
                item['vendorAccountID'] = data.Vendor__c;
                if (this._location.path().indexOf('pricing') !== -1) {
                    this._quoteService.getProvidersLocations(item['provider'].Vendor__c)
                }
            }
        });
        this._sharedservice.setServiceProvider(this.providerProfiles);
    }

    getIronProfiles() {
        if (this.selectedProfile && this.selectedProfile.country && this.selectedProfile.talentTypeID && this.selectedProfile.slaPriority
            && this.selectedProfile.technicalLevel) {
            const paramObj = {
                'where': {
                    'GEO_Country__c': this.selectedProfile.country,
                    'Talent_Type__c': this.selectedProfile.talentTypeID,
                    'Service_Dispatch_SLA_Priority__c': this.selectedProfile.slaPriority,
                    'Service_Technical_Level__c': this.selectedProfile.technicalLevel
                }
            };
            this._preloaderService.showPreloader();
            this._approvedProjectVendorPool.getIronProvidersData(paramObj).subscribe(
                data => {
                    if (data.providers) {
                        data.providers.map((item, index) => {
                            item['Class'] = 'green';
                            if (item['Metro_Virtual_Vendor_Pool__c'] === this.selectedProfile.vendorID) {
                                this.onSelectServiceProvider(item);
                                item['isSelected'] = true;
                            } else {
                                item['isSelected'] = false;
                            }
                            this.ironProfiles.push(item);
                            if (item.account) {
                                this.providerAll.push(item.account);
                            }
                        });
                        this._sharedservice.setAllProviders(this.providerAll, false);
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
