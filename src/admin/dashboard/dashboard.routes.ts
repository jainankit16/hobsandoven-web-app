import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { LastMinuteDealsComponent } from './last-minute-deals/last-minute-deals.component';
import { SellerInquiryComponent } from './seller-inquiry/seller-inquiry.component';

export const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'last-minute-deals',
                component: LastMinuteDealsComponent
            },
            {
                path: 'seller-enquiry',
                component: SellerInquiryComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class DashboardRoutingModule {
}
