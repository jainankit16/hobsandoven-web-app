import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedsListComponent } from './feeds-list/feeds-list.component';
const feedsRoutes: Routes = [
    {
        path: '',
        component: FeedsListComponent,
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
export class FeedsRoutingModule {
}
