import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsHomeComponent } from './jobs-home/jobs-home.component';
import { JobsDashboardComponent } from './jobs-dashboard/jobs-dashboard.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

const jobRoutes: Routes = [
    {
        path: '',
        component: JobsHomeComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', component: JobsListComponent },
                    { path: ':status', component: JobsListComponent },
                    { path: ':status/:id', component: JobDetailComponent },
                ]
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
        RouterModule.forChild(jobRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class JobsRoutingModule {
}
