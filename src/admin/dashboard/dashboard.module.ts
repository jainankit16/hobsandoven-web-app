
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AlertModule } from '../../shared/components/alert/alert.module';
import { PreloaderModule } from '../../shared/components/preloader/preloader.module';

import { ModalService } from '../../shared/services/modal.service';
import { AlertService } from '../../shared/services/alert.service';
import { PreloaderService } from '../../shared/services/preloader.service';

import { DashboardRoutingModule } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { LastMinuteDealsComponent } from './last-minute-deals/last-minute-deals.component';
import { SellerInquiryComponent } from './seller-inquiry/seller-inquiry.component';

@NgModule({
    declarations: [
        DashboardComponent,
        HomeComponent,
        LastMinuteDealsComponent,
        SellerInquiryComponent
    ],
    imports: [
        NgbModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AlertModule,
        PreloaderModule,
        DashboardRoutingModule
    ],
    providers: [
        ModalService,
        AlertService,
        PreloaderService
    ]
})

export class DashboardModule {
}
