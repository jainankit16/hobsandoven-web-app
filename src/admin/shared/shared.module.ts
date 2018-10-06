import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from '../../shared/components/alert/alert.module';
import { PreloaderModule } from '../../shared/components/preloader/preloader.module';

import { ModalService } from '../../shared/services/modal.service';
import { AlertService } from '../../shared/services/alert.service';
import { PreloaderService } from '../../shared/services/preloader.service';

import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

@NgModule({
    declarations: [
        HeaderNavigationComponent,
        UserLoginComponent,
        UserSignupComponent
    ],
    imports: [
        NgbModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        PreloaderModule,
    ],
    providers: [
        ModalService,
        AlertService,
        PreloaderService
    ],
    exports: [
        NgbModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        PreloaderModule,
        HeaderNavigationComponent,
        UserLoginComponent
    ]
})

export class SharedModule { }
