import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { jobLocationMapService } from '../../../../shared/services/pms/job-location.service';

import { PMSSharedModule } from '../../../../shared/pms-components/pms-shared.module';
import { ServiceZoneModule } from '../../../../shared/pms-components/service-zone/service-zone.module';
import { CreateJobsiteModule } from '../../../../shared/pms-components/create-jobsite/create-jobsite.module';
import { UploadJobsiteModule } from '../../../../shared/pms-components/upload-jobsite/upload-jobsite.module';
import { UploadFinalJobsiteModule } from '../../../../shared/pms-components/upload-finaljobsite/upload-finaljobsite.module';
import { MSPSharedModule } from '../../shared/msp-shared.module';
/*All component imported here*/
import { ProgramSetupComponent } from './program-setup.component';
import { JobsiteOptionComponent } from './sub-program-setup/jobsite-option/jobsite-option.component';
import { ListJobSitesComponent } from './sub-program-setup/list-jobsite/list-of-jobsites.component';
import { DispatchProfileComponent } from './sub-program-setup/dispatch-profiles/dispatch-profiles.component';
import { PipeModule } from '../../../../shared/pipe/pipe.module';
import {AlertModule} from '../../../../shared/components/alert/alert.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        FormsModule,
        NgbModule,
        CommonModule,
        ReactiveFormsModule,
        PMSSharedModule,
        MSPSharedModule,
        PipeModule,
        ServiceZoneModule,
        CreateJobsiteModule,
        NgxDatatableModule,
        AlertModule,
        UploadJobsiteModule,
        UploadFinalJobsiteModule

    ],
    exports: [
        ListJobSitesComponent
    ],
    declarations: [
        ProgramSetupComponent,
        JobsiteOptionComponent,
        ListJobSitesComponent,
        DispatchProfileComponent
    ],
    providers: [jobLocationMapService]
})
export class ProgramSetupModule { }
