import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ServiceManagerFiltersModule } from '../shared/service-manager-filters/service-manager-filters.module';

import { ServiceManagerOrdersListComponent } from './service-manager-orders-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DirectivesModule } from '../../../../directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        RouterModule,
        ServiceManagerFiltersModule,
        NgxDatatableModule,
        DirectivesModule,
        FormsModule, OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    declarations: [
        ServiceManagerOrdersListComponent
    ],
    exports: [
        ServiceManagerOrdersListComponent
    ]
})

export class ServiceManagerOrdersListModule { }
