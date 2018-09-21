import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmSetupComponent } from './confirm-setup.component';
import { ProgramJobsiteSummaryComponent } from './program-jobsite-summary/program-jobsite-summary.component';
import { SalesPricingSummaryComponent } from './sales-pricing-summary/sales-pricing-summary.component';
import { AppointmentScheduleSummaryComponent } from './appointment-schedule-summary/appointment-schedule-summary.component';

@NgModule({
    imports: [
        CommonModule, NgbModule
    ],
    declarations: [
        ConfirmSetupComponent,
        ProgramJobsiteSummaryComponent,
        SalesPricingSummaryComponent,
        AppointmentScheduleSummaryComponent]
})
export class ConfirmSetupModule { }
