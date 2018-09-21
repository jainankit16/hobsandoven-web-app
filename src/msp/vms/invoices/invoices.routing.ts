import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesHomeComponent } from './invoices-home/invoices-home.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';


const invoiceRoutes: Routes = [
    {
        path: '',
        component: InvoicesHomeComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', component: InvoicesListComponent }
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
        RouterModule.forChild(invoiceRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class InvoicesRoutingModule {
}


