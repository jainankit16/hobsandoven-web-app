import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PreloaderService } from '../../services/preloader.service';
import { InvoiceApi, PurchaseOrderApi } from '../../sdk';

@Component({
    selector: 'app-invc-detail',
    templateUrl: './invc-detail.component.html'
})

export class InvcDetailComponent implements OnInit {

    @Input() modelName: string;
    @Input() modelId: string;
    @Input() IsActiveLink: string;

    invoice: any;
    order: any;
    errorMessage: string;

    constructor(
        private invoiceApi: InvoiceApi,
        private purchaseOrderApi: PurchaseOrderApi,
        private preloaderService: PreloaderService
    ) { }

    ngOnInit() {
        if (this.modelName.toLowerCase() === 'invoice') {
            this.getInvoiceDetails({ sfdcId: this.modelId });
        }

        if (this.modelName.toLowerCase() === 'job' && this.modelId) {
            this.preloaderService.showPreloader();
            this.errorMessage = '';
            this.purchaseOrderApi.find({
                where: { Service_Dispatch__c: this.modelId },
                fields: { sfdcId: true }
            }).subscribe(order => {
                if (order && order.length) {
                    this.order = order[0];
                    this.getInvoiceDetails({ Purchase_Order__c: this.order.sfdcId });
                } else {
                    this.errorMessage = 'No invoice details found.';
                }
                this.preloaderService.hidePreloader();
            }, err => {
                this.errorMessage = err.message;
                this.preloaderService.hidePreloader();
            });
        }
    }

    getInvoiceDetails(query: any) {
        this.preloaderService.showPreloader();
        this.errorMessage = '';
        this.invoiceApi.find({
            include: [
                { relation: 'vendor', scope: { fields: { Name: true } } },
                {
                    relation: 'purchaseOrder',
                    scope: {
                        fields: { sfdcId: true, Service_Dispatch__c: true },
                        include: ['job',
                            { relation: 'lineItems', scope: { limit: 1 } },
                        ]
                    }
                },
                { relation: 'timecard' }
            ],
            where: query
        }).subscribe(
            invoice => {
                if (invoice && invoice.length) {
                    this.invoice = invoice[0];
                } else {
                    this.errorMessage = 'No invoice details found.';
                }
                this.preloaderService.hidePreloader();
            }, error => {
                this.errorMessage = error.message;
                this.preloaderService.hidePreloader();
            }
        );
    }

}
