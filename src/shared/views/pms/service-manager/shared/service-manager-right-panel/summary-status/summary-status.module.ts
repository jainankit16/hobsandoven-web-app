import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { SummaryStatusComponent } from './summary-status.component';

@NgModule({
    declarations: [
        SummaryStatusComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        SummaryStatusComponent
    ],
    schemas: []
})

export class SummaryStatusModule { }
