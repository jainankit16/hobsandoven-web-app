import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersHomeComponent } from './users-home/users-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const jobRoutes: Routes = [
    {
        path: '',
        component: UsersHomeComponent,
        children: [
            {
                path: '',
                children: [
                    {path: '', component: UserProfileComponent},
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
export class UsersRoutingModule {
}
