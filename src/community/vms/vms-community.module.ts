import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VMSRoutingModule } from './vms.routes';
import { VMSComponent } from './vms.component';
import { DashboardModule } from '../../shared/views/vms/pages/dashboard/dashboard.module';
import { SharedCommunityModule } from '../shared/shared-community.module';
import { ConfirmDialogModule } from '../../shared/components/confirm-dialog/confirm-dialog.module';
import { PreloaderService } from '../../shared/services/preloader.service';
import { SharedModule } from '../../shared/components/shared.module';
import { UtilityService } from '../../shared/services/utility.service';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { SharedService } from '../../shared/services/pms/shared.services';

@NgModule({
    declarations: [
        VMSComponent
    ],
    imports: [
        VMSRoutingModule,
        CommonModule,
        RouterModule,
        DashboardModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        SharedCommunityModule,
        ConfirmDialogModule
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
