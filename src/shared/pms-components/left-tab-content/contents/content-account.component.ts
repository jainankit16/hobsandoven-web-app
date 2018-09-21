import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { PreloaderService } from '../../../services/preloader.service';
import { QuoteService } from '../../../services/pms/quote.service';
import { SharedService } from '../../../services/pms/shared.services';
import { jobLocationMapService } from '../../../services/pms/job-location.service';
import { AppStateService } from '../../../services/app-state.service';

import { AccountApi } from '../../../sdk/services/custom/Account';

@Component({
    selector: 'content-account',
    templateUrl: './content-account.component.html'
})

export class ContentAccountComponent implements OnInit, OnDestroy {

    @Input() isSetAccountId = false;
    account = [];
    selectedAccountId = '';
    userState: any;
    contentData: any;
    accessType: String;
    private subscription: Subscription;

    constructor(
        private _modalService: NgbModal,
        private _appState: AppStateService,
        private _sharedService: SharedService,
        private _preloaderService: PreloaderService,
        private _jobLocationService: jobLocationMapService,
        private _quoteService: QuoteService,
        private _accountApi: AccountApi
    ) { }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        this.accessType = this._appState.getAccessType();

        this.subscription = this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
        });

        if (this.userState && this.userState.partner && this.userState.partner.sfdcId) {
            this.selectedAccountId = this.userState.partner.sfdcId;
        }

        if (this.accessType === 'internal') {
            this.loadAccountData(undefined);
        } else {
            if (this.selectedAccountId) {
                this.loadAccountData(this.selectedAccountId);
            }
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // load current account data
    loadAccountData(accountId) {
        this._preloaderService.showPreloader();
        this._sharedService.setIsProgramLoad(false);
        let reqObj = {
            'counts': ['ProjectCount', 'JobsiteCount', 'QuoteManagerCount', 'WorkOrderCount', 'PricelistCount']
        }
        if (accountId && accountId !== '') {
            reqObj['accountId'] = accountId;
        }
        this._accountApi.getAllPartnerAccount(reqObj).subscribe(
            result => {
                if (result && result.data) {
                    this.account = result.data;
                    if (this.selectedAccountId) {
                        const arrFiltered = this.account.filter(item => (item.sfdcId === this.selectedAccountId));
                        this.setUserState(arrFiltered[0]);
                        this._sharedService.setIsProgramLoad(true);
                    } else {
                        this.selectedAccountId = this.account[0]['sfdcId'];
                        this.setUserState(this.account[0]);
                    }
                    this._preloaderService.hidePreloader();
                } else {
                    this._preloaderService.hidePreloader();
                }
            },
            err => {
                this._preloaderService.hidePreloader();
            }
        );
    }

    selectAccountID(account) {
        this.initCommonServices();
        if (!this.userState.partner || (account['sfdcId'] !== this.userState.partner.sfdcId)) {
            this.selectedAccountId = account['sfdcId'];
            this.setUserState(account);
        }
    }

    setUserState(account) {
        if (!this.userState) {
            this.userState = {};
        }
        this.userState['partner'] = {};
        this.userState['program'] = {};
        this.userState['quote'] = {};
        if (account) {
            this.userState['partner']['name'] = account['Name'];
            this.userState['partner']['login'] = account['Webcase_Account_Name__c'];
            this.userState['partner']['id'] = account['Service_Global_Ref__c'];
            this.userState['partner']['sfdcId'] = account['sfdcId'];
            if (!this.isSetAccountId) {
                this._appState.setSelectedAccount(account['sfdcId']);
            }
        }
        this._sharedService.setUserState(this.userState);
    }

    initCommonServices() {
        // quote service
        delete this.userState.quote;
        this._quoteService.setQuotes([]);
        // joblocation service
        this._jobLocationService.setJobLocations([]);
        this._jobLocationService.setSelectedLocations([]);
        // shared service
        this._sharedService.setAllProviders([], true);
    }

    // open account details popup
    openDetailPage(content, _size, dataRow) {
        this._modalService.open(content, { size: _size });
        this.contentData = dataRow;
    }
}
