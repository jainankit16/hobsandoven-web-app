import { CoverageMapComponent } from './coverage-map.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const coverageMapRoutes: Routes = [
  {
    path: '',
    component: CoverageMapComponent
  },
  {
    path: ':programId',
    component: CoverageMapComponent
  },
  {
    path: '**',
    redirectTo: '/page-not-found'
}
];

@NgModule({
  imports: [RouterModule.forChild(coverageMapRoutes)],
  exports: [RouterModule]
})
export class CoverageMapRoute {}
