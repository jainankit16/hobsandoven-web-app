import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FeedModule } from '../feed/feed.module';

import { FeedTimelineComponent } from './feed-timeline.component';

@NgModule({
    declarations: [
        FeedTimelineComponent
    ],
    imports: [
        CommonModule,
        FeedModule
    ],
    exports: [
        FeedTimelineComponent
    ],
    schemas: []
})

export class FeedTimelineModule { }
