import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguiMapModule } from '@ngui/map';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { jobLocationMapService } from '../services/pms/job-location.service';
import { QuoteService } from '../services/pms/quote.service';

import { ProgramComponent } from './programs/program.component';
import { DetailModalModule } from './detail-modal/detail-modal.module';
import { DialogModalModule } from './dialog-modal/dialog-modal.module';
import { LeftTabContentModule } from './left-tab-content/left-tab-content.module';

import { environment } from 'environments/environment';

@NgModule({
    declarations: [
        ProgramComponent,
    ],
    imports: [
        NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=' + environment.googleMapKey }),
        CommonModule,
        NgbModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        DetailModalModule,
        DialogModalModule,
        LeftTabContentModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    exports: [
        DetailModalModule,
        DialogModalModule,
        LeftTabContentModule,
        ProgramComponent
    ],
    providers: [
        QuoteService,
        jobLocationMapService
    ]
})

export class PMSSharedModule { }
