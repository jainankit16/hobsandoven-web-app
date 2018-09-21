
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

import { AlertModule } from '../../shared/components/alert/alert.module';
import { AlertService } from '../../shared/services/alert.service';
import { ConfirmDialogModule } from '../../shared/components/confirm-dialog/confirm-dialog.module';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { PreloaderModule } from './../../shared/components/preloader/preloader.module';
import { PreloaderService } from '../../shared/services/preloader.service';

import { DashboardAdminRoutingModule } from './dashboard.routes';
import { SharedAdminModule } from '../shared/shared.admin.module';
import { DashboardComponent } from './dashboard.component';
import { ListDepartmentComponent } from './department/list-department/list-department.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { ListDocumentCategoriesComponent } from './document-categories/list-document-categories/list-document-categories.component';
import { AddDocumentCategoriesComponent } from './document-categories/add-document-categories/add-document-categories.component';
import { ListDocumentTitleComponent } from './document-title/list-document-title/list-document-title.component';
import { AddDocumnetTitleComponent } from './document-title/add-documnet-title/add-documnet-title.component';
import { HomeComponent } from './home/home.component';
import { SharedService } from '../../shared/services/pms/shared.services';
import { EdiTransactionModule } from './../../shared/views/list-edi-transaction/edi-transaction.module';
import { ModalService } from './../../shared/services/modal.service';

@NgModule({
    declarations: [
        DashboardComponent,
        ListDepartmentComponent,
        AddDepartmentComponent,
        ListDocumentCategoriesComponent,
        AddDocumentCategoriesComponent,
        ListDocumentTitleComponent,
        AddDocumnetTitleComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxDatatableModule,
        NgSelectModule,
        DashboardAdminRoutingModule,
        SharedAdminModule,
        AlertModule,
        ConfirmDialogModule,
        PreloaderModule,
        EdiTransactionModule
    ],
    providers: [
        ModalService,
        ConfirmDialogService,
        AlertService,
        PreloaderService,
        SharedService
    ]
})
export class DashboardModule {
}
