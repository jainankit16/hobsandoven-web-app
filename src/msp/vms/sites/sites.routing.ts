import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SitesComponent } from './sites.component';

const jobRoutes: Routes = [
    {
        path: '',
        component: SitesComponent
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
export class SitesRoutingModule {
}

