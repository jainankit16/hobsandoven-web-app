import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ServiceManagerFiltersModule } from '../shared/service-manager-filters/service-manager-filters.module';
import { ServiceManagerFeedsListComponent } from './service-manager-feeds-list.component';
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
        ServiceManagerFeedsListComponent
    ],
    exports: [
        ServiceManagerFeedsListComponent
    ]
})

export class ServiceManagerFeedsListModule { }
