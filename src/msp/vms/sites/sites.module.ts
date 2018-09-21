import { NgModule , CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesRoutingModule } from './sites.routing';
import { SitesComponent } from './sites.component';
@NgModule({
  imports: [
    CommonModule,
    SitesRoutingModule
  ],
  declarations: [
      SitesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class SitesModule { }
