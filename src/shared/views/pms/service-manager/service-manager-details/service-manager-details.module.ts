import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipeModule } from '../../../../pipe/pipe.module';
import { ServiceManagerLeftPanelModule } from '../shared/service-manager-left-panel/service-manager-left-panel.module';
import { ServiceManagerRightPanelModule } from '../shared/service-manager-right-panel/service-manager-right-panel.module';
import { TopProgressBarModule } from '../shared/top-progress-bar/top-progress-bar.module';
import { DetailsTabsetModule } from '../shared/details-tabset/details-tabset.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ServiceManagerDetailsComponent } from './service-manager-details.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { PurchaseComponent } from './billing-details/purchase/purchase.component';
import { SalesComponent } from './billing-details/sales/sales.component';
import { PartnerInfoComponent } from './billing-details/sales/partner-info/partner-info.component';
import { HardwareDetailsComponent } from './hardware-details/hardware-details.component';
import { HardwareListComponent } from './hardware-details/hardware-list/hardware-list.component';
import { PmsHardwareAllComponent } from './hardware-details/pms-hardware-all/pms-hardware-all.component';
import { PmsHardwareAssetReturnsComponent } from './hardware-details/pms-hardware-asset-returns/pms-hardware-asset-returns.component';
import { HardwareAssetRecoveryComponent } from './hardware-details/hardware-asset-recovery/hardware-asset-recovery.component';
import { HardwareDepotFSLComponent } from './hardware-details/hardware-depot-fsl/hardware-depot-fsl.component';
import { MessagingComponent } from './messaging/messaging.component';
import { CaseCommentsComponent } from './messaging/case-comments/case-comments.component';
import { BillingCommentComponent } from './messaging/case-comments/billing-comment/billing-comment.component';
import { PaymentComponent } from './billing-details/purchase/payment/payment.component';
import { PurchaseInvoiceComponent } from './billing-details/purchase/purchase-invoice/purchase-invoice.component';
import { PurchaseOrderComponent } from './billing-details/purchase/purchase-order/purchase-order.component';
import { TimeCardInfoComponent } from './billing-details/purchase/time-card/time-card.component';
import { VendorInfoComponent } from './billing-details/purchase/vendor-info/vendor-info.component';
import { NewCommentComponent } from './messaging/case-comments/new-comment/new-comment.component';
import { StandardCaseListComponent } from './messaging/case-comments/standard-case-list/standard-case-list.component';
import { WorkorderCaseDetailComponent } from './messaging/case-comments/workorder-case-detail/workorder-case-detail.component';
import { ConversationComponent } from './messaging/conversation/conversation.component';
import { MailboxComponent } from './messaging/mailbox/mailbox.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PmsCaseDetailsComponent } from './order-details/pms-case-details/pms-case-details.component';
import { SoLineDetailsComponent } from './order-details/so-line-details/so-line-details.component';
import { WoLineDetailsComponent } from './order-details/wo-line-details/wo-line-details.component';
import { WorkOrderDetailsComponent } from './order-details/work-order-details/work-order-details.component';
import { JobOrderDetailsComponent } from './order-details/job-order-details/job-order-details.component';
import { ServiceContractComponent } from './service-contract/service-contract.component';
import { WorkerDetailsComponent } from './worker-details/worker-details.component';
import { PmsWorkerAppointmentComponent } from './worker-details/pms-worker-appointment/pms-worker-appointment.component';
import { PmsWorkerInfoComponent } from './worker-details/pms-worker-info/pms-worker-info.component';
import { TimeCardComponent } from './billing-details/sales/time-card/time-card.component';
import { WorkerDedicatedFTEComponent } from './worker-details/worker-dedicated-fte/worker-dedicated-fte.component';
import { WorkerVendorInfoComponent } from './worker-details/worker-vendor-info/worker-vendor-info.component';
import { SalesOrderComponent } from './billing-details/sales/sales-order/sales-order.component';


@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        RouterModule,
        PipeModule,
        ServiceManagerLeftPanelModule,
        ServiceManagerRightPanelModule,
        DetailsTabsetModule,
        TopProgressBarModule,
        ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    declarations: [
        ServiceManagerDetailsComponent,
        BillingDetailsComponent,
        PurchaseComponent,
        SalesComponent,
        PartnerInfoComponent,
        HardwareDetailsComponent,
        HardwareListComponent,
        PmsHardwareAllComponent,
        PmsHardwareAssetReturnsComponent,
        HardwareAssetRecoveryComponent,
        HardwareDepotFSLComponent,
        MessagingComponent,
        CaseCommentsComponent,
        BillingCommentComponent,
        PaymentComponent ,
        PurchaseInvoiceComponent,
        PurchaseOrderComponent,
        TimeCardInfoComponent,
        VendorInfoComponent ,
        NewCommentComponent,
        StandardCaseListComponent,
        WorkorderCaseDetailComponent,
        ConversationComponent,
        MailboxComponent,
        OrderDetailsComponent,
        PmsCaseDetailsComponent,
        SoLineDetailsComponent,
        WoLineDetailsComponent,
        WorkOrderDetailsComponent,
        ServiceContractComponent,
        WorkerDetailsComponent,
        PmsWorkerAppointmentComponent,
        PmsWorkerInfoComponent,
        TimeCardComponent,
        WorkerDedicatedFTEComponent,
        WorkerVendorInfoComponent,
        SalesOrderComponent,
        JobOrderDetailsComponent
    ],
    exports: [
        ServiceManagerDetailsComponent,
        BillingDetailsComponent,
        PurchaseComponent,
        SalesComponent,
        PartnerInfoComponent,
        HardwareDetailsComponent,
        HardwareListComponent,
        PmsHardwareAllComponent,
        PmsHardwareAssetReturnsComponent,
        HardwareAssetRecoveryComponent,
        HardwareDepotFSLComponent,
        MessagingComponent,
        CaseCommentsComponent,
        BillingCommentComponent,
        PaymentComponent ,
        PurchaseInvoiceComponent,
        PurchaseOrderComponent,
        TimeCardInfoComponent,
        VendorInfoComponent ,
        NewCommentComponent,
        StandardCaseListComponent,
        WorkorderCaseDetailComponent,
        ConversationComponent,
        MailboxComponent,
        OrderDetailsComponent,
        PmsCaseDetailsComponent,
        SoLineDetailsComponent,
        WoLineDetailsComponent,
        WorkOrderDetailsComponent,
        ServiceContractComponent,
        WorkerDetailsComponent,
        PmsWorkerAppointmentComponent,
        PmsWorkerInfoComponent,
        TimeCardComponent,
        WorkerDedicatedFTEComponent,
        WorkerVendorInfoComponent,
        SalesOrderComponent,
        JobOrderDetailsComponent
    ]
})

export class ServiceManagerDetailsModule { }
