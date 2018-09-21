import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { TopProgressBarComponent } from './top-progress-bar.component';

@NgModule({
    declarations: [
        TopProgressBarComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        TopProgressBarComponent
    ],
    schemas: []
})

export class TopProgressBarModule { }
