import { Component, Input, AfterContentChecked, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { PreloaderService } from '../../../../../shared/services/preloader.service';
import { SharedService } from '../../../../../shared/services/pms/shared.services';
import { jobLocationMapService } from '../../../../../shared/services/pms/job-location.service';
import { ProductApi, PricelistItemApi, AccountApi } from '../../../../../shared/sdk';

@Component({
    selector: 'quote-pricing',
    templateUrl: './quote-pricing.component.html'
})

export class QuotePricingComponent implements AfterContentChecked, OnInit, OnDestroy {

    @Input() name: string
    pricingListPerJobsites = [];
    total = 0;
    isSchedule = false;
    errorMessage = '';
    private subscription: Subscription;

    constructor(
        private _jobLocationService: jobLocationMapService,
        public router: Router,
        private _location: Location,
        private _priceListitemService: PricelistItemApi,
        private _sharedservice: SharedService,
        private _accountService: AccountApi,
        private _productService: ProductApi,
        private _preloaderService: PreloaderService
    ) {
        this.isSchedule = (_location.path().indexOf('schedule') !== -1) ? true : false;
    }

    ngOnInit() {
        if (!this.isSchedule) {
            this.subscription = this._sharedservice.getQuoteLineObj().subscribe(data => {
                this.setPricingData(data);
            });
        } else {
            this.subscription = this._sharedservice.getFilteredQuoteLineObj().subscribe(data => {
                this.setPricingData(data);
            });
        }
    }

    setPricingData(data) {
        if (data && data.length) {
            this.errorMessage = '';
            this.pricingListPerJobsites = data;
            this.findProductForQuoteLine(this.pricingListPerJobsites);
        } else {
            this.pricingListPerJobsites = [];
            this.errorMessage = 'No record found.';
        }
    }

    ngAfterContentChecked() {
        this.computeTotalPrice(); // Calculates Total price
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    selectPPMHours(e, index, obj) {
        this.findPriceListItemForPartner(obj, index, e);
    }

    computeTotalPrice() {
        this.total = 0;
        if (this.pricingListPerJobsites && this.pricingListPerJobsites.length) {
            this.pricingListPerJobsites.forEach(element => {
                this.total = this.total + (element.Price__c ? element.Price__c : 0);
            });
        }
    }

    findProductForQuoteLine(array) {
        this.pricingListPerJobsites = [];
        array.forEach((obj, index) => {
            const chrsPos = (obj.Dispatch_SLA_Priority__c) ? obj.Dispatch_SLA_Priority__c.indexOf('(') : '';
            const chrs = (obj.Dispatch_SLA_Priority__c) ? obj.Dispatch_SLA_Priority__c.substr(chrsPos + 1) : '';
            this._productService
                .find({
                    where: {
                        GEO_Country__c: obj.Jobsite.GeoMetro.GEO_Country__c,
                        Talent_Type__c: obj.Talent_Type__c,
                        Coverage_Hours__c: obj.CoverageHour__c,
                        Service_Technical_Level__c: obj.Service_Engineer_Technical_Level__c,
                        SLA__c: (chrs) ? chrs.replace(')', '') : '',
                        IsActive: true
                    }
                })
                .subscribe(
                data => {
                    if (data && data.length > 0) {
                        // this.pricingListPerJobsites[index].Product = data[0];
                        obj['Product'] = data[0];
                        this.pricingListPerJobsites = array;
                    }
                },
                error => {
                    console.log('Error fetching product>>', error.message);
                }
                );
        });
    }

    findPriceListItemForPartner(obj, index, event) {
        // console.log('findPriceListItemForPartner calleddd');
        if (obj.Product && obj.Product.sfdcId && obj.Jobsite && obj.Jobsite.account && obj.Jobsite.account.pricelist
            && obj.Jobsite.account.pricelist.sfdcId) {
            this._preloaderService.showPreloader()
            this._priceListitemService
                .findOne({
                    where: {
                        Product2Id: obj.Product.sfdcId,
                        Pricebook2Id: obj.Jobsite.account.pricelist.sfdcId
                    }
                })
                .subscribe(
                data => {
                    let price;

                    switch (event.target.value) {
                        case '1':
                            price = data['PPE_1HR_Standard_Price__c'];
                            break;
                        case '2':
                            price = data['PPE_2HR_Standard_Price__c'];
                            break;
                        case '3':
                            price = data['PPE_3HR_Standard_Price__c'];
                            break;
                        case '4':
                            price = data['PPE_4HR_Standard_Price__c'];
                            break;
                        case '8':
                            price = data['PPE_8HR_Standard_Price__c'];
                            break;
                        default:
                            price = 0;
                    }
                    this.pricingListPerJobsites[index].Price__c = price ? price : 0;
                    if (price === null) {
                        this.pricingListPerJobsites[index].Class = 'red'
                    } else {
                        this.pricingListPerJobsites[index].Class = ''
                    }

                    // For Vendor
                    this.findPriceListItemForVendor(obj, index, event);
                    this.computeTotalPrice(); // updates Total price
                    this._preloaderService.hidePreloader()
                },
                error => {
                    console.log('Error fetching price item entry>>', error.message);
                    this._preloaderService.hidePreloader()
                }
                );
        } else {
            this._preloaderService.hidePreloader()
            this.pricingListPerJobsites[index].Price__c = 0;
        }

    }

    findPriceListItemForVendor(obj, index, event) {
        // console.log('findPriceListItemForVendor calleddd');
        this._accountService
            .findOne({
                where: {
                    sfdcId: obj.Vendor_Account__c
                },
                include: ['pricelist']
            })
            .subscribe(
            data => {
                //  console.log(data);
                if (obj.Product && obj.Product.sfdcId && data['pricelist'] && data['pricelist'].sfdcId) {
                    this._priceListitemService
                        .findOne({
                            where: {
                                Product2Id: obj.Product.sfdcId,
                                Pricebook2Id: data['pricelist'].sfdcId
                            }
                        })
                        .subscribe(
                        data2 => {
                            let price;

                            switch (event.target.value) {
                                case '1':
                                    price = data2['PPE_1HR_Standard_Price__c'];
                                    break;
                                case '2':
                                    price = data2['PPE_2HR_Standard_Price__c'];
                                    break;
                                case '3':
                                    price = data2['PPE_3HR_Standard_Price__c'];
                                    break;
                                case '4':
                                    price = data2['PPE_4HR_Standard_Price__c'];
                                    break;
                                case '8':
                                    price = data2['PPE_8HR_Standard_Price__c'];
                                    break;
                                default:
                                    price = 0;
                            }
                            this.pricingListPerJobsites[index].Vendor_Cost__c = price
                                ? price
                                : 0;
                            this.calculateProfitPrice(index);         // Calculates Profit Price
                        },
                        error => {
                            console.log(
                                'Error fetching price entry for vendor>>',
                                error.message
                            );
                        }
                        );
                }
            },
            error => {
                console.log( 'Error fetching vendor account details >>', error.message);
            }
            );
    }

    calculateProfitPrice(index) {
        this.pricingListPerJobsites[index].Profit_Price__c =
            (this.pricingListPerJobsites[index].Price__c -
                this.pricingListPerJobsites[index].Vendor_Cost__c);
    }

}
