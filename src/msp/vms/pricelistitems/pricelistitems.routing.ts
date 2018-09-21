import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriceListItemHomeComponent } from './pricelistitem-home/pricelistitem-home.component';
import { PriceListItemComponent } from './pricelistitems/pricelistitems.component';
import { PriceListItemDetailComponent } from './pricelistitem-detail/pricelistitem-detail.component';


const jobRoutes: Routes = [
    {
        path: '',
        component: PriceListItemHomeComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', component: PriceListItemComponent },
                    { path: ':id', component: PriceListItemDetailComponent },
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
export class PriceListItemsRoutingModule {
}
