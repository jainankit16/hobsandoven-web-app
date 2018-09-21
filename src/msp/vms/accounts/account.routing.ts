import { PagesError404Component } from './../../../shared/views/error/404/pages-error-404/pages-error-404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsHomeComponent } from './accounts-home/accounts-home.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';

const accountRoutes: Routes = [
    {
        path: '',
        component: AccountsHomeComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', component: AccountsListComponent }
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
        RouterModule.forChild(accountRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule {
}

