import { Component, OnInit } from '@angular/core';
import { PurchaseOrderApi, TimecardApi } from './../../../../../../../sdk';
import { PreloaderService } from './../../../../../../../services/preloader.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../../../../../services/pms/shared.services';

@Component({
    selector: 'app-time-card-info',
    templateUrl: './time-card.component.html',
    styleUrls: ['./time-card.component.css']
})
export class TimeCardInfoComponent implements OnInit {

    timeCard: any;
    caseId: any;
    constructor(
        private _purchaseOrderApi: PurchaseOrderApi,
        private _timecardApi: TimecardApi,
        private _activatedRoute: ActivatedRoute,
        private _preloader: PreloaderService,
        private _sharedService: SharedService
    ) { }

    ngOnInit() {
        this.getCaseSfdcId();
    }


    getCaseSfdcId() {
        this._activatedRoute.params.subscribe(params => {
            this.timeCard = [];
            window.scroll(0, 0);
            this._sharedService.getUserState().subscribe(res => {
                if (res &&
                    res['servicemanager'] &&
                    res['servicemanager']['case'] &&
                    res['servicemanager']['case']['sfdcId']
                ) {
                    this.caseId = res['servicemanager']['case']['sfdcId'];
                    this.getPurchaseOrderDetails();
                }
            });
        });
    }
    getPurchaseOrderDetails() {
        this._preloader.showPreloader();
        if (this.caseId) {
            this._purchaseOrderApi.find({
                'where': { CaseId: this.caseId },
                'fields': ['sfdcId']
            }).subscribe(
                res => {
                    if (res.length > 0) {
                        this.getTimeCardDetails(res[0]['sfdcId'])
                    } else {
                        this._preloader.hidePreloader();
                    }
                },
                err => {
                    this._preloader.hidePreloader();

                }
            );
        }
    }
    getTimeCardDetails(purchaseOrderId) {
        this._timecardApi.find({
            'where': { Purchase_Order_Ref__c: purchaseOrderId },
            'fields': [
                'id', 'Name', 'RecordTypeId', 'Timesheet_Week_Number_ISO_Auto__c', 'Customer_Approval_Status__c',
                'Status__c', 'Vendor__c', 'Worker__c', 'Total_Worked_Hours__c', 'Total_Worked_Hours_Without_Offset__c',
            ],
            'include': [
                { 'relation': 'worker', 'scope': { 'fields': ['Name'] } },
                { 'relation': 'vendor', 'scope': { 'fields': ['Name'] } }
            ]
        }).subscribe(
            res => {
                if (res.length > 0) {
                    this.timeCard = res[0];
                }
                this._preloader.hidePreloader();
            },
            err => {
                this._preloader.hidePreloader();
            });
    }

}
