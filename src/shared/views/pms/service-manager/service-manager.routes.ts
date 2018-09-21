import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, ActiveUserAuthGuard } from '../../../services/auth-guard.service';
import { ServiceManagerComponent } from './service-manager.component';
import { ServiceManagerDashboardComponent } from './service-manager-dashboard/service-manager-dashboard.component';
import { ServiceManagerOrdersListComponent } from './service-manager-orders-list/service-manager-orders-list.component';
import { ServiceManagerFeedsListComponent } from './service-manager-feeds-list/service-manager-feeds-list.component';
import { ServiceManagerDetailsComponent } from './service-manager-details/service-manager-details.component';

const defaultTitle = ' - ServiceO';

export const serviceManagerRoutes: Routes = [
    {
        path: '',
        component: ServiceManagerComponent,
        children:
            [
                {
                    path: '',
                    canActivate: [AuthGuard],
                    component: ServiceManagerDashboardComponent,
                    data: {
                        title: 'Service Manager ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'orders-list',
                    canActivate: [AuthGuard],
                    component: ServiceManagerOrdersListComponent,
                    data: {
                        title: 'Service Manager ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'feeds-list',
                    canActivate: [AuthGuard],
                    component: ServiceManagerFeedsListComponent,
                    data: {
                        title: 'Service Manager ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'list-details/:id',
                    canActivate: [AuthGuard],
                    component: ServiceManagerDetailsComponent,
                    data: {
                        title: 'Service Manager ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: '**',
                    redirectTo: '/page-not-found'
                }
            ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(serviceManagerRoutes)
    ],
    exports: [
        RouterModule
    ],
})

export class ServiceManagerRoutingModule {

}
