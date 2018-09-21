import { Component, OnInit, Input } from '@angular/core';
import { AccountApi } from './../../../sdk/services/custom/Account';
import { AppStateService } from '../../../services/app-state.service';
@Component({
    selector: 'timecard-detail',
    templateUrl: './timecard-detail.component.html',
    styleUrls: ['./timecard-detail.component.css']
})
export class TimecardDetailComponent implements OnInit {
    @Input() TimeCardData: any;

    timeCard: any;
    AccountId: string;
    constructor(
        private _appState: AppStateService,
        private _AccountApi: AccountApi
    ) {
        this.AccountId = this._appState.getSelectedAccount();
        this.getAccountDetails();
    }

    ngOnInit() {
        this.timeCard = this.TimeCardData;
    }
    getAccountDetails() {
        this._AccountApi.find({ where: { sfdcId: this.AccountId }, fields: ['id', 'Name'] }).subscribe(
            res => {
                if (res.length) {
                    this.timeCard['accountName'] = res[0]['Name'];
                }
            },
            err => {
                console.log('Error', err);
            }
        )
    }

}
