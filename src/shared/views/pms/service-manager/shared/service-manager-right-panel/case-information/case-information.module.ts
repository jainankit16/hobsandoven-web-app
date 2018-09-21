import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseInformationComponent } from './case-information.component';

@NgModule({
    declarations: [
        CaseInformationComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CaseInformationComponent
    ],
    schemas: []
})

export class CaseInformationModule { }
