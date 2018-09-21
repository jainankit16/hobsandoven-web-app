import { Component, OnInit, Input } from '@angular/core';
import { PreloaderService } from '../../services/preloader.service';
import { PurchaseOrderApi, InvoiceApi } from '../../sdk';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html'
})

export class OrderDetailsComponent implements OnInit {

    @Input() modelName: string;
    @Input() modelId: string;

    // for Order Details
    order: any;
    relationsearchArray: any;
    errorMessage = '';

    constructor(
        private purchaseOrderApi: PurchaseOrderApi,
        private preloaderService: PreloaderService,
        private invoiceApi: InvoiceApi
    ) {
        this.relationsearchArray = [
            { relation: 'vendor', scope: { fields: { Name: true } } },
            { relation: 'jobsite', scope: { fields: { Name: true } } },
            {
                relation: 'job',
                scope: {
                    fields: {
                        Job_Status__c: true,
                        Jobsite_Name__c: true,
                        Iron_Job_num__c: true,
                        Customer_Service_Type_From_Program__c: true,
                        Service_Dispatch_SLA_Priority_FrmProgram__c: true,
                        Technical_Level__c: true,
                        CreatedDate: true
                    }
                }
            },
            { relation: 'lineItems', scope: { limit: 1 } }
        ];
    }

    ngOnInit() {
        if (this.modelName.toLowerCase() === 'order') {
            this.getOrderDetails({ sfdcId: this.modelId });
        }
        if (this.modelName.toLowerCase() === 'job') {
            this.getOrderDetails({ Service_Dispatch__c: this.modelId });
        }
    }

    getOrderDetails(query: any) {
        this.preloaderService.showPreloader();
        const reqObj = {
            where: query,
            include: this.relationsearchArray
        }
        this.purchaseOrderApi.find(reqObj).subscribe(
            order => {
                if (order && order.length) {
                    this.order = order[0];
                }
                this.errorMessage = (this.order !== undefined && Object.keys(this.order).length > 0) ? '' : 'No order details found.';
                this.preloaderService.hidePreloader();
            },
            error => {
                this.preloaderService.hidePreloader();
                this.errorMessage = error.message;
            }
        );
    }
}
