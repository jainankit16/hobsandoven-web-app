
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguiMapModule } from '@ngui/map'; // Google nguimap integration
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '../../../../components/shared.module';
import { TimecardModule } from '../../../../components/timecard/timecard.module';
import { InvoiceModule } from '../../../../components/invoice/invoice.module';
import { DocumentModule } from '../../../../components/document/document.module';
import { PaymentModule } from '../../../../components/payment/payment.module';
import { OrderDetailsModule } from '../../../../components/order-details/order-details.module';
import { FeedModule } from '../../../../components/feed/feed.module';
import { FeedTimelineModule } from '../../../../components/feed-timeline/feed-timeline.module';
import { MessageModule } from '../../../../components/message/message.module';

import { JobDetailComponent } from './job-detail.component';
import { JobDetailSummaryComponent } from './job-detail-summary/job-detail-summary.component';
import { JobDetailInstructionsComponent } from './job-detail-instructions/job-detail-instructions.component';
import { JobDetailManagerComponent } from './job-detail-manager/job-detail-manager.component';
import { JobDetailBillingComponent } from './job-detail-billing/job-detail-billing.component';
import { JobDetailSidebarComponent } from './job-detail-sidebar/job-detail-sidebar.component';
import { JobDetailWorkerStatusComponent } from './job-detail-worker-status/job-detail-worker-status.component';
import { SelectWorkerComponent } from './select-worker/select-worker.component';

import { environment } from 'environments/environment';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { JobDetailVendorComponent } from './job-detail-vendor/job-detail-vendor.component';
import { JobDetailWorkerComponent } from './job-detail-worker/job-detail-worker.component';
import { JobDetailHardwareInfoComponent } from './job-detail-hardware-info/job-detail-hardware-info.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=' + environment.googleMapKey }),
        NgSelectModule,
        SharedModule,
        TimecardModule,
        InvoiceModule,
        DocumentModule,
        PaymentModule,
        OrderDetailsModule,
        FeedModule,
        FeedTimelineModule,
        MessageModule
    ],
    declarations: [
        JobDetailComponent,
        JobDetailSummaryComponent,
        JobDetailInstructionsComponent,
        JobDetailManagerComponent,
        JobDetailBillingComponent,
        JobDetailSidebarComponent,
        JobDetailWorkerStatusComponent,
        SelectWorkerComponent,
        UpdateAppointmentComponent,
        JobDetailVendorComponent,
        JobDetailWorkerComponent,
        JobDetailHardwareInfoComponent
    ],
    schemas: [],
})

export class JobDetailModule {

}
