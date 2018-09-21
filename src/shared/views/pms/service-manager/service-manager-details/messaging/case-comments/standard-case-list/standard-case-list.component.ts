import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PreloaderService } from './../../../../../../../services/preloader.service';
import { AppStateService } from '../../../../../../../services/app-state.service';

import { CaseApi } from '../../../../../../../sdk';

@Component({
    selector: 'standard-case-list',
    templateUrl: './standard-case-list.component.html',
    styleUrls: ['./standard-case-list.component.css']
})

export class StandardCaseListComponent implements OnInit {

    isInternalUser = false;
    caseComment: any;
    caseCommentCount: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _preloaderService: PreloaderService,
        private _appState: AppStateService,
        private _caseApi: CaseApi
    ) {
        this.caseComment = [];
        this.caseCommentCount = { pmsCount: 0, serviceCount: 0 };
    }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }
        this._activatedRoute.params.subscribe(params => {
            window.scroll(0, 0);
            if (params && params['id']) {
                this.getCaseMessages(params['id'])
            }
        })
    }

    getCaseMessages(caseId) {
        this._preloaderService.showPreloader();
        this._caseApi.getCaseMessages(caseId).subscribe(data => {
            if (data) {
                this.caseComment = data.list;
                this.caseCommentCount.pmsCount = data['pmsCount'];
                this.caseCommentCount.serviceCount = data['serviceCount'];
            }
            this._preloaderService.hidePreloader();
        }, err => {
            this._preloaderService.hidePreloader();
        })
    }
}

