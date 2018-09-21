import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersHomeComponent } from './orders-home/orders-home.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

const jobRoutes: Routes = [
    {
        path: '',
        component: OrdersHomeComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', component: OrdersListComponent }
                ]
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'page-not-found'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(jobRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class OrdersRoutingModule {
}
