import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar.component';

const jobRoutes: Routes = [
    {
        path: '',
        component: CalendarComponent
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
export class CalendarRoutingModule {
}

