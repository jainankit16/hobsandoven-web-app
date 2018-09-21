import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard, ActiveUserAuthGuard } from '../../../services/auth-guard.service';
import { CustomCaseComponent } from './custom-case.component';
import { CreateCaseComponent } from './create-case/create-case.component';
const defaultTitle = ' - ServiceO';

export const customCaseRoutes: Routes = [
    {
        path: '',
        component: CustomCaseComponent,
        children:
            [{ path: '', redirectTo: 'create', pathMatch: 'full' },
            {
                path: 'create', canActivate: [AuthGuard], component: CreateCaseComponent,
                data: {
                    title: 'Work Order Manager ' + defaultTitle,
                    permissions: ['partner', 'internal']
                }
            },
            {
                path: '**',
                redirectTo: '/page-not-found'
            }
            ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(customCaseRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class CustomCaseRoute { }

