import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { NavigationModule } from './header-navigation/navigation.module';
import { AlertModule } from './alert/alert.module';
import { PreloaderModule } from './preloader/preloader.module';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ToolbarModule } from './toolbar/toolbar.module';
@NgModule({
    declarations: [
        BreadcrumbComponent
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
        NavigationModule,
        AlertModule,
        PreloaderModule,
        ToolbarModule
    ],
    exports: [
        NavigationModule,
        AlertModule,
        PreloaderModule,
        BreadcrumbComponent,
        ToolbarModule
    ]
})

export class SharedModule { }
