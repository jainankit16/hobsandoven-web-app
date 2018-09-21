import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InvcPaymentsListComponent } from './payment-list.component';
import { PayDetailComponent } from './payment-detail.component';


@NgModule({
    declarations: [
        InvcPaymentsListComponent,
        PayDetailComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        NgxDatatableModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        InvcPaymentsListComponent,
        PayDetailComponent
    ]
})

export class PaymentModule { }
