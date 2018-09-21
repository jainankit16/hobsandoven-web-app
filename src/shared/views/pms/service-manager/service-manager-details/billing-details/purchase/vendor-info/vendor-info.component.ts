import { Component, OnInit } from '@angular/core';
import { PurchaseOrderApi } from './../../../../../../../sdk';
import { PreloaderService } from './../../../../../../../services/preloader.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../../../../../services/pms/shared.services';

@Component({
    selector: 'app-vendor-info',
    templateUrl: './vendor-info.component.html',
    styleUrls: ['./vendor-info.component.css']
})
export class VendorInfoComponent implements OnInit {
    vendorData: any;
    caseId: any;
    constructor(
        private _purchaseOrderApi: PurchaseOrderApi,
        private _activatedRoute: ActivatedRoute,
        private _preloader: PreloaderService,
        private _sharedService: SharedService
    ) { }

    ngOnInit() {
        this.getCaseSfdcId();
    }
    getCaseSfdcId() {
        this._activatedRoute.params.subscribe(params => {
            window.scroll(0, 0);
            this.vendorData = [];
            this._sharedService.getUserState().subscribe(res => {
                if (res &&
                    res['servicemanager'] &&
                    res['servicemanager']['case'] &&
                    res['servicemanager']['case']['sfdcId']
                ) {
                    this.caseId = res['servicemanager']['case']['sfdcId'];
                    this.getVendorDetails();
                }
            });
        });
    }
    getVendorDetails() {
        this._preloader.showPreloader();
        if (this.caseId) {
            this._purchaseOrderApi.find({
                'where': { CaseId: this.caseId },
                'fields': ['Vendor__c'],
                'include': [
                    {
                        'relation': 'vendor',
                        'scope': {
                            'fields': [
                                'Name', 'Default_Pricelist__c', 'Service_Global_Ref__c', 'Webcase_Account_Name__c',
                                'RecordTypeId', 'ShippingStreet', 'ShippingCity', 'ShippingState', 'ShippingCountry',
                                'ShippingPostalCode', 'Shipping_country_Code__c'
                            ]
                        }
                    }
                ]
            }).subscribe(
                res => {
                    if (res.length > 0) {
                        this.vendorData = res[0]['vendor'] ? res[0]['vendor'] : [];
                    }
                    this._preloader.hidePreloader();
                },
                err => {
                    this._preloader.hidePreloader();

                }
            );
        }
    }
}
