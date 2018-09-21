import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { PriceListItemsRoutingModule } from './pricelistitems.routing';
import { PriceListItemHomeComponent } from './pricelistitem-home/pricelistitem-home.component';
@NgModule({
    imports: [
        CommonModule,
        PriceListItemsRoutingModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    declarations: [
        PriceListItemHomeComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PriceListItemsModule {
}
