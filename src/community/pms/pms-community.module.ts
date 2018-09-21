import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PMSRoutingModule } from './pms.routes';
import { SharedModule } from '../../shared/components/shared.module';
import { PMSSharedModule } from '../../shared/pms-components/pms-shared.module';
import { SubNavigationModule } from '../../shared/pms-components/sub-navigation/sub-navigation.module';
import { DashboardPMSModule } from '../../shared/views/pms/dashboard-pms/dashboard-pms.module';

import { PreloaderService } from '../../shared/services/preloader.service';
import { SharedService } from '../../shared/services/pms/shared.services';

import { PMSComponent } from './pms.component';
import { UtilityService } from '../../shared/services/utility.service';

@NgModule({
    declarations: [
        PMSComponent
    ],
    imports: [
        CommonModule,
        PMSRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        PMSSharedModule,
        SubNavigationModule,
        DashboardPMSModule
    ],
    exports: [

    ],
    providers: [
        SharedService,
        PreloaderService,
        UtilityService
    ]
})
export class PMSModule {
}
