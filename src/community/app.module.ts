import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/components/shared.module';
import { SDKBrowserModule } from './../shared/sdk/index';
import { Error404Module } from '../shared/views/error/404/404.module';
import { Error403Module } from '../shared/views/error/403/403.module';
import { DownloadsModule } from './../shared/views/downloads/downloads.module';

import { AppResolver } from './../shared/services/app.resolver';
import { AppStateService } from './../shared/services/app-state.service';
import { LoopBackAuth } from './../shared/sdk/services/core/auth.service';
import { AuthGuard, ActiveUserAuthGuard } from './../shared/services/auth-guard.service';
import { AuthService } from './../shared/services/authentication.service';
import { AuthorizationService } from '../shared/services/authorization.service';
import { CommonService } from './../shared/services/common.service';
import { ModalService } from './../shared/services/modal.service';
import { AlertService } from './../shared/services/alert.service';
import { PreloaderService } from './../shared/services/preloader.service';
import { WorkflowService } from './../shared/services/workflow.service';
import { MessageService } from './../shared/services/message.service';
import { DocumentService } from '../shared/services/document.service';
import { DepartmentService } from '../shared/services/department.service';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

import { DataFormatter } from './../shared/libs/dataFormatter';
import { SocketService } from './../shared/services/socket.service';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        SDKBrowserModule.forRoot(),
        RouterModule,
        AppRoutingModule,
        SharedModule,
        Error404Module,
        Error403Module,
        HttpClientModule,
        DownloadsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorizationService,
            multi: true
        },
        AppStateService,
        AuthGuard,
        AppResolver,
        AuthService,
        AlertService,
        ActiveUserAuthGuard,
        CommonService,
        ModalService,
        PreloaderService,
        WorkflowService,
        MessageService,
        DocumentService,
        DepartmentService,
        DataFormatter,
        SocketService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
