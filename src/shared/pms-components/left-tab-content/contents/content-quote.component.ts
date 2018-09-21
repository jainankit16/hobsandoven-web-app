import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { OrderBy } from '../../../pipe/order/orderby.pipe';

import { PreloaderService } from '../../../services/preloader.service';
import { AppStateService } from '../../../services/app-state.service';

import { QuoteManagerApi, DashboardApi } from '../../../sdk/services/custom/';

@Component({
    selector: 'content-quote',
    templateUrl: './content-quote.component.html'
})

export class ContentQuoteComponent implements OnInit {

    quotes: any;
    contentData: any;

    constructor(
        private modalService: NgbModal,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _dashboardApi: DashboardApi
    ) { }

    ngOnInit() {
        const selectedAccountId = this._appState.getSelectedAccount();
        if (selectedAccountId) {
            this.loadQuoteManagerData(selectedAccountId);
        }
    }

    loadQuoteManagerData(accountId) {
        this._preloaderService.showPreloader();
        this.quotes = [];
        const paramObj = {
            'accountId': accountId,
            'include': [
                {
                    relation: 'Project',
                    scope: {
                        fields: ['sfdcId', 'Name']
                    }
                },
                {
                    relation: 'Partner',
                    scope: {
                        fields: ['sfdcId', 'Name']
                    }
                }
            ],
            'models': ['QuoteManager']
        };
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['quotes'] && data['quotes']['list']) {
                        this.quotes = data['quotes']['list'];
                        this.quotes = new OrderBy().transform(this.quotes, ['-createdAt']);
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

    openDetailPage(content, _size, dataRow) {
        this.modalService.open(content, { size: _size });
        this.contentData = dataRow;
    }
}
