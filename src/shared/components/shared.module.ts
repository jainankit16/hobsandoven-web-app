import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AlertModule } from './alert/alert.module';
import { PreloaderModule } from './preloader/preloader.module';

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        PipeModule,
        NgSelectModule,
        QuillModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        AlertModule,
        PreloaderModule
    ],
    exports: [
        AlertModule,
        PreloaderModule
    ]
})

export class SharedModule { }
