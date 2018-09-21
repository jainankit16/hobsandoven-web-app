import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkplaceSetupComponent } from './workplace-setup.component';
import { GroupTeamSetupComponent } from './group-team-setup/group-team-setup.component';
import { WorkplaceSetupLeftPanelComponent } from './shared/workplace-setup-left-panel/workplace-setup-left-panel.component';
import { GroupTeamFiltersComponent } from './shared/group-team-filters/group-team-filters.component';
import { CreateGroupTeamComponent } from './group-team-setup/create-group-team/create-group-team.component';
import { AccountTypeModule } from './../../../../shared/components/account-type/account-type.module';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AccountTypeModule,
    NgSelectModule
  ],
  declarations: [
    WorkplaceSetupComponent,
    GroupTeamSetupComponent,
    WorkplaceSetupLeftPanelComponent,
    GroupTeamFiltersComponent,
    CreateGroupTeamComponent
  ]
})
export class WorkplaceSetupModule { }
