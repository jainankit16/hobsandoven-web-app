import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { CustomCaseRoute } from './custom-case.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PMSSharedModule } from '../../../pms-components/pms-shared.module';
import { QuoteProgressModule } from '../../../pms-components/quote-progress/quote-progress.module';
import { JobsiteMapModule } from '../../../pms-components/jobsite-map/jobsite-map.module';
import { ProgressBarComponent } from './create-case/progress-bar/progress-bar.component';
import { CustomCaseComponent } from './custom-case.component';
import { CreateCaseComponent } from './create-case/create-case.component';
import { RightPanelComponent } from './create-case/right-panel/right-panel.component';
import { PricingIncidentComponent } from './create-case/right-panel/pricing/pricing-incident.component';
import { NoWhiteSpaceDirective } from '../../../directives/no-white-space/no-white-space.directive';
import { QuillModule } from 'ngx-quill';
import { PipeModule } from '../../../pipe/pipe.module';

@NgModule({
    declarations: [
        CustomCaseComponent,
        CreateCaseComponent,
        RightPanelComponent,
        ProgressBarComponent,
        PricingIncidentComponent,
        NoWhiteSpaceDirective
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        CustomCaseRoute,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgbModule,
        QuillModule,
        PMSSharedModule,
        PipeModule,
        QuoteProgressModule,
        JobsiteMapModule
    ]
})
export class CustomCaseModule { }
