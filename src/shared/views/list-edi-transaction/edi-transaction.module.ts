import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListEdiTransactionComponent } from './list-edi-transaction.component';
import { ConfirmDialogService } from './../../services/confirm-dialog.service';
import { PreloaderService } from 'shared/services/preloader.service';
import { AlertService } from './../../services/alert.service';
import { ModalService } from './../../services/modal.service';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        NgxDatatableModule,
    ],
    declarations: [ ListEdiTransactionComponent],
    exports: [ListEdiTransactionComponent],
    providers: [
        ModalService,
        AlertService,
        PreloaderService,
        ConfirmDialogService
    ],
    schemas: []
})
export class EdiTransactionModule { }
