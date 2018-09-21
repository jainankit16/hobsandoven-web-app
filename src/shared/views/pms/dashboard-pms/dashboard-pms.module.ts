import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PipeModule } from '../../../pipe/pipe.module';
import { DetailModalModule } from '../../../pms-components/detail-modal/detail-modal.module';
import { DialogModalModule } from '../../../pms-components/dialog-modal/dialog-modal.module';
import { TemplatesModule } from './templates/templates.module';
import { PMSSharedModule } from '../../../../shared/pms-components/pms-shared.module';

import { ModalService } from '../../../services/modal.service';

import { DashboardPMSComponent } from './dashboard-pms.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PMSSharedModule,
        PipeModule,
        TemplatesModule
    ],
    declarations: [
        DashboardPMSComponent,
        SidebarComponent
    ],
    exports: [
        DashboardPMSComponent,
        SidebarComponent,
        TemplatesModule
    ],
    providers: [ModalService]
})

export class DashboardPMSModule { }
