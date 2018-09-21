import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, ActiveUserAuthGuard } from '../../shared/services/auth-guard.service';

import { DashboardComponent } from './dashboard.component';
import { ListDepartmentComponent } from './department/list-department/list-department.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { ListDocumentCategoriesComponent } from './document-categories/list-document-categories/list-document-categories.component';
import { AddDocumentCategoriesComponent } from './document-categories/add-document-categories/add-document-categories.component';
import { ListDocumentTitleComponent } from './document-title/list-document-title/list-document-title.component';
import { AddDocumnetTitleComponent } from './document-title/add-documnet-title/add-documnet-title.component';
import { HomeComponent } from './home/home.component';
import { ListEdiTransactionComponent } from './../../shared/views/list-edi-transaction/list-edi-transaction.component';

const defaultTitle = ' - ServiceO';

export const adminRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Admin Dashboard' + defaultTitle,
                }
            },
            {
                path: 'department',
                component: ListDepartmentComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Department Management' + defaultTitle,
                }
            },
            {
                path: 'department/manage',
                component: AddDepartmentComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Department Management' + defaultTitle,
                }
            },
            {
                path: 'document-categories',
                canActivate: [AuthGuard],
                component: ListDocumentCategoriesComponent,
                data: {
                    title: 'Document Categories' + defaultTitle,
                }
            },
            {
                path: 'document-categories/manage',
                canActivate: [AuthGuard],
                component: AddDocumentCategoriesComponent,
                data: {
                    title: 'Manage Document Categories' + defaultTitle,
                }
            },
            {
                path: 'document-title',
                canActivate: [AuthGuard],
                component: ListDocumentTitleComponent,
                data: {
                    title: 'Document Title' + defaultTitle,
                }
            },
            {
                path: 'document-title/manage',
                canActivate: [AuthGuard],
                component: AddDocumnetTitleComponent,
                data: {
                    title: 'Manage Document Title' + defaultTitle,
                }
            },
            {
                path: 'edi-transaction',
                canActivate: [AuthGuard],
                component: ListEdiTransactionComponent,
                data: {
                    title: 'Manage EDI Transaction' + defaultTitle
                }
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/page-not-found',
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ],
})
export class DashboardAdminRoutingModule {
}
