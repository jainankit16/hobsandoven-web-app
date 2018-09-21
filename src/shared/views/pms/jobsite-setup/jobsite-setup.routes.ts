import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard, ActiveUserAuthGuard } from '../../../services/auth-guard.service';
import { JobsiteSetupComponent } from './jobsite-setup.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';


export const jobsiteSetupRoutes: Routes = [
    {
        path: '',
        component: JobsiteSetupComponent,
        children:
            [
                { path: '', canActivate: [AuthGuard], component: AllOrdersComponent },
                {
                    path: 'orders', canActivate: [AuthGuard], component: AllOrdersComponent,
                    data: {
                        permissions: ['partner', 'internal']
                    }
                },
            ]
    },
    {
        path: '**',
        redirectTo: '/page-not-found'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(jobsiteSetupRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class jobsiteSetupRouting { }

