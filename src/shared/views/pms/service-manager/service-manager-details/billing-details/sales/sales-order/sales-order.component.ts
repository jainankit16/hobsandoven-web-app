import { Component, OnInit, OnDestroy } from '@angular/core';
import { PreloaderService } from './../../../../../../../services/preloader.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SharedService } from 'shared/services/pms/shared.services';
import { OrderApi } from './../../../../../../../sdk/services/custom/Order';
@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css']
})
export class SalesOrderComponent implements OnInit, OnDestroy {
  salesData: any;
  private subscription: Subscription;

  constructor(
    private _orderApi: OrderApi,
    private _activatedRoute: ActivatedRoute,
    private _preloaderService: PreloaderService,
    private _sharedService: SharedService
  ) { }

  ngOnInit() {
    this.subscription = this._sharedService.getUserState().subscribe(current => {
      if (current['servicemanager'] && current['servicemanager']['case']) {
        if (current['servicemanager']['case'] && current['servicemanager']['case']['caseId']) {
          this._preloaderService.showPreloader();
          this._orderApi.fetchSalesOrder({ id: current['servicemanager']['case']['caseId'] }).subscribe(salesData => {
            this._preloaderService.hidePreloader();
            this.salesData = salesData;
          }, error => {
            console.error(error);
            this._preloaderService.hidePreloader();
          });
        } else {
          console.error('caseId is reqired to get sales order');
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
