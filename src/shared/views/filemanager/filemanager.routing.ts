import { Routes, RouterModule } from '@angular/router';
import { FileListComponent } from './file-list/file-list.component';
import { DepartmentViewComponent } from './file-browser/views/department-view/department-view.component'
import { JobsiteViewComponent } from './file-browser/views/jobsite-view/jobsite-view.component'
import { FileManagerComponent } from './filemanager.component';

const fileRoutes: Routes = [
  {
    path: '',
    component: FileManagerComponent,
    children: [
      {
        path: '',
        component: FileListComponent
      },
      {
        path: 'browser/:viewType/:modelType',
        component: JobsiteViewComponent,
        data: {
          permissions: ['vendor', 'internal', 'partner']
        }
      },
      {
        path: 'browser/:viewType/:modelType/:sfdcId',
        component: JobsiteViewComponent,
        data: {
          permissions: ['vendor', 'internal', 'partner']
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

export const FilemanagerRoutes = RouterModule.forChild(fileRoutes);
