import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PMSSharedModule } from '../../../pms-components/pms-shared.module';
import { TopWizardPanelModule } from '../../../pms-components/top-wizard-panel/top-wizard-panel.module';

import { ProgramManagerRoute } from './program-manager.routes';
import { ProgramManagerComponent } from './program-manager.component';
import { ProgramsListComponent } from './programs-list/programs-list.component';
import { ProgramDetailsComponent } from './programs-list/program-details/program-details.component';
import { PriceListComponent } from './price-list/price-list.component';
import { ApprovedVendorComponent } from './programs-list/approved-vendor/approved-vendor.component';
import { ProjectWorkerComponent } from './programs-list/project-worker/project-worker.component';

@NgModule({
    declarations: [
        ProgramManagerComponent,
        ProgramsListComponent,
        ProgramDetailsComponent,
        PriceListComponent,
        ApprovedVendorComponent,
        ProjectWorkerComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        NgbModule,
        NgxDatatableModule,
        ProgramManagerRoute,
        PMSSharedModule,
        TopWizardPanelModule
    ],
    providers: []
})

export class ProgramManagerModule { }
