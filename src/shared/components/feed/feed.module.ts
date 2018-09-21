import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeedComponent } from './feed.component';
import { FeedDetailComponent } from './feed-detail/feed-detail.component';

@NgModule({
    declarations: [
        FeedComponent,
        FeedDetailComponent
    ],
    imports: [
        CommonModule,
        NgxDatatableModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        FeedComponent,
        FeedDetailComponent
    ],
    schemas: []
})

export class FeedModule { }
