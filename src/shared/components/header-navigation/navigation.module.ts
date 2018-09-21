import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PipeModule } from '../../pipe/pipe.module';
import { NotificationModule } from '../notification/notification.module';
import { ResetPasswordModule } from '../../views/users/reset-password/reset-password.module';

import { NavigationComponent } from './navigation.component';

@NgModule({
    declarations: [
        NavigationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        NgxDatatableModule,
        PipeModule,
        NotificationModule,
        ResetPasswordModule
    ],
    exports: [
        NavigationComponent
    ],
    schemas: []
})

export class NavigationModule { }
