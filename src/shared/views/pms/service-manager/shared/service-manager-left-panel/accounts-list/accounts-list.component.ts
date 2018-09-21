import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PreloaderService } from '../../../../../../services/preloader.service';
import { SharedService } from '../../../../../../services/pms/shared.services';

import { AccountApi } from '../../../../../../sdk/services/custom/Account';
import { AppStateService } from '../../../../../../services/app-state.service';

@Component({
    selector: 'accounts-list',
    templateUrl: './accounts-list.component.html',
    styleUrls: ['./accounts-list.component.css']
})

export class AccountsListComponent implements OnInit, OnDestroy {

    @Input() page: string;
    account = [];
    selectedAccountId = '';
    userState: any;
    contentData: any;
    isInternalUser = false;
    private subscription: Subscription;

    constructor(
        private _modalService: NgbModal,
        private _sharedService: SharedService,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _accountApi: AccountApi
    ) { }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        const accessType = this._appState.getAccessType();

        this.subscription = this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
        });

        let paramObj = {};
        // if user is internal
        if (accessType === 'internal') {
            this.isInternalUser = true;
            paramObj['source'] = 'service-manager-filters';
        }
        // when page is service-manager-dashboard
        if (this.page === 'service-manager-dashboard') {
            if (this.selectedAccountId) {
                paramObj['accountId'] = this.selectedAccountId;
                this.loadAccountData(paramObj);
            }
        }
        // when page is service-manager-details
        if (this.page === 'service-manager-details') {
            if (this.isInternalUser) {
                this.account.push({ 'sfdcId': 'All Accounts', 'Name': 'All Accounts' });
            }
            if (this.userState['servicemanager']['account']['accountId'] !== 'All Accounts') {
                this.selectedAccountId = this.userState['servicemanager']['account']['accountId'];
                paramObj['accountId'] = this.selectedAccountId;
            } else {
                this.selectedAccountId = 'All Accounts';
            }
            this.loadAccountData(paramObj);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // load current account data
    loadAccountData(paramObj) {
        this._preloaderService.showPreloader();
        this._accountApi.getAllPartnerAccount(paramObj).subscribe(
            result => {
                if (result && result.data) {
                    this.account = this.account.concat(result.data);
                    // select radio button for the selected account
                    this.setSelectedAccount();
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

    // if account is not available in user state then set selected account in the user state
    setSelectedAccount() {
        if (!this.userState['servicemanager']['account'] || !this.userState['servicemanager']['account']['accountName']) {
            const account = this.getAccount(this.selectedAccountId);
            this.setUserState(account);
        }
    }

    // get account details from the account id
    getAccount(accountId) {
        let account = {};
        for (let i = 0; i < this.account.length; i++) {
            if (this.account[i]['sfdcId'] === accountId) {
                account = this.account[i];
                break;
            }
        }
        return account;
    }

    // on account selection change
    selectAccount(account) {
        this.selectedAccountId = account['sfdcId'];
        // // set current selected accountId in local storage
        if (account['sfdcId'] !== 'All Accounts') {
            this._appState.setSelectedAccount(account['sfdcId']);
        }
        // set acount in user state
        this.setUserState(account);
    }

    setUserState(account) {
        this.userState['servicemanager']['account'] = {
            'accountId': account['sfdcId'],
            'accountName': account['Name']
        };
        if (!this.userState['servicemanager']['region']) {
            this.userState['servicemanager']['region'] = {
                'regionId': 'All Regions',
                'regionName': 'All Regions'
            };
        }
        if (account['sfdcId'] !== 'All Accounts') {
            this.userState['servicemanager']['program'] = {
                'programId': 'All Programs',
                'programName': 'All Programs',
                'ProgramCode': ''
            };
            this.userState['servicemanager']['jobsite'] = {
                'jobsiteId': 'All Jobsites',
                'jobsiteName': 'All Jobsites'
            };
            if (this.page && this.page === 'service-manager-details') {
                this.userState['servicemanager']['isCompleted'] = false;
                delete this.userState['servicemanager']['page'];
            }
        }
        this._sharedService.setUserState(this.userState);
    }

    // open account details popup
    openDetailPage(content, _size, dataRow) {
        if (dataRow['sfdcId'] !== 'All Accounts') {
            this._modalService.open(content, { size: _size });
            this.contentData = dataRow;
        }
    }
}
