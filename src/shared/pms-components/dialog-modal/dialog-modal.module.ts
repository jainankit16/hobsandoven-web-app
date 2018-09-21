import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { PipeModule } from '../../pipe/pipe.module';

import { ProjectListModalComponent } from './project-list-modal/project-list-modal.component';
import { QuoteListModalComponent } from './quote-list-modal/quote-list-modal.component';
import { WorkorderListModalComponent } from './workorder-list-modal/workorder-list-modal.component';
import { PricebookListModalComponent } from './pricebook-list-modal/pricebook-list-modal.component';
import { CaseListModalComponent } from './case-list-modal/case-list-modal.component';
import { InvoiceListModalComponent } from './invoice-list-modal/invoice-list-modal.component';
import { PaymentListModalComponent } from './payment-list-modal/payment-list-modal.component';
import { JobsiteListModalComponent } from './jobsite-list-modal/jobsite-list-modal.component';
import { SalesOrderListModalComponent } from './sales-order-list-modal/sales-order-list-modal.component';
import { TimecardListModalComponent } from './timecard-list-modal/timecard-list-modal.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgxDatatableModule,
        PipeModule
    ],
    declarations: [
        ProjectListModalComponent,
        QuoteListModalComponent,
        WorkorderListModalComponent,
        PricebookListModalComponent,
        CaseListModalComponent,
        InvoiceListModalComponent,
        PaymentListModalComponent,
        JobsiteListModalComponent,
        SalesOrderListModalComponent,
        TimecardListModalComponent
    ],
    exports: [
        ProjectListModalComponent,
        QuoteListModalComponent,
        WorkorderListModalComponent,
        PricebookListModalComponent,
        CaseListModalComponent,
        InvoiceListModalComponent,
        PaymentListModalComponent,
        JobsiteListModalComponent,
        SalesOrderListModalComponent,
        TimecardListModalComponent
    ]
})
export class DialogModalModule { }
