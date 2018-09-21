import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../components/shared.module';

import { AuthenticationComponent } from './authentication.component';

export const authenticationRoutes: Routes = [
    {
        path: '', component: AuthenticationComponent
    }
];

@NgModule({
    declarations: [
        AuthenticationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(authenticationRoutes),
        SharedModule
    ],
    exports: [
        AuthenticationComponent
    ]
})

export class AuthenticationModule { }
