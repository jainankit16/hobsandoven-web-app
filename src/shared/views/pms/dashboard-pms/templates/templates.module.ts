import { NgModule } from '@angular/core';
import { DetailPageDialogTemplatesComponent } from './detail-page-dialog-templates/detail-page-dialog-templates.component';
import { ListPageDialogTemplatesComponent } from './list-page-dialog-templates/list-page-dialog-templates.component';

import { DialogModalModule } from '../../../../pms-components/dialog-modal/dialog-modal.module';
import { DetailModalModule } from '../../../../pms-components/detail-modal/detail-modal.module';
@NgModule({
    imports: [
        DialogModalModule,
        DetailModalModule
    ],
    declarations: [
        ListPageDialogTemplatesComponent,
        DetailPageDialogTemplatesComponent
    ],
    exports: [
        ListPageDialogTemplatesComponent,
        DetailPageDialogTemplatesComponent
    ]
})
export class TemplatesModule { }
