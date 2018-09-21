import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CsqdConfigureRouting } from '../configure/csqd-configure.routing';
import { PMSSharedModule } from '../../../shared/pms-components/pms-shared.module';
import { MSPSharedModule } from '../shared/msp-shared.module';
import { TopProgressBarModule } from '../shared/configure/top-progress-bar/top-progress-bar.module';
import { ServiceSetupModule } from '../configure/services-setup/service-setup.module';
import { ProgramSetupModule } from '../configure/program-setup/program-setup.module';
import { PricingSetupModule } from '../configure/pricing-setup/pricing-setup.module';
import { ScheduleSetupModule } from '../configure/schedule-setup/schedule-setup.module';
import { ConfirmSetupModule } from './confirm-setup/confirm-setup.module';
import { InstructionSetupModule } from '../configure/instruction-setup/instruction-setup.module';

/*All component import start here*/
import { CsqdConfigureComponent } from '../configure/csqd-configure.component';

@NgModule({
    declarations: [CsqdConfigureComponent],
    imports: [
        CsqdConfigureRouting,
        PMSSharedModule,
        MSPSharedModule,
        ProgramSetupModule,
        ServiceSetupModule,
        PricingSetupModule,
        InstructionSetupModule,
        ScheduleSetupModule,
        ConfirmSetupModule,
        TopProgressBarModule
    ],
    exports: [ProgramSetupModule]
})
export class CsqdConfigureModule { }
