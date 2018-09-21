import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkerHomeComponent } from './workers-home/worker-home.component';
import { WorkerListComponent } from './workers-list/worker-list.component';


const jobRoutes: Routes = [
    {
        path: '',
        component: WorkerHomeComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', component: WorkerListComponent }
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
export class WorkersRoutingModule {
}
