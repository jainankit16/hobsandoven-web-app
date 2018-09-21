import { Component, OnInit, Input } from '@angular/core';
import { AccountApi } from './../../../sdk/services/custom/Account';
import { AppStateService } from '../../../services/app-state.service';
@Component({
    selector: 'salesorder-detail',
    templateUrl: './salesorder-detail.component.html',
    styleUrls: ['./salesorder-detail.component.css']
})
export class SalesorderDetailComponent implements OnInit {
    @Input() saleOrder: any;
    AccountId: any;
    salesOrder: any;
    constructor(
        private _appState: AppStateService,
        private _AccountApi: AccountApi
    ) {
        this.AccountId = this._appState.getSelectedAccount();
        this.getAccountDetails();
    }

    ngOnInit() {
        this.salesOrder = this.saleOrder;
    }
    getAccountDetails() {
        this._AccountApi.find({ where: { sfdcId: this.AccountId }, fields: ['id', 'Name'] }).subscribe(
            res => {
                if (res.length) {
                    this.salesOrder['accountName'] = res[0]['Name'];
                }
            },
            err => {
                console.log('Error', err);
            }
        )
    }

}
