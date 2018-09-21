import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { PipeModule } from '../../pipe/pipe.module';

import { DocumentUploadComponent } from './document-upload.component';
import { DocumentListComponent } from './document-list.component';

@NgModule({
    declarations: [
        DocumentUploadComponent,
        DocumentListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxUploaderModule,
        NgbModule,
        PipeModule
    ],
    exports: [
        DocumentUploadComponent,
        DocumentListComponent
    ]
})

export class DocumentModule { }
