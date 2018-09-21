import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DetailModalModule } from './../detail-modal/detail-modal.module';

import { LeftTabContentComponent } from './left-tab-content.component';
import { ContentAccountComponent } from './contents/content-account.component';
import { ContentProgramsComponent } from './contents/content-programs.component';
import { ContentJobsiteComponent } from './contents/content-jobsite.component';
import { ContentQuoteComponent } from './contents/content-quote.component';
import { ContentWorkOrderComponent } from './contents/content-wo.component';
import { ContentPriceListsComponent } from './contents/content-price-lists.component';

import { JobsiteBackgroundDirective } from '../../directives/jobsiteBackground/jobsite-background.directive';

@NgModule({
    declarations: [
        ContentAccountComponent,
        ContentProgramsComponent,
        ContentJobsiteComponent,
        ContentQuoteComponent,
        ContentWorkOrderComponent,
        ContentPriceListsComponent,
        LeftTabContentComponent,
        JobsiteBackgroundDirective
    ],
    imports: [
        CommonModule,
        NgbModule,
        DetailModalModule
    ],
    exports: [
        ContentProgramsComponent,
        ContentJobsiteComponent,
        ContentQuoteComponent,
        ContentAccountComponent,
        ContentWorkOrderComponent,
        ContentPriceListsComponent,
        LeftTabContentComponent,
        JobsiteBackgroundDirective
    ]
})
export class LeftTabContentModule { }
