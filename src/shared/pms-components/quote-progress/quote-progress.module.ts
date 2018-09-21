import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { QuoteProgressComponent } from './quote-progress.component';

@NgModule({
    declarations: [
        QuoteProgressComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        QuoteProgressComponent
    ],
    schemas: []
})

export class QuoteProgressModule { }
