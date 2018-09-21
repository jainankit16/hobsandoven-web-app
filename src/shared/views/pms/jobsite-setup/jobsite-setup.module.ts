import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PMSSharedModule } from '../../../pms-components/pms-shared.module';
import { TopWizardPanelModule } from '../../../pms-components/top-wizard-panel/top-wizard-panel.module';
import { ServiceZoneModule } from '../../../pms-components/service-zone/service-zone.module';
import { QuoteProgressModule } from '../../../pms-components/quote-progress/quote-progress.module';
import { CreateJobsiteModule } from '../../../pms-components/create-jobsite/create-jobsite.module';
import { JobsiteMapModule } from '../../../pms-components/jobsite-map/jobsite-map.module';

import { jobsiteSetupRouting } from './jobsite-setup.routes';
import { JobsiteSetupComponent } from './jobsite-setup.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { DefaultProfileComponent } from './default-profile/default-profile.component';
import { JobsiteListComponent } from './jobsite-list/jobsite-list.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        NgxDatatableModule,
        jobsiteSetupRouting,
        PMSSharedModule,
        TopWizardPanelModule,
        ServiceZoneModule,
        QuoteProgressModule,
        CreateJobsiteModule,
        JobsiteMapModule
    ],
    declarations: [
        JobsiteSetupComponent,
        AllOrdersComponent,
        DefaultProfileComponent,
        JobsiteListComponent
    ]
})
export class JobsiteSetupModule { }
