import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguiMapModule } from '@ngui/map';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PMSSharedModule } from '../../../pms-components/pms-shared.module';
import { TopWizardPanelModule } from '../../../pms-components/top-wizard-panel/top-wizard-panel.module';
import { OrderBy } from '../../../pipe/order/orderby.pipe';
import { UniquePipe } from '../../../pipe/unique/unique.pipe';

import { CoverageMapRoute } from './coverage-map.routing';
import { CoverageMapComponent } from './coverage-map.component';
import { ServiceProviderCostComponent } from './service-provider-cost/service-provider-cost.component';
import { environment } from 'environments/environment';

@NgModule({
    imports: [
        NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=' + environment.googleMapKey }),
        CoverageMapRoute,
        FormsModule,
        NgbModule,
        CommonModule,
        ReactiveFormsModule,
        PMSSharedModule,
        TopWizardPanelModule,
        NgxDatatableModule
    ],
    declarations: [
        CoverageMapComponent,
        ServiceProviderCostComponent,
        OrderBy
    ],
    providers: [UniquePipe]
})
export class CoverageMapModule { }
