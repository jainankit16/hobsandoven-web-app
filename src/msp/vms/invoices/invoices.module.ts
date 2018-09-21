import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InvoiceModule } from 'shared/components/invoice/invoice.module';

import { InvoicesRoutingModule } from './invoices.routing';
import { InvoicesHomeComponent } from './invoices-home/invoices-home.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';

@NgModule({
    imports: [
        InvoicesRoutingModule,
        CommonModule,
        NgbModule.forRoot(),
        InvoiceModule
    ],
    declarations: [
        InvoicesListComponent,
        InvoicesHomeComponent
    ],
    exports: [],
    schemas: []
})

export class InvoicesModule { }
