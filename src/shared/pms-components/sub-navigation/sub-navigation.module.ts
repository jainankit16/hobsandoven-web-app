import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PmsMenuComponent } from './pms/pms-menu.component';
import { PartnerMenuComponent } from './partner/partner-menu.component';

@NgModule({
    declarations: [
        PmsMenuComponent,
        PartnerMenuComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        RouterModule
    ],
    exports: [
        PmsMenuComponent,
        PartnerMenuComponent
    ],
    schemas: []
})

export class SubNavigationModule { }
