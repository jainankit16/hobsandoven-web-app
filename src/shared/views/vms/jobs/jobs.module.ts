import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguiMapModule } from '@ngui/map'; // Google nguimap integration
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JobsRoutingModule } from './jobs.routing';
import { JobDetailModule } from './job-detail/job-detail.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { JobsHomeComponent } from './jobs-home/jobs-home.component';
import { JobsDashboardComponent } from './jobs-dashboard/jobs-dashboard.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';

import { environment } from 'environments/environment';

@NgModule({
    imports: [
        CommonModule,
        JobsRoutingModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        VirtualScrollModule,
        NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=' + environment.googleMapKey }),
        JobDetailModule,
        NgxDatatableModule
    ],
    declarations: [
        JobsHomeComponent,
        JobsDashboardComponent,
        JobsListComponent
    ],
    schemas: []
})

export class JobsModule {

}
