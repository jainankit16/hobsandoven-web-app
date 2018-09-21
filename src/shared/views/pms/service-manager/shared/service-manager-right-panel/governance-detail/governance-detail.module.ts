import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { GovernanceDetailComponent } from './governance-detail.component';

@NgModule({
    declarations: [
        GovernanceDetailComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        GovernanceDetailComponent
    ],
    schemas: []
})

export class GovernanceDetailModule { }
