import { Component, OnInit, Input } from '@angular/core';
import { Account, AccountApi } from '../../../../shared/sdk';
import { PreloaderService } from '../../../../shared/services/preloader.service';

@Component({
    selector: 'app-account-detail',
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
    accountId: any;
    errorMessage: string;
    account: any;
    title: any;
    @Input()
    get modelId() {
        return this.accountId;
    }

    set modelId(value) {
        this.accountId = value;
        this.getAccountDetails(this.accountId);
    }

    constructor(private _accountApi: AccountApi, private _preloaderService: PreloaderService) {
        this.title = this.accountId;      
    }

    ngOnInit() {
        this.getAccountDetails(this.accountId);
    }

    getAccountDetails(accountId) {
        this._preloaderService.showPreloader();
        this._accountApi
            .findOne({
                fields: {
                    sfdcId: true,
                    Name: true,
                    AccountSource: true,
                    Vendor_Type__c: true,
                    Service_Global_Ref__c: true,
                    IsPartner: true,
                    Business_Size_c__c: true,
                    OwnerId: true,
                    CreatedDate: true,
                    Company_Reference_code__c: true,
                    CurrencyIsoCode: true,
                    LastModifiedDate: true
                },
                where: {
                    sfdcId: accountId
                }
            })
            .subscribe(
                result => {
                    this.account = result;
                    this._preloaderService.hidePreloader();
                },
                error => {
                    this.errorMessage = error.message
                    this._preloaderService.hidePreloader();
                }
            );
    }
}

