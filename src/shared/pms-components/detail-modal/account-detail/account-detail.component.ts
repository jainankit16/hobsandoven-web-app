import { Component, OnInit, Input } from '@angular/core';
import { AccountApi } from '../../../sdk/services/custom/Account';
import { PreloaderService } from '../../../services/preloader.service';
@Component({
    selector: "account-detail",
    templateUrl: './account-detail.component.html'
})
export class AccountDetailComponent implements OnInit {

    @Input('account') account: any;
    accountDetails: any;

    constructor(
        private _accountApi: AccountApi,
        private _preloaderService: PreloaderService
    ) { }

    ngOnInit() {
        if (this.account['sfdcId']) {
            this.getAccountDetails(this.account['sfdcId']);
        }
    }

    getAccountDetails(accountId) {
        this._preloaderService.showPreloader();
        this.accountDetails = {};
        const paramObj = {
            'accountId': accountId,
            'fields': ['sfdcId', 'Name', 'Account_Number__c', 'Default_Pricelist__c', 'Master_Project__c', 'Webcase_Account_Name__c',
                'Service_Global_Ref__c', 'BillingStreet', 'ShippingStreet', 'BillingCity', 'ShippingCity', 'BillingState',
                'ShippingState', 'BillingCountry', 'ShippingCountry', 'BillingPostalCode', 'ShippingPostalCode',
                'Billing_country_Code__c', 'Shipping_country_Code__c'],
            'include': [
                {
                    relation: 'pricelist',
                    scope: {
                        fields: ['sfdcId', 'Name']
                    }
                },
                {
                    relation: 'program',
                    scope: {
                        fields: ['sfdcId', 'Name']
                    }
                }
            ]
        };
        this._accountApi.getAllPartnerAccount(paramObj).subscribe(
            data => {
                if (data && data.data) {
                    data = data.data[0];
                    this.accountDetails = data;
                    this.accountDetails['Price_Book_Name'] = '';
                    if (data['pricelist'] && data['pricelist']['Name']) {
                        this.accountDetails['Price_Book_Name'] = data['pricelist']['Name'];
                    }
                    this.accountDetails['Master_Program_Name'] = '';
                    if (data['program'] && data['program']['Name']) {
                        this.accountDetails['Master_Program_Name'] = data['program']['Name'];
                    }
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                console.log('Error fetching data>>', error.message);
                this._preloaderService.hidePreloader();
            }
        );
    }
}

