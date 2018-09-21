import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ServiceManagerFiltersComponent } from './service-manager-filters.component';

@NgModule({
    declarations: [
        ServiceManagerFiltersComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        RouterModule,
        FormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    exports: [
        ServiceManagerFiltersComponent
    ],
    schemas: []
})

export class ServiceManagerFiltersModule { }
