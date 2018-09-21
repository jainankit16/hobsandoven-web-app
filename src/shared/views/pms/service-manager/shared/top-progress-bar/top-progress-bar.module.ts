import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TopProgressBarComponent } from './top-progress-bar.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        RouterModule
    ],
    declarations: [
        TopProgressBarComponent
    ],
    exports: [
        TopProgressBarComponent
    ]
})

export class TopProgressBarModule { }
