import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { MSPSharedModule } from '../../shared/msp-shared.module';
import { PMSSharedModule } from '../../../../shared/pms-components/pms-shared.module';

import { ScheduleSetupComponent } from './schedule-setup.component';

@NgModule({
    imports: [FormsModule,
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
        PMSSharedModule,
        MSPSharedModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    declarations: [ScheduleSetupComponent]
})
export class ScheduleSetupModule { }
