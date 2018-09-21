import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common';

import { DetailsTabsetComponent } from './details-tabset.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule
    ],
    declarations: [
        DetailsTabsetComponent
    ],
    exports: [
        DetailsTabsetComponent
    ]
})

export class DetailsTabsetModule { }
