import { Component, OnInit } from '@angular/core';
import { PurchaseOrderApi } from './../../../../../../../sdk';
import { PreloaderService } from './../../../../../../../services/preloader.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../../../../../services/pms/shared.services';

@Component({
    selector: 'app-purchase-order',
    templateUrl: './purchase-order.component.html',
    styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

    order: any;
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
            this.order = [];
            window.scroll(0, 0);
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
                'fields': ['AccountId', 'Project__c', 'CaseId', 'Jobsite__c', 'Service_Dispatch__c', 'Sales_Order__c',
                    'Vendor__c,', 'Sales_Order__c', 'WorkOrderNumber'],
                'include': [
                    { 'relation': 'job', 'scope': { 'fields': ['Name'] } },
                    { 'relation': 'case', 'scope': { 'fields': ['CaseNumber'] } },
                    { 'relation': 'order', 'scope': { 'fields': ['Name'] } },
                    { 'relation': 'vendor', 'scope': { 'fields': ['Name'] } },
                    { 'relation': 'project', 'scope': { 'fields': ['Name'] } },
                    { 'relation': 'account', 'scope': { 'fields': ['Name'] } },
                    { 'relation': 'jobsite', 'scope': { 'fields': ['Name'] } }
                ]
            }).subscribe(
                res => {
                    if (res.length > 0) {
                        this.order = res[0];
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
