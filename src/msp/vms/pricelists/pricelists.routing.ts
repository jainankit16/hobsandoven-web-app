import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriceListHomeComponent } from './pricelist-home/pricelist-home.component';
import { PriceListComponent } from './pricelists/pricelists.component';
import { PriceListDetailComponent } from './pricelist-detail/pricelist-detail.component';

import { PriceListItemDetailComponent } from '../pricelistitems/pricelistitem-detail/pricelistitem-detail.component';

const jobRoutes: Routes = [
    {
        path: '',
        component: PriceListHomeComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', component: PriceListComponent },
                    { path: ':id', component: PriceListDetailComponent },
                    { path: 'detail/:id', component: PriceListItemDetailComponent }
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
export class PriceListsRoutingModule {
}
