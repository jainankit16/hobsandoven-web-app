import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeCardListHomeComponent } from '../timecards/timecardlist-home/timecardlist-home.component'
import { TimeCardListComponent } from '../timecards/timecardlist/timecardlist.component'

const timecardsRoutes: Routes = [
    {
        path: '',
        component: TimeCardListHomeComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', component: TimeCardListComponent }
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
        RouterModule.forChild(timecardsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TimecardsRoutingModule {
}
