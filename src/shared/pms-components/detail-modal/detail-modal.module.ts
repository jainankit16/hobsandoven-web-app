import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AccountDetailComponent } from './account-detail/account-detail.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { QuoteDetailComponent } from './quote-detail/quote-detail.component';
import { WorkorderDetailComponent } from './workorder-detail/workorder-detail.component';
import { PricebookDetailComponent } from './pricebook-detail/pricebook-detail.component';
import { PricelistItemDetailComponent } from './pricelist-item-detail/pricelist-item-detail.component';
import { CaseDetailComponent } from './case-detail/case-detail.component';
import { JobsiteDetailComponent } from './jobsite-detail/jobsite-detail.component';
import { SalesorderDetailComponent } from './salesorder-detail/salesorder-detail.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { TimecardDetailComponent } from './timecard-detail/timecard-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgxDatatableModule
    ],
    exports: [
        AccountDetailComponent,
        ProgramDetailComponent,
        QuoteDetailComponent,
        WorkorderDetailComponent,
        PricebookDetailComponent,
        PricelistItemDetailComponent,
        CaseDetailComponent,
        JobsiteDetailComponent,
        SalesorderDetailComponent,
        TimecardDetailComponent,
        InvoiceDetailComponent,
        PaymentDetailComponent
    ],
    declarations: [
        AccountDetailComponent,
        ProgramDetailComponent,
        QuoteDetailComponent,
        WorkorderDetailComponent,
        PricebookDetailComponent,
        PricelistItemDetailComponent,
        CaseDetailComponent,
        JobsiteDetailComponent,
        SalesorderDetailComponent,
        TimecardDetailComponent,
        InvoiceDetailComponent,
        PaymentDetailComponent
    ]
})
export class DetailModalModule { }
