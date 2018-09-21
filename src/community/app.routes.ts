import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppResolver } from './../shared/services/app.resolver';
import { AuthGuard, ActiveUserAuthGuard } from './../shared/services/auth-guard.service';

import { PagesError404Component } from '../shared/views/error/404/pages-error-404/pages-error-404.component';
import { PagesError403Component } from '../shared/views/error/403/pages-error-403/pages-error-403.component';
import { ResetPasswordComponent, ForgotPasswordComponent } from './../shared/views/users/reset-password/reset-password.component';
import { DownloadsComponent } from './../shared/views/downloads/downloads.component';

const defaultTitle = ' - ServiceO'

export const appRoutes: Routes = [
    {
        path: 'pms',
        canActivate: [AuthGuard],
        loadChildren: './pms/pms-community.module#PMSModule',
        resolve: {
            currentUser: AppResolver
        },
        data: {
            title: 'Dashboard ' + defaultTitle,
            permissions: ['partner', 'vendor']
        }
    },
    {
        path: 'vms',
        canActivate: [AuthGuard],
        loadChildren: './vms/vms-community.module#VMSModule',
        resolve: {
            currentUser: AppResolver
        },
        data: {
            title: 'Dashboard ' + defaultTitle,
            permissions: ['partner', 'vendor']
        }
    },
    {
        path: 'login',
        canActivate: [ActiveUserAuthGuard],
        loadChildren: '../shared/views/authentication/authentication.module#AuthenticationModule',
        data: {
            appName: 'community',
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
    //         permissions: ['partner', 'vendor']
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
        component: ForgotPasswordComponent,
        data: {
            title: 'Reset Password ' + defaultTitle,
            permissions: ['partner', 'vendor']
        }
    },
    {
        path: 'app',
        loadChildren: './common/common-community.module#CommonModule',
        canActivate: [AuthGuard],
        resolve: {
            currentUser: AppResolver
        },
        data: {
            title: 'Common ' + defaultTitle,
            permissions: ['partner', 'vendor']
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
            permissions: ['partner', 'vendor']
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

export class AppRoutingModule {
}
