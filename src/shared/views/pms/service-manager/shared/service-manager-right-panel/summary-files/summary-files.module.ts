import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { SummaryFilesComponent } from './summary-files.component';

@NgModule({
    declarations: [
        SummaryFilesComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        SummaryFilesComponent
    ],
    schemas: []
})

export class SummaryFilesModule { }
