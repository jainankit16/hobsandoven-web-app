import { AuthGuard, ActiveUserAuthGuard } from './../../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedFileComponent } from './shared-file.component';
import { FileComponent } from './files/file.component';

const defaultTitle = ' - ServiceO'
const feedsRoutes: Routes = [
    {
        path: '',
        component: SharedFileComponent,
        children:
            [
                {
                    path: 'files/:id/:email',
                    component: FileComponent
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
        RouterModule.forChild(feedsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SharedFileRoutingModule {
}
