import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridviewComponent } from './gridview.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PriceListDetailComponent } from '../../../msp/vms/pricelists/pricelist-detail/pricelist-detail.component';
import { PriceListItemComponent } from '../../../msp/vms/pricelistitems/pricelistitems/pricelistitems.component';
import { PriceListItemDetailComponent } from '../../../msp/vms/pricelistitems/pricelistitem-detail/pricelistitem-detail.component';
import { AccountDetailComponent } from '../../../msp/vms/accounts/account-detail/account-detail.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    declarations: [
        GridviewComponent,
        PriceListDetailComponent,
        PriceListItemComponent,
        PriceListItemDetailComponent,
        AccountDetailComponent
    ],
    exports: [
         GridviewComponent
    ],
    schemas: []
})
export class GridviewModule {
}
