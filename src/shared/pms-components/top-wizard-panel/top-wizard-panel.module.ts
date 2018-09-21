import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TopWizardPanelComponent } from './top-wizard-panel.component';

@NgModule({
    declarations: [
        TopWizardPanelComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        TopWizardPanelComponent
    ],
    schemas: []
})

export class TopWizardPanelModule { }
