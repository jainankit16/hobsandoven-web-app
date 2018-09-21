import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common';
import { DeliveryManagerComponent } from './delivery-manager.component';
import { DeliveryManagerLeftPanelComponent } from './shared/delivery-manager-left-panel/delivery-manager-left-panel.component';

import { DeliveryManagerRoutingModule } from './delivery-manager.routes';
import { PipeModule } from './../../../shared/pipe/pipe.module';
import { AlertModule } from './../../../shared/components/alert/alert.module'
import { WorkplaceSetupModule } from './workplace-setup/workplace-setup.module'

@NgModule({
  imports: [
    CommonModule,
    DeliveryManagerRoutingModule,
    NgbModule,
    PipeModule,
    WorkplaceSetupModule,
    AlertModule
  ],
  declarations: [
    DeliveryManagerComponent,
    DeliveryManagerLeftPanelComponent
  ],
  exports: [
    DeliveryManagerComponent,
    DeliveryManagerLeftPanelComponent,
    AlertModule

  ]
})
export class DeliveryManagerModule { }
