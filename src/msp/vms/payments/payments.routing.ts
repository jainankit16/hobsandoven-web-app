
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsHomeComponent } from './payments-home/payments-home.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';


const paymentRoutes: Routes = [
    {
        path: '',
        component: PaymentsHomeComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', component: PaymentsListComponent }
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
        RouterModule.forChild(paymentRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class PaymentsRoutingModule {
}

