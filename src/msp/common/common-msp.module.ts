import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonRoutingModule } from './common.routes';
import { SharedMSPModule } from '../shared/shared-msp.module';
import { CommonComponent } from './common.component';
import { PreloaderService } from '../../shared/services/preloader.service';
import { SharedModule } from '../../shared/components/shared.module';
@NgModule({
    declarations: [
        CommonComponent
    ],
    imports: [
        CommonRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        SharedMSPModule
    ],
    providers: [
        PreloaderService
    ]
})
export class CommonModule {
}
