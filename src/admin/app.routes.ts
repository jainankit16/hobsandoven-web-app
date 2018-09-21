import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppResolver } from './../shared/services/app.resolver';
import { AuthGuard, ActiveUserAuthGuard } from './../shared/services/auth-guard.service';

import { PagesError404Component } from '../shared/views/error/404/pages-error-404/pages-error-404.component';
import { PagesError403Component } from '../shared/views/error/403/pages-error-403/pages-error-403.component';

const defaultTitle = ' - ServiceO'

export const appRoutes: Routes = [
    {
        path: 'login',
        canActivate: [ActiveUserAuthGuard],
        loadChildren: '../shared/views/authentication/authentication.module#AuthenticationModule',
        data: {
            appName: 'admin',
        }
    },
    {
        path: 'admin',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        resolve: {
            currentUser: AppResolver
        },
        data: {
            title: 'Admin ' + defaultTitle,
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
