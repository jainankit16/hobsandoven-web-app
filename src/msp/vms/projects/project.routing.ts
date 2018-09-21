import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsHomeComponent } from './projects-home/projects-home.component';

const projectRoutes: Routes = [
  {
    path: '',
    component: ProjectsHomeComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: ProjectsListComponent },
          { path: ':id', component: ProjectDetailComponent }
        ]
      },
      {
        path: '**',
        redirectTo: 'page-not-found'
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(projectRoutes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}