import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

import { PreloaderService } from '../../../services/preloader.service';
import { AppStateService } from '../../../services/app-state.service';

import { DashboardApi, PricelistItemApi } from '../../../sdk';

@Component({
    selector: 'content-pl',
    templateUrl: './content-price-lists.component.html'
})

export class ContentPriceListsComponent implements OnInit {

    programs = [];
    productData = [];
    isSelected = false;
    selectedProgramId: any;
    contentData: any;
    errorMessage = '';
    errorMessagePDetail = '';

    constructor(
        private modalService: NgbModal,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _pricelistItemApi: PricelistItemApi,
        private _dashboardApi: DashboardApi
    ) { }

    ngOnInit() {
        const selectedAccountId = this._appState.getSelectedAccount();
        if (selectedAccountId) {
            this.loadProjectsWithPriceBook(selectedAccountId);
        }
    }

    loadProjectsWithPriceBook(accountId) {
        this._preloaderService.showPreloader();
        this.programs = []
        const paramObj = {
            'accountId': accountId,
            'fields': ['sfdcId', 'Name', 'Project__c', 'Partner_Pricelist__c'],
            'include': [
                {
                    relation: 'PartnerPricelist',
                    scope: {
                        fields: ['sfdcId', 'Name'],
                    }
                }
            ],
            'models': ['Project']
        };
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['programs'] && data['programs']['list']) {
                        this.programs = data['programs']['list'];
                    }
                }
                this.errorMessage = this.programs.length ? '' : 'No data found.';
                this._preloaderService.hidePreloader();
            },
            error => {
                this.errorMessage = error.message;
                this._preloaderService.hidePreloader();
            }
        );
    }

    onSelectPriceBook(selectedProgram) {
        this.isSelected = true;
        this.selectedProgramId = selectedProgram['sfdcId'];
        if (selectedProgram['PriceBookId']) {
            this._preloaderService.showPreloader();
            this.productData = [];
            this.errorMessagePDetail = '';
            const paramObj = {
                'pricebookId': selectedProgram['PriceBookId']
            };
            this._pricelistItemApi.getPricelistItemsByPricebookId(paramObj).subscribe(
                pricelistItems => {
                    if (pricelistItems && pricelistItems.length) {
                        pricelistItems.forEach(item => {
                            if (item['Product']) {
                                this.productData.push(item['Product']);
                            }
                        });
                    }
                    this.errorMessagePDetail = this.productData.length ? '' : 'No data found.';
                    this._preloaderService.hidePreloader();
                },
                error => {
                    this.errorMessagePDetail = error.message;
                    this._preloaderService.hidePreloader();
                }
            );
        } else {
            this.errorMessagePDetail = 'No data found.';
        }
    }

    openDetailPage(content, _size, dataRow) {
        this.modalService.open(content, { size: _size });
        this.contentData = dataRow;
    }
}
