import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SDKBrowserModule } from './../shared/sdk/index';
import { AlertModule } from '../shared/components/alert/alert.module';
import { PreloaderModule } from '../shared/components/preloader/preloader.module';

import { ModalService } from '../shared/services/modal.service';
import { AlertService } from '../shared/services/alert.service';
import { PreloaderService } from '../shared/services/preloader.service';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule,
        SDKBrowserModule.forRoot(),
        AlertModule,
        PreloaderModule,
        AppRoutingModule
    ],
    providers: [
        ModalService,
        AlertService,
        PreloaderService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
