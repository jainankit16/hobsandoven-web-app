import { AuthGuard, ActiveUserAuthGuard } from './../../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './add-user/add-user.component';
import { VMSAddUserComponent } from './vms-add-user/add-user.component';

const defaultTitle = ' - ServiceO'
const feedsRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children:
        [
            {
                path: '',
                component: HomeComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'User management' + defaultTitle,
                    permissions: ['vendor', 'partner', 'internal'],
                    adminAccessPermission: true
                }
            },
            {
                path: 'create',
                component: AddUserComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Add new user' + defaultTitle,
                    permissions: ['partner', 'internal'],
                    adminAccessPermission: true
                }
            },
            {
                path: 'update/:userId',
                component: AddUserComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'edit user' + defaultTitle,
                    permissions: ['partner', 'internal'],
                    adminAccessPermission: true
                }
            },
            {
                path: 'view/:userId',
                component: AddUserComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'view user' + defaultTitle,
                    permissions: ['partner', 'internal'],
                    adminAccessPermission: true
                }
            },
            {
                path: 'vms-create',
                component: VMSAddUserComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Add new user' + defaultTitle,
                    permissions: ['vendor', 'internal'],
                    adminAccessPermission: true
                }
            },
            {
                path: 'vms-update/:userId',
                component: VMSAddUserComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Edit user' + defaultTitle,
                    permissions: ['vendor', 'internal'],
                    adminAccessPermission: true
                }
            },
            {
                path: 'vms-view/:userId',
                component: VMSAddUserComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'View user' + defaultTitle,
                    permissions: ['vendor', 'internal'],
                    adminAccessPermission: true
                }
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'page-not-found'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(feedsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {
}
