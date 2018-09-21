import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PreloaderService } from './../../../../../../services/preloader.service';
import { AppStateService } from '../../../../../../services/app-state.service';

import { CaseApi } from './../../../../../../sdk';

@Component({
    selector: 'app-work-order-details',
    templateUrl: './work-order-details.component.html',
    styleUrls: ['./work-order-details.component.css']
})

export class WorkOrderDetailsComponent implements OnInit {

    @Input() page: string;
    isInternalUser = false;
    workOrderLine: any;
    data: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _caseApi: CaseApi
    ) {
        this.activatedRoute.params.subscribe(params => {
            window.scroll(0, 0);
            this.getOrderDetails(params['id']);
        });
    }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }
    }

    getOrderDetails(caseId): void {
        this._preloaderService.showPreloader();
        this._caseApi.getServiceManagerOrderList({
            'where': { 'id': caseId },
            'source': this.isInternalUser,
            'isDetail': true,
            'model': ['workOrder'],
        }).subscribe(
            res => {
                this.data = [];
                this.workOrderLine = [];
                if (res.length) {
                    this.data = res[0];
                    this.workOrderLine = this.data.workOrder ? this.data.workOrder.jobOrderItems ?
                        this.data.workOrder.jobOrderItems : [] : [];
                }
                this._preloaderService.hidePreloader()
            }, err => {
                this._preloaderService.hidePreloader()
            })
    }
}
