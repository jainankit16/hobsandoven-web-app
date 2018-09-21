import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard, ActiveUserAuthGuard } from './../../../shared/services/auth-guard.service';
import { DeliveryManagerComponent } from './delivery-manager.component';
import { WorkplaceSetupComponent } from './workplace-setup/workplace-setup.component';
import { GroupTeamSetupComponent } from './workplace-setup/group-team-setup/group-team-setup.component';
const defaultTitle = ' - ServiceO';

export const deliveryManagerRoutes: Routes = [
    {
        path: '',
        component: DeliveryManagerComponent,
        children:
            [
                {
                    path: 'workplace-setup', canActivate: [AuthGuard], component: GroupTeamSetupComponent,
                    data: {
                        title: 'Delivery Manager ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'workplace-setup/group-team', canActivate: [AuthGuard], component: GroupTeamSetupComponent,
                    data: {
                        title: 'Delivery Manager ' + defaultTitle,
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
        RouterModule.forChild(deliveryManagerRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class DeliveryManagerRoutingModule { }

