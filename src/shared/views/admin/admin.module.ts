import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AdminRoutingModule } from './admin.routing';
import { ConfirmDialogModule } from '../../components/confirm-dialog/confirm-dialog.module';
import { SharedModule } from './../../components/shared.module';

import { ConfirmDialogService } from './../../services/confirm-dialog.service';
import { AlertService } from './../../services/alert.service';
import { PreloaderService } from './../../services/preloader.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdminComponent } from './admin.component';
import { AccountTypeModule } from './../../components/account-type/account-type.module';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FilterUserComponent } from './home/filter-user/filter-user.component';
import { ListUserComponent } from './home/list-user/list-user.component';
import { VMSAddUserComponent } from './vms-add-user/add-user.component';
import { ModalService } from './../../services/modal.service';
@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        ConfirmDialogModule,
        NgxDatatableModule,
        NgSelectModule,
        AccountTypeModule
    ],
    declarations: [
        AdminComponent,
        HomeComponent,
        AddUserComponent,
        VMSAddUserComponent,
        FilterUserComponent,
        ListUserComponent
],
    providers: [
        AlertService,
        PreloaderService,
        ModalService,
        ConfirmDialogService
    ],
    schemas: []
})
export class AdminModule { }
