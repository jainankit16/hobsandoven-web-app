import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RightHomeContentComponent } from './right-home-content.component';
import { QuoteHeaderComponent } from './summary/quote-header/quote-header.component';
import { ServiceProviderComponent } from './summary/provider-map/service-provider-sites.component';
import { SummaryComponent } from './summary/summary.component';
import { HealthCheckComponent } from './health-check/health-check.component';
import { ComplianceComponent } from './health-check/compliance/compliance.component';
import { JobsiteLocationInformationComponent } from './summary/jobsite-information/jobsite-location-information.component';
import { PMSSharedModule } from '../../../../shared/pms-components/pms-shared.module';
import { QuoteProgressModule } from '../../../../shared/pms-components/quote-progress/quote-progress.module';
import { JobsiteMapModule } from '../../../../shared/pms-components/jobsite-map/jobsite-map.module';
import { ConfigureModule } from '../../shared/configure/configure.module';
import { NguiMapModule } from '@ngui/map';
import { environment } from 'environments/environment';
import { PipeModule } from '../../../../shared/pipe/pipe.module';

@NgModule({
    declarations: [
        QuoteHeaderComponent,
        ServiceProviderComponent,
        RightHomeContentComponent,
        SummaryComponent,
        HealthCheckComponent,
        ComplianceComponent,
        JobsiteLocationInformationComponent
    ],
    imports: [NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=' + environment.googleMapKey }),
        CommonModule,
        NgbModule,
        ConfigureModule,
        PMSSharedModule,
        PipeModule,
        QuoteProgressModule,
        JobsiteMapModule
    ],
    exports: [
        QuoteHeaderComponent,
        ServiceProviderComponent,
        RightHomeContentComponent,
        JobsiteLocationInformationComponent,
        ConfigureModule
    ]
})
export class RightContentModule { }
