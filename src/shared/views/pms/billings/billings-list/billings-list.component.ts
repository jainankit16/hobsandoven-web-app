import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription, Observable, BehaviorSubject } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { AppStateService } from '../../../../services/app-state.service';
import { SharedService } from '../../../../services/pms/shared.services';

import { InvoiceApi } from '../../../../sdk/services/custom/Invoice';

@Component({
    selector: 'app-billings-list',
    templateUrl: './billings-list.component.html',
    styleUrls: ['./billings-list.component.css']
})

export class BillingsListComponent implements OnInit, OnDestroy, AfterViewInit {

    selectedAccountId: string;
    private subsUnsbscribe: Subscription;
    private billingInvice: any = [];
    private userState: any;
    /*Boot-Datatable params */
    tableData = [];
    loadingIndicator = false;
    accountId: any;
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 200;
    orderBy = 'sfdcId ASC';
    errorMessage: any;
    private appStateSub: Subscription;
    appState: any;
    isEnabled = false;
    noRecords = false;

    constructor(
        private router: Router,
        private _appState: AppStateService,
        private _sharedservice: SharedService,
        private _invoiceApi: InvoiceApi,
        private el: ElementRef
    ) { }


    ngAfterViewInit() {
        let elHeader = this.el.nativeElement.querySelector('.datatable-header')
        let elBody = this.el.nativeElement.querySelector('datatable-body');
        elHeader.onscroll = () => {
            elBody.scrollLeft = elHeader.scrollLeft
        }
        elBody.onscroll = () => {
            elHeader.scrollLeft = elBody.scrollLeft
        }
    }


    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        this.appStateSub = this._appState.getAppState().subscribe(appState => {
            this.appState = appState;
        });
        this.billingList();
    }

    ngOnDestroy() {
        this.subsUnsbscribe.unsubscribe();
        if (this.appStateSub) {
            this.appStateSub.unsubscribe();
        }
    }

    billingList() {
        this.subsUnsbscribe = this._sharedservice.getUserState().subscribe(current => {
            this.userState = current;
            this.accountId = (current.partner) ? current.partner.sfdcId : '';
            if (this.accountId) {
                this._appState.setSelectedAccount(this.accountId);
            } else if (this.selectedAccountId) {
                this.accountId = this.selectedAccountId;
            }
            if (this.accountId) {
                this.isLoadMore = false;
                this.getBillingList(0);
            }
        });
    }
    /**
     *
     * @param offset
     */
    getBillingList(offset) {
        this.loadingIndicator = true;
        const conditionDataTable = {
            Account__c: this.accountId,
            limit: this.itemsPerBatch,
            skip: offset,
            order: this.orderBy
        };
        this.isEnabled = false;
        this._invoiceApi.billlingLists(conditionDataTable).subscribe(results => {

            if (results.length < this.itemsPerBatch) {
                this.noRecords = true;
            }
            if (!this.isLoadMore) {
                this.tableData = results;
            } else {
                results.forEach(c => {
                    this.tableData.push(c);
                });
            }
            this.isEnabled = true;
            this.loadingIndicator = false;
            this.setEmptyMessage();
        },
            err => {
                this.errorMessage = err.Message;
                this.loadingIndicator = false;
                this.isEnabled = true;
                this.setEmptyMessage();
            }
        );
    }

    openDetailPage(item) {
        const caseId = item.caseId;
        if (caseId) {
            this.userState['billing'] = {
                tab: 'sales',
                subTab: 'salesorder',
            }
            // or item.salesOrderId written just for test
            this._sharedservice.setUserState(this.userState);
            if (!this.appState) {
                this.appState = {};
            }
            this.appState['redirectUrl'] = '/pms/billing-manager';
            this._appState.setAppState(this.appState);
            localStorage.setItem('redirectUrl', '/pms/billing-manager');
            this.router.navigate(['/pms/service-manager/list-details', caseId]);
        }
    }

    /*Data Table funcation start here*/
    loadMoreRecords() {
        this.isLoadMore = true;
        this.getBillingList(this.tableData.length);
    }

    setEmptyMessage() {
        const msg = 'No data to display.';
        if (!this.tableData.length) {
            this.tableData = [{
                'message': msg
            }];
            this.tableData[0]['vendorName'] = msg;
        }
    }
}
