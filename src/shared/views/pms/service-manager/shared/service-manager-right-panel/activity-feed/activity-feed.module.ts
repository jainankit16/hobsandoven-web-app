import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ActivityFeedComponent } from './activity-feed.component';

@NgModule({
    declarations: [
        ActivityFeedComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        ActivityFeedComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ActivityFeedModule { }
