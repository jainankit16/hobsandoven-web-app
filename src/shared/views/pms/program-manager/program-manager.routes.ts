import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard, ActiveUserAuthGuard } from '../../../services/auth-guard.service';
import { ProgramManagerComponent } from './program-manager.component';
import { ProgramsListComponent } from './programs-list/programs-list.component';
import { PriceListComponent } from './price-list/price-list.component';
const defaultTitle = ' - ServiceO';

export const programManagerRoutes: Routes = [
    {
        path: '',
        component: ProgramManagerComponent,
        children:
            [
                // { path: '', redirectTo: 'programs', pathMatch: 'full'},
                {
                    path: 'programs', canActivate: [AuthGuard], component: ProgramsListComponent,
                    data: {
                        title: 'Program Manager ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'pricelist', canActivate: [AuthGuard], component: PriceListComponent,
                    data: {
                        title: 'Service Catalog (Price List) ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
            ]
    },
    {
        path: '**',
        redirectTo: '/page-not-found'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(programManagerRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ProgramManagerRoute { }

