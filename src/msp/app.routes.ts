import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, ActiveUserAuthGuard } from './../shared/services/auth-guard.service';
import { AppResolver } from '../shared/services/app.resolver';

import { PagesError404Component } from '../shared/views/error/404/pages-error-404/pages-error-404.component';
import { PagesError403Component } from '../shared/views/error/403/pages-error-403/pages-error-403.component';
import { ResetPasswordComponent, ForgotPasswordComponent } from './../shared/views/users/reset-password/reset-password.component';
import { DownloadsComponent } from './../shared/views/downloads/downloads.component';

const defaultTitle = ' - ServiceO'

export const appRoutes: Routes = [
    {
        path: 'pms',
        canActivate: [AuthGuard],
        loadChildren: './pms/pms-msp.module#PMSModule',
        resolve: {
            currentUser: AppResolver
        },
        data: {
            title: 'Dashboard ' + defaultTitle,
            permissions: ['partner', 'internal']
        }
    },
    {
        path: 'vms',
        canActivate: [AuthGuard],
        loadChildren: './vms/vms-msp.module#VMSModule',
        resolve: {
            currentUser: AppResolver
        },
        data: {
            title: 'Dashboard ' + defaultTitle,
            permissions: ['vendor', 'internal', 'customer']
        }
    },
    {
        path: 'login',
        canActivate: [ActiveUserAuthGuard],
        loadChildren: '../shared/views/authentication/authentication.module#AuthenticationModule',
        data: {
            appName: 'msp',
        }
    },
    // {
    //     path: 'users',
    //     loadChildren: '../shared/views/users/users.module#UsersModule',
    //     canActivate: [AuthGuard],
    //     resolve: {
    //         currentUser: AppResolver
    //     },
    //     data: {
    //         title: 'Users ' + defaultTitle,
    //         permissions: ['vendor', 'partner', 'internal', 'customer']
    //     }
    // },
    {
        path: 'reset',
        canActivate: [ActiveUserAuthGuard],
        component: ResetPasswordComponent
    },
    {
        path: 'reset-password',
        canActivate: [ActiveUserAuthGuard],
        component: ForgotPasswordComponent
    },
    {
        path: 'app',
        loadChildren: './common/common-msp.module#CommonModule',
        canActivate: [AuthGuard],
        resolve: {
            currentUser: AppResolver
        },
        data: {
            title: 'Common ' + defaultTitle,
            permissions: ['internal']
        }
    },
    {
        path: 'downloads/:documentId',
        canActivate: [AuthGuard],
        component: DownloadsComponent,
        resolve: {
            currentUser: AppResolver
        },
        data: {
            title: 'Downloads ' + defaultTitle,
            permissions: ['internal']
        }
    },
    {
        path: 'dwn/:documentId',
        canActivate: [AuthGuard],
        component: DownloadsComponent,
        resolve: {
            currentUser: AppResolver
        },
        data: {
            title: 'Downloads ' + defaultTitle,
            permissions: ['internal']
        }
    },
    {
        path: 'page-not-found',
        component: PagesError404Component
    },
    {
        path: 'pages-error-403',
        component: PagesError403Component
    },
    {
        path: 'shared',
        loadChildren: '../shared/views/shared-file/shared-file.module#SharedFileModule',
        resolve: {
            currentUser: AppResolver
        }
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'page-not-found'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
})

export class AppRoutingModule { }
