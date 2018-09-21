import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../components/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeedsRoutingModule } from './feeds.routing';
import { FeedsListComponent } from './feeds-list/feeds-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FeedModule } from 'shared/components/feed/feed.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
    imports: [
        FeedsRoutingModule,
        CommonModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgSelectModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgxDatatableModule,
        FeedModule,
        DirectivesModule
    ],
    declarations: [
        FeedsListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeedsModule { }
