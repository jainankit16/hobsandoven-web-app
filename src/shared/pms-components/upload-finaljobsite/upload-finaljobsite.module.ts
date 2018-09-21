import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipeModule } from '../../pipe/pipe.module';

import { UploadFinalJobsiteComponent } from './upload-finaljobsite.component';

@NgModule({
    declarations: [
        UploadFinalJobsiteComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule
    ],
    exports: [
        UploadFinalJobsiteComponent
    ],
    schemas: []
})

export class UploadFinalJobsiteModule { }
