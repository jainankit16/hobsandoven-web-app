import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipeModule } from '../../pipe/pipe.module';

import { UploadJobsiteComponent } from './upload-jobsite.component';
import { UploadFinalJobsiteModule } from '../../../shared/pms-components/upload-finaljobsite/upload-finaljobsite.module';

@NgModule({
    declarations: [
        UploadJobsiteComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule,
        UploadFinalJobsiteModule
    ],
    exports: [
        UploadJobsiteComponent
    ],
    schemas: []
})

export class UploadJobsiteModule { }
