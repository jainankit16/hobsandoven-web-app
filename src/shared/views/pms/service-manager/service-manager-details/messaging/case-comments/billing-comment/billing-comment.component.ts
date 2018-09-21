import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppStateService } from '../../../../../../../services/app-state.service';

import { CaseApi } from '../../../../../../../sdk';

@Component({
    selector: 'billing-comment',
    templateUrl: './billing-comment.component.html',
    styleUrls: ['./billing-comment.component.css']
})

export class BillingCommentComponent implements OnInit {

    caseComment: any[];
    casesfdcId: any;
    private isInternalUser: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _appState: AppStateService,
        private _caseApi: CaseApi,
    ) { }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }
        this.activatedRoute.params.subscribe(params => {
            window.scroll(0, 0);
            if (params && params['id']) {
                this._caseApi.getOrderMessages(params['id']).subscribe(data => {
                    if (data) {
                        this.caseComment = data.list;
                    } else {
                        this.caseComment = [];
                    }
                })
            }
        })
    }
}
