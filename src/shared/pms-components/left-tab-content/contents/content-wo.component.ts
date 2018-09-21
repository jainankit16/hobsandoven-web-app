import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { OrderBy } from '../../../pipe/order/orderby.pipe';

import { PreloaderService } from '../../../services/preloader.service';
import { AppStateService } from '../../../services/app-state.service';

import { WorkOrderApi, DashboardApi } from '../../../sdk/services/custom/';

@Component({
    selector: 'content-wo',
    templateUrl: './content-wo.component.html'
})

export class ContentWorkOrderComponent implements OnInit {

    workOrders: any;
    contentData: any;

    constructor(
        private modalService: NgbModal,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _dashboardApi: DashboardApi,
    ) { }

    ngOnInit() {
        const selectedAccountId = this._appState.getSelectedAccount();
        if (selectedAccountId) {
            this.loadWorkOrderData(selectedAccountId);
        }
    }

    loadWorkOrderData(accountId) {
        this._preloaderService.showPreloader();
        this.workOrders = [];
        const paramObj = {
            'accountId': accountId,
            'models': ['WorkOrder']
        };
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['workOrders'] && data['workOrders']['list']) {
                        this.workOrders = data['workOrders']['list'];
                        this.workOrders = new OrderBy().transform(this.workOrders, ['-createdAt']);
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
