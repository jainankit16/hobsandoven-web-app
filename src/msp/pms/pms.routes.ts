import { PagesError404Component } from '../../shared/views/error/404/pages-error-404/pages-error-404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, ActiveUserAuthGuard } from '../../shared/services/auth-guard.service';
import { PMSComponent } from './pms.component';
import { DashboardPMSComponent } from '../../shared/views/pms/dashboard-pms/dashboard-pms.component';
import { ServiceLocatorFslComponent } from './service-locator/service-locator-fsl.component';
import { ListEdiTransactionComponent } from './../../shared/views/list-edi-transaction/list-edi-transaction.component';

const defaultTitle = ' - ServiceO';

export const pmsRoutes: Routes = [
    {
        path: '',
        component: PMSComponent,
        children:
            [
                { path: '', canActivate: [AuthGuard], component: DashboardPMSComponent },
                {
                    path: 'program-manager',
                    canActivate: [AuthGuard],
                    loadChildren: '../../shared/views/pms/program-manager/program-manager.module#ProgramManagerModule',
                    data: {
                        title: 'Program Manager ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'custom-case',
                    canActivate: [AuthGuard],
                    loadChildren: '../../shared/views/pms/custom-case/custom-case.module#CustomCaseModule',
                    data: {
                        title: 'Custom Case ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'configure',
                    canActivate: [AuthGuard],
                    loadChildren: './configure/csqd-configure.module#CsqdConfigureModule',
                    data: {
                        title: 'Configure ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'coverage-map',
                    canActivate: [AuthGuard],
                    loadChildren: '../../shared/views/pms/coverage-map/coverage-map.module#CoverageMapModule',
                    data: {
                        title: 'Field Service Anywhere ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'jobsite-setup',
                    canActivate: [AuthGuard],
                    loadChildren: '../../shared/views/pms/jobsite-setup/jobsite-setup.module#JobsiteSetupModule',
                    data: {
                        title: 'Jobsite Setup ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'service-manager',
                    canActivate: [AuthGuard],
                    loadChildren: '../../shared/views/pms/service-manager/service-manager.module#ServiceManagerModule',
                    data: {
                        title: 'Service Manager ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'billing-manager',
                    canActivate: [AuthGuard],
                    loadChildren: '../../shared/views/pms/billings/billings.module#BillingsModule',
                    data: {
                        title: 'Billing Invoice ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'service-locator-fsl',
                    canActivate: [AuthGuard],
                    component: ServiceLocatorFslComponent,
                    data: {
                        title: 'Field Service Anywhere' + defaultTitle,
                        permissions: ['internal']
                    }
                },
                {
                    path: 'delivery-manager',
                    canActivate: [AuthGuard],
                    loadChildren: './delivery-manager/delivery-manager.module#DeliveryManagerModule',
                    data: {
                        title: 'Delivery Manager ' + defaultTitle,
                        permissions: ['internal']
                    }
                },
                {
                    path: 'user-management',
                    loadChildren: '../../shared/views/admin/admin.module#AdminModule',
                    canActivate: [AuthGuard],
                    data: {
                        title: 'user-management ' + defaultTitle,
                        permissions: ['vendor', 'partner', 'internal'],
                        page: 'pms'
                    }
                },
                {
                    path: 'edi-transaction',
                    canActivate: [AuthGuard],
                    component: ListEdiTransactionComponent,
                    data: {
                        title: 'Manage EDI Transaction' + defaultTitle,
                        permissions: ['internal'],
                        adminAccessPermission: true
                    }
                },
            ]
    },
    {
        path: '**',
        redirectTo: '/page-not-found',
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(pmsRoutes)
    ],
    exports: [
        RouterModule
    ],
})
export class PMSRoutingModule {
}
