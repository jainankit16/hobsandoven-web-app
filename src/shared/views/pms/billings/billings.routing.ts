import { BillingsListComponent } from './billings-list/billings-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const billingsRoutes: Routes = [
    {
        path: '',
        component: BillingsListComponent
    },
    {
        path: '**',
        redirectTo: '/page-not-found'
    }
];

@NgModule({
    imports: [RouterModule.forChild(billingsRoutes)],
    exports: [RouterModule]
})
export class BillingsRoute { }
