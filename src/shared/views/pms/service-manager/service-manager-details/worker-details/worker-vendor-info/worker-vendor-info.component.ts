import { Component, OnInit, Input } from '@angular/core';
import { PreloaderService } from './../../../../../../services/preloader.service';
import { CaseApi } from './../../../../../../sdk';

@Component({
    selector: 'worker-vendor-info',
    templateUrl: './worker-vendor-info.component.html',
    styleUrls: ['./worker-vendor-info.component.css']
})

export class WorkerVendorInfoComponent implements OnInit {

    @Input() page: string;
    @Input() caseId: string;
    vendorInfo: any;

    constructor(
        private _caseApi: CaseApi,
        private _preloaderService: PreloaderService
    ) { }

    ngOnInit() {
        if (this.caseId) {
            window.scroll(0, 0);
            this.getVendorInfo(this.caseId);
        }
    }

    getVendorInfo(caseId) {
        this._preloaderService.showPreloader();
        this._caseApi.find({
            where: { id: caseId },
            fields: ['Dispatch_Worker__c'],
            include: [{
                relation: 'worker',
                scope: {
                    fields: ['Vendorsite__c'],
                    include: [
                        {
                            relation: 'vendorsite',
                            scope: {
                                fields: ['Vendor__c'],
                                include: [
                                    {
                                        relation: 'Account',
                                        scope: {
                                            fields: ['Name', 'ShippingStreet', 'ShippingCity', 'ShippingState', 'ShippingCountry',
                                                'Default_Pricelist__c', 'Webcase_Account_Name__c', 'Service_Global_Ref__c'],
                                            include: [
                                                {
                                                    relation: 'pricelist',
                                                    scope: {
                                                        fields: ['Name']
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }]
        }).subscribe(
            res => {
                if (res && res.length) {
                    this.vendorInfo = res[0];
                }
                this._preloaderService.hidePreloader();

            }, err => {
                this._preloaderService.hidePreloader();
            })


    }

}
