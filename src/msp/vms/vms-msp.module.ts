
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VMSRoutingModule } from './vms.routes';
import { VMSComponent } from './vms.component';
import { DashboardModule } from './../../shared/views/vms/pages/dashboard/dashboard.module';
import { SharedMSPModule } from '../shared/shared-msp.module';

import { PreloaderService } from '../../shared/services/preloader.service';
import { SharedModule } from '../../shared/components/shared.module';
import { ConfirmDialogModule } from '../../shared/components/confirm-dialog/confirm-dialog.module';
import { UtilityService } from '../../shared/services/utility.service';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { SharedService } from 'shared/services/pms/shared.services';
import { EdiTransactionModule } from './../../shared/views/list-edi-transaction/edi-transaction.module';

@NgModule({
    declarations: [
        VMSComponent
    ],
    imports: [
        VMSRoutingModule,
        CommonModule,
        DashboardModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        SharedMSPModule,
        ConfirmDialogModule,
        EdiTransactionModule
    ],
    providers: [
        PreloaderService,
        UtilityService,
        ConfirmDialogService,
        SharedService
    ]
})
export class VMSModule {
}
