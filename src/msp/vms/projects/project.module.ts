import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project.routing';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsHomeComponent } from './projects-home/projects-home.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NgbModule.forRoot(),
    NgxDatatableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProjectsListComponent,
    ProjectDetailComponent,
    ProjectsHomeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectModule { }
