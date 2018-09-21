import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TimecardsRoutingModule } from './timecards.routing';
import { TimecardModule } from '../../../shared/components/timecard/timecard.module';

import { TimeCardListHomeComponent } from '../timecards/timecardlist-home/timecardlist-home.component'
import { TimeCardListComponent } from '../timecards/timecardlist/timecardlist.component'

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        TimecardsRoutingModule,
        TimecardModule
    ],
    declarations: [
        TimeCardListHomeComponent,
        TimeCardListComponent
    ],
    exports: []
})

export class TimecardsModule { }
