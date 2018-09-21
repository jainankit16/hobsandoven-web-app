import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from '../../../components/alert/alert.module';
import { PreloaderModule } from '../../../components/preloader/preloader.module';

import { ResetPasswordComponent, ForgotPasswordComponent } from './reset-password.component';

@NgModule({
    declarations: [
        ResetPasswordComponent,
        ForgotPasswordComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        AlertModule,
        PreloaderModule
    ],
    exports: [
        ResetPasswordComponent,
        ForgotPasswordComponent
    ],
    schemas: []
})

export class ResetPasswordModule { }
