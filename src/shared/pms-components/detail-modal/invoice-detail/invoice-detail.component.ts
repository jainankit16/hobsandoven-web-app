import { Component, OnInit, Input } from '@angular/core';
import { AccountApi } from './../../../sdk/services/custom/Account';
import { AppStateService } from '../../../services/app-state.service';

@Component({
    selector: 'invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
    @Input() invoice: any;
    private invoiceDetails: any;
    AccountId: any;
    constructor(
        private _appState: AppStateService,
        private _AccountApi: AccountApi
    ) {
        this.AccountId = this._appState.getSelectedAccount();
        this.getAccountDetails();
    }

    ngOnInit() {
        if (this.invoice) {
            this.invoiceDetails = this.invoice;
        }
    }
    getAccountDetails() {
        this._AccountApi.find({ where: { sfdcId: this.AccountId }, fields: ['id', 'Name'] }).subscribe(
            res => {
                if (res.length) {
                    this.invoiceDetails['accountName'] = res[0]['Name'];
                }
            },
            err => {
                console.log('Error', err);
            }
        )
    }
}
