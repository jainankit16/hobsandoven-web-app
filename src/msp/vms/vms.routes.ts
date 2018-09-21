
import { PagesError404Component } from '../../shared/views/error/404/pages-error-404/pages-error-404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../shared/views/vms/pages/dashboard/dashboard.component';
import { AuthGuard } from '../../shared/services/auth-guard.service';
import { VMSComponent } from './vms.component';
import { ListEdiTransactionComponent } from './../../shared/views/list-edi-transaction/list-edi-transaction.component';

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
                path: 'timecards',
                loadChildren: './timecards/timecards.module#TimecardsModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Timecards  ' + defaultTitle,
                    permissions: ['vendor', 'internal']
                }
            },
            {
                path: 'orders',
                loadChildren: './orders/orders.module#OrdersModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Purchase Orders ' + defaultTitle,
                    permissions: ['vendor', 'internal']
                }
            },
            {
                path: 'invoices',
                loadChildren: './invoices/invoices.module#InvoicesModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Purchase Invoices ' + defaultTitle,
                    permissions: ['vendor', 'internal']
                }
            },
            {
                path: 'payments',
                loadChildren: './payments/payments.module#PaymentsModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Payments ' + defaultTitle,
                    permissions: ['vendor', 'internal']
                }
            },
            {
                path: 'pricebook',
                loadChildren: './pricelists/pricelists.module#PriceListsModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Price Book ' + defaultTitle,
                    permissions: ['vendor', 'internal']
                }
            },
            {
                path: 'pricelistitems',
                loadChildren: './pricelistitems/pricelistitems.module#PriceListItemsModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Price Book Items ' + defaultTitle,
                    permissions: ['vendor', 'internal']
                }
            },
            {
                path: 'projects',
                loadChildren: './projects/project.module#ProjectModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Project ' + defaultTitle,
                    permissions: ['vendor', 'internal']
                }
            },
            {
                path: 'calendar',
                loadChildren: './calendar/calendar.module#CalendarModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Calendar ' + defaultTitle,
                    permissions: ['vendor', 'internal', 'customer']
                }
            },
            {
                path: 'workers',
                loadChildren: './workers/workers.module#WorkersModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Workers ' + defaultTitle,
                    permissions: ['vendor', 'internal']
                }
            },
            {
                path: 'accounts',
                loadChildren: './accounts/account.module#AccountModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Account ' + defaultTitle,
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
                    page: 'vms'
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