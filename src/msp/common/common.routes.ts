import { PagesError404Component } from '../../shared/views/error/404/pages-error-404/pages-error-404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, ActiveUserAuthGuard } from '../../shared/services/auth-guard.service';
import { CommonComponent } from './common.component';

const defaultTitle = ' - ServiceO';

export const commonRoutes: Routes = [
    {
        path: '',
        component: CommonComponent,
        children: [
            {
                path: 'feeds',
                loadChildren: '../../shared/views/feeds/feeds.module#FeedsModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Feeds ' + defaultTitle,
                    permissions: ['vendor', 'partner', 'internal', 'customer']
                }
            },
            {
                path: 'file-manager',
                loadChildren: '../../shared/views/filemanager/filemanager.module#FilemanagerModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'File Manager ' + defaultTitle,
                    permissions: ['vendor', 'internal']
                }
            },            
            {
                path: 'notifications',
                loadChildren: '../../shared/views/notifications/notifications.module#NotificationsModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Notifications ' + defaultTitle,
                    permissions: ['vendor', 'partner', 'internal', 'customer']
                }
            },
            {
                path: 'users',
                loadChildren: '../../shared/views/users/users.module#UsersModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Users ' + defaultTitle,
                    permissions: ['vendor', 'partner', 'internal', 'customer']
                }
            },
            {
                path: '**',
                redirectTo: '/page-not-found',
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(commonRoutes)
    ],
    exports: [
        RouterModule
    ],
})
export class CommonRoutingModule {
}
