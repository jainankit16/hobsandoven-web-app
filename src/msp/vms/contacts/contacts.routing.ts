import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts.component';

const jobRoutes: Routes = [
    {
        path: '',
        component: ContactsComponent
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
export class ContactsRoutingModule {
}

