import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipeModule } from '../../pipe/pipe.module';

import { CreateJobsiteComponent } from './create-jobsite.component';

@NgModule({
    declarations: [
        CreateJobsiteComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule
    ],
    exports: [
        CreateJobsiteComponent
    ],
    schemas: []
})

export class CreateJobsiteModule { }
