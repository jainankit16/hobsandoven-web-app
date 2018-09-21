import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule} from '@ng-select/ng-select';
import { InvoiceModule } from '../invoice/invoice.module';

import { TimecardAddComponent } from './timecard-add.component';
import { TimeCardDetailComponent } from './timecard-details.component';
import { TimecardListComponent } from './timecard-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
    declarations: [
        TimecardAddComponent,
        TimeCardDetailComponent,
        TimecardListComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgSelectModule,
        NgxDatatableModule,
        InvoiceModule,
        DirectivesModule
    ],
    exports: [
        TimecardAddComponent,
        TimeCardDetailComponent,
        TimecardListComponent
    ]
})
export class TimecardModule {
}
