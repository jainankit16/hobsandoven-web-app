import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingsListComponent } from './billings-list/billings-list.component';
import { BillingsRoute } from './billings.routing';
import { PMSSharedModule } from '../../../pms-components/pms-shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
    imports: [
        PMSSharedModule,
        BillingsRoute,
        FormsModule,
        NgbModule,
        CommonModule,
        ReactiveFormsModule,
        NgxDatatableModule],
    declarations: [
        BillingsListComponent
    ]
})
export class BillingsModule { }
