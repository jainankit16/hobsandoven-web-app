import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ServiceManagerLeftPanelModule } from '../shared/service-manager-left-panel/service-manager-left-panel.module';

import { ServiceManagerDashboardComponent } from './service-manager-dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        NgxChartsModule,
        ServiceManagerLeftPanelModule
    ],
    declarations: [
        ServiceManagerDashboardComponent
    ],
    exports: [
        ServiceManagerDashboardComponent
    ]
})

export class ServiceManagerDashboardModule { }
