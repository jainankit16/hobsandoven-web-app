import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common';

import { AlertModule } from '../../../../shared/components/alert/alert.module'
import { TopProgressBarModule } from './shared/top-progress-bar/top-progress-bar.module';
import { PipeModule } from '../../../pipe/pipe.module';
import { ServiceManagerRoutingModule } from './service-manager.routes';
import { ServiceManagerDashboardModule } from './service-manager-dashboard/service-manager-dashboard.module';
import { ServiceManagerDetailsModule } from './service-manager-details/service-manager-details.module';
import { ServiceManagerFeedsListModule } from './service-manager-feeds-list/service-manager-feeds-list.module';
import { ServiceManagerOrdersListModule } from './service-manager-orders-list/service-manager-orders-list.module';

import { UtilityService } from '../../../services/utility.service';

import { ServiceManagerComponent } from './service-manager.component';

@NgModule({
    declarations: [
        ServiceManagerComponent,
    ],
    imports: [
        TopProgressBarModule,
        CommonModule,
        NgbModule,
        PipeModule,
        ServiceManagerRoutingModule,
        ServiceManagerDashboardModule,
        ServiceManagerDetailsModule,
        ServiceManagerFeedsListModule,
        ServiceManagerOrdersListModule,
        AlertModule
    ],
    exports: [
        ServiceManagerComponent,
        AlertModule
    ],
    providers: [
        UtilityService
    ]
})

export class ServiceManagerModule {

}
