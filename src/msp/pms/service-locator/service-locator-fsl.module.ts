import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NguiMapModule } from '@ngui/map';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UniquePipe } from '../../../shared/pipe/unique/unique.pipe';
import { environment } from 'environments/environment';
import { PMSSharedModule } from '../../../shared/pms-components/pms-shared.module';
import { ServiceLocatorFslComponent } from './service-locator-fsl.component';

@NgModule({
  imports: [
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=' + environment.googleMapKey }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PMSSharedModule,
    NgbModule
  ],
  declarations: [ServiceLocatorFslComponent],
  providers: [UniquePipe]
})
export class ServiceLocatorFslModule { }
