import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PreloaderService } from '../../services/preloader.service';

import { PaymentApi, PurchaseOrderApi, InvoiceApi } from '../../sdk';

@Component({
  selector: 'app-pay-detail',
  templateUrl: './payment-detail.component.html'
})
export class PayDetailComponent implements OnInit {
  @Input() modelName: string;
  @Input() modelId: string;

  payment: any;
  order: any;
  invoice: any;
  errorMessage: string;

  constructor(
    private paymentApi: PaymentApi,
    private purchaseOrderApi: PurchaseOrderApi,
    private invoiceApi: InvoiceApi,
    private preloaderService: PreloaderService
  ) { }

  ngOnInit() {
    if (
      this.modelName === 'undefined' ||
      this.modelName.toLowerCase() === 'invoice'
    ) {
      this.getPaymentDetails({ sfdcId: this.modelId });
    }
    if (this.modelName.toLowerCase() === 'job') {
      this.purchaseOrderApi
        .findOne({ where: { Service_Dispatch__c: this.modelId }, fields: { sfdcId: true } })
        .subscribe(order => {
          this.order = order;
          this.getPaymentDetails({ Purchase_Order__c: this.order.sfdcId });
        }, err => {
          this.errorMessage = err.message;
      });
    }
  }

  getPaymentDetails(query: any) {
    this.preloaderService.showPreloader();
    this.paymentApi
      .findOne({
        include: [
          { relation: 'invoice', scope: { include: ['vendor', 'timecard'] } },
          { relation: 'purchaseOrder', scope: { include: ['job'] } }
        ],
        where: query
      })
      .subscribe(payment => {
        this.payment = payment;
        this.errorMessage = Object.keys(this.payment).length > 0  ? '' : 'No payment details found.';
        this.preloaderService.hidePreloader();
      }, err => {
        this.errorMessage = err.message;
        this.preloaderService.hidePreloader();
      });
  }
}
