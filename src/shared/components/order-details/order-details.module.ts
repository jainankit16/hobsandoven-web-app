import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OrderDetailsComponent } from './order-details.component';

@NgModule({
    declarations: [
        OrderDetailsComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        OrderDetailsComponent
    ]
})

export class OrderDetailsModule { }
