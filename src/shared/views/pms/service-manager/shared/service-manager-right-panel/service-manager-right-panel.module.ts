import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CaseInformationModule } from './case-information/case-information.module';
import { SummaryStatusModule } from './summary-status/summary-status.module';
import { SummaryJobsiteModule } from './summary-jobsite/summary-jobsite.module';
import { SummaryFilesModule } from './summary-files/summary-files.module';
import { StandardServiceProfileModule } from './standard-service-profile/standard-service-profile.module';
import { QuoteProgressModule } from '../../../../../pms-components/quote-progress/quote-progress.module';
import { JobsiteInformationModule } from './jobsite-information/jobsite-information.module';
import { GovernanceDetailModule } from './governance-detail/governance-detail.module';
import { ActivityFeedModule } from './activity-feed/activity-feed.module';

import { ServiceManagerRightPanelComponent } from './service-manager-right-panel.component';

@NgModule({
    declarations: [
        ServiceManagerRightPanelComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        CaseInformationModule,
        SummaryStatusModule,
        SummaryJobsiteModule,
        SummaryFilesModule,
        StandardServiceProfileModule,
        QuoteProgressModule,
        JobsiteInformationModule,
        GovernanceDetailModule,
        ActivityFeedModule
    ],
    exports: [
        ServiceManagerRightPanelComponent
    ],
    schemas: []
})

export class ServiceManagerRightPanelModule { }
