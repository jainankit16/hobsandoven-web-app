import { PagesError404Component } from '../../shared/views/error/404/pages-error-404/pages-error-404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../shared/services/auth-guard.service';
import { VMSComponent } from './vms.component';
import { DashboardComponent } from '../../shared/views/vms/pages/dashboard/dashboard.component';

const defaultTitle = ' - ServiceO';

export const vmsRoutes: Routes = [
    {
        path: '',
        component: VMSComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Dashborad ' + defaultTitle,
                    permissions: ['vendor', 'internal', 'customer']
                }
            },
            {
                path: 'jobs',
                loadChildren: '../../shared/views/vms/jobs/jobs.module#JobsModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Jobs ' + defaultTitle,
                    permissions: ['vendor', 'internal']
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
                path: '**',
                redirectTo: 'page-not-found'
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(vmsRoutes)
    ],
    exports: [
        RouterModule
    ],
})
export class VMSRoutingModule {
}
