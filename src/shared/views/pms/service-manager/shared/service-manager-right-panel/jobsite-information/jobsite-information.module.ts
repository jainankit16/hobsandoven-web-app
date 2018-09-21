import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { DetailModalModule } from '../../../../../../pms-components/detail-modal/detail-modal.module';

import { JobsiteInformationComponent } from './jobsite-information.component';

@NgModule({
    declarations: [
        JobsiteInformationComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        DetailModalModule
    ],
    exports: [
        JobsiteInformationComponent
    ],
    schemas: []
})

export class JobsiteInformationModule { }
