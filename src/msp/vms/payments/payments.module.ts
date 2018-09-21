import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PaymentModule } from 'shared/components/payment/payment.module';

import { PaymentsRoutingModule } from './payments.routing';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { PaymentsHomeComponent } from './payments-home/payments-home.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        PaymentsRoutingModule,
        PaymentModule
    ],
    declarations: [
        PaymentsListComponent,
        PaymentsHomeComponent
    ],
    exports: [],
    schemas: []
})

export class PaymentsModule { }
