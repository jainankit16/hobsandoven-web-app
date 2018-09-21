
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PMSRoutingModule } from './pms.routes';
import { MSPSharedModule } from './shared/msp-shared.module';
import { TemplatesModule } from '../../shared/views/pms/dashboard-pms/templates/templates.module';
import { SharedModule } from '../../shared/components/shared.module';
import { DashboardPMSModule } from '../../shared/views/pms/dashboard-pms/dashboard-pms.module';
import { PMSSharedModule } from '../../shared/pms-components/pms-shared.module';
import { SubNavigationModule } from '../../shared/pms-components/sub-navigation/sub-navigation.module';
import { ServiceLocatorFslModule } from './service-locator/service-locator-fsl.module';
import { EdiTransactionModule } from './../../shared/views/list-edi-transaction/edi-transaction.module';
import { SharedService } from '../../shared/services/pms/shared.services';
import { PreloaderService } from '../../shared/services/preloader.service';

import { PMSComponent } from './pms.component';
import { UtilityService } from '../../shared/services/utility.service';

@NgModule({
    declarations: [
        PMSComponent
    ],
    imports: [
        PMSRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        PMSSharedModule,
        TemplatesModule,
        MSPSharedModule,
        SubNavigationModule,
        DashboardPMSModule,
        ServiceLocatorFslModule,
        EdiTransactionModule
    ],
    exports: [
        TemplatesModule
    ],
    providers: [
        SharedService,
        PreloaderService,
        UtilityService
    ]
})
export class PMSModule {
}
