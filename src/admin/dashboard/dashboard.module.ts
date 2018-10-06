
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

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
        SharedModule,
        DashboardRoutingModule
    ],
    providers: []
})

export class DashboardModule {
}
