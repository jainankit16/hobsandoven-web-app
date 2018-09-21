import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { WorkersRoutingModule } from './workers.routing';

import { WorkerHomeComponent } from './workers-home/worker-home.component';
import { WorkerListComponent } from './workers-list/worker-list.component';
import { WorkerDetailComponent } from './workers-detail/worker-detail.component';
import { SharedModule } from '../../../shared/components/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule,
        WorkersRoutingModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxDatatableModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    declarations: [
        WorkerDetailComponent,
        WorkerListComponent,
        WorkerHomeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class WorkersModule {
}
