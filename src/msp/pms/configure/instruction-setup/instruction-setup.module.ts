import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PMSSharedModule } from '../../../../shared/pms-components/pms-shared.module';
import { MSPSharedModule } from '../../shared/msp-shared.module';
/*All component imported here*/
import { InstructionSetupComponent } from './instruction-setup.component';
import { JobsiteInstructionsComponent } from './jobsite-instructions/jobsite-instructions.component'
import { JobsiteContactInfoComponent } from './jobsite-contact-info/jobsite-contact-info.component'
import { JobsiteFilesComponent } from './jobsite-files/jobsite-files.component'

@NgModule({
    imports: [
        FormsModule,
        NgbModule,
        CommonModule,
        ReactiveFormsModule,
        PMSSharedModule,
        MSPSharedModule
    ],
    declarations: [
        InstructionSetupComponent,
        JobsiteInstructionsComponent,
        JobsiteContactInfoComponent,
        JobsiteFilesComponent
    ]
})
export class InstructionSetupModule { }
