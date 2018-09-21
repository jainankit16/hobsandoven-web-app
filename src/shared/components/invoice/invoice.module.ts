import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { OrdrInvoiceListComponent } from './Invc-list.component';
import { InvcDetailComponent } from './invc-detail.component';

@NgModule({
    declarations: [
        OrdrInvoiceListComponent,
        InvcDetailComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxDatatableModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    exports: [
        OrdrInvoiceListComponent,
        InvcDetailComponent
    ]
})

export class InvoiceModule { }
