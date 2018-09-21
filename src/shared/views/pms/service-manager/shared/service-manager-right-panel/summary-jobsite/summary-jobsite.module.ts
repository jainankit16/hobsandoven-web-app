import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { SummaryJobsiteComponent } from './summary-jobsite.component';

@NgModule({
    declarations: [
        SummaryJobsiteComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        SummaryJobsiteComponent
    ],
    schemas: []
})

export class SummaryJobsiteModule { }
