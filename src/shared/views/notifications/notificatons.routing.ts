import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsHomeComponent } from './notifications-home/notifications-home.component';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
const notificationRoutes: Routes = [
    {
        path: '',
        component: NotificationsHomeComponent,
        children: [
            {
                path: '',
                children: [
                    {path: '', component: NotificationsListComponent},
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
        RouterModule.forChild(notificationRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class NotificationsRoutingModule {
}
