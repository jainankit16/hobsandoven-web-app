import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderDetailsModule } from 'shared/components/order-details/order-details.module';
import { InvoiceModule } from 'shared/components/invoice/invoice.module';
import { SharedService } from 'shared/services/pms/shared.services';

import { OrdersRoutingModule } from './orders.routing';
import { OrdersHomeComponent } from './orders-home/orders-home.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

@NgModule({
    declarations: [
        OrdersListComponent,
        OrdersHomeComponent,
    ],
    imports: [
        CommonModule,
        OrdersRoutingModule,
        NgbModule.forRoot(),
        OrderDetailsModule,
        InvoiceModule,
        NgxDatatableModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    schemas: [],
    providers: [SharedService]
})

export class OrdersModule { }
