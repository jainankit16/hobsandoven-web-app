import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PriceListsRoutingModule } from './pricelists.routing';
import { PriceListHomeComponent } from './pricelist-home/pricelist-home.component';
import { PriceListComponent } from './pricelists/pricelists.component';

// import { PriceListDetailComponent } from './pricelist-detail/pricelist-detail.component';
// import { PriceListItemComponent } from '../pricelistitems/pricelistitems/pricelistitems.component';
// import { PriceListItemDetailComponent } from '../pricelistitems/pricelistitem-detail/pricelistitem-detail.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { GridviewModule } from '../../../shared/components/gridview/gridview.module';
@NgModule({
    imports: [
        CommonModule,
        PriceListsRoutingModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        GridviewModule
    ],
    declarations: [
        PriceListComponent,
       // PriceListDetailComponent,
        PriceListHomeComponent,
        // PriceListItemComponent,
        // PriceListItemDetailComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PriceListsModule {
}
