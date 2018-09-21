import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PreloaderComponent } from './preloader.component';

@NgModule({
    declarations: [
        PreloaderComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        PreloaderComponent
    ],
    schemas: []
})

export class PreloaderModule { }
