import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonRoutingModule } from './common.routes';
import { SharedCommunityModule } from '../shared/shared-community.module';
import { CommonComponent } from './common.component';
import { PreloaderService } from '../../shared/services/preloader.service';
import { SharedModule } from '../../shared/components/shared.module';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
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
        SharedCommunityModule
    ],
    providers: [
        PreloaderService
    ]
})
export class CommonModule {
}
