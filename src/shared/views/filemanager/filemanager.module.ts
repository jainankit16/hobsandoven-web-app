import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileListComponent } from './file-list/file-list.component';
import { FilemanagerRoutes } from './filemanager.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { PipeModule } from '../../pipe/pipe.module';
import { DocumentModule } from '../../components/document/document.module';
import { SharedModule } from '../../components/shared.module';

import { FileManagerComponent } from './filemanager.component';
import { DepartmentViewComponent } from './file-browser/views/department-view/department-view.component'
import { JobsiteViewComponent } from './file-browser/views/jobsite-view/jobsite-view.component'
import { FolderAndFileViewComponent } from './file-browser/views/common/folder-and-files-view.component'
import { ShareFileModalComponent } from './file-browser/share-file-modal/share-file-modal.component';
import { DetailModalComponent } from './file-browser/detail-modal/detail-modal.component'

import { AccountTypeService } from '../../services/account-type.service'
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgxDatatableModule,
        PipeModule,
        FilemanagerRoutes,
        SharedModule,
        DocumentModule,
        DirectivesModule
    ],
    declarations: [
        FileListComponent,
        FileManagerComponent,
        ShareFileModalComponent,
        DetailModalComponent,
        DepartmentViewComponent,
        JobsiteViewComponent,
        FolderAndFileViewComponent


    ],
    providers: [AccountTypeService],
    schemas: []
})
export class FilemanagerModule { }
