import { NgModule } from '@angular/core';
import { AuthGuard, ActiveUserAuthGuard } from '../../../shared/services/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { CsqdConfigureComponent } from './csqd-configure.component';
import { ServiceSetupComponent } from './services-setup/service-setup.component';
import { ProgramSetupComponent } from './program-setup/program-setup.component';
import { PricingSetupComponent } from './pricing-setup/pricing-setup.component';
import { InstructionSetupComponent } from './instruction-setup/instruction-setup.component';
import { ScheduleSetupComponent } from './schedule-setup/schedule-setup.component';
import { ConfirmSetupComponent } from './confirm-setup/confirm-setup.component';
const defaultTitle = ' - ServiceO';
const homeContentRoutes: Routes = [
    {
        path: '',
        component: CsqdConfigureComponent,
        children:
            [
                { path: '', canActivate: [AuthGuard], component: ServiceSetupComponent },
                {
                    path: 'program', canActivate: [AuthGuard], component: ProgramSetupComponent,
                    data: {
                        title: 'Program ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'pricing', canActivate: [AuthGuard], component: PricingSetupComponent,
                    data: {
                        title: 'Quote Setup ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'instruction', canActivate: [AuthGuard], component: InstructionSetupComponent,
                    data: {
                        title: 'Process Instruction Setup ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'schedule', canActivate: [AuthGuard], component: ScheduleSetupComponent,
                    data: {
                        title: 'Work Order Manager ' + defaultTitle,
                        permissions: ['partner', 'internal']
                    }
                },
                {
                    path: 'confirm', canActivate: [AuthGuard], component: ConfirmSetupComponent,
                    data: {
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
        RouterModule.forChild(homeContentRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CsqdConfigureRouting {
}
