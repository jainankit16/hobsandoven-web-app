import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account.routing';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
// import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountsHomeComponent } from './accounts-home/accounts-home.component';
import { GridviewModule } from '../../../shared/components/gridview/gridview.module';
@NgModule({
    imports: [CommonModule,
        AccountRoutingModule,
        NgbModule.forRoot(),
        NgxDatatableModule,
        GridviewModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AccountsListComponent,
        // AccountDetailComponent,
        AccountsHomeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
