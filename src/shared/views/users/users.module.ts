import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguiMapModule } from '@ngui/map';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxUploaderModule } from 'ngx-uploader';

import { UsersRoutingModule } from './users.routing';
import { SharedModule } from '../../components/shared.module';
import { ConfirmDialogModule } from '../../components/confirm-dialog/confirm-dialog.module';

import { UsersHomeComponent } from './users-home/users-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLeftPanelComponent } from './user-left-panel/user-left-panel.component';
import { UploadPictureComponent } from './upload-picture/upload-picture.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserNotificationsComponent } from './user-notifications/user-notifications.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { UserSkillsComponent } from './user-skills/user-skills.component';
import { UserManageSkillsComponent } from './user-skills/user-manage-skills.component';

import { environment } from 'environments/environment';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=' + environment.googleMapKey }),
        NgxUploaderModule,
        SharedModule,
        ConfirmDialogModule
    ],
    declarations: [
        UsersHomeComponent,
        UserProfileComponent,
        UserLeftPanelComponent,
        UploadPictureComponent,
        UserSettingsComponent,
        UserDetailsComponent,
        ChangePasswordComponent,
        UserNotificationsComponent,
        UserPreferencesComponent,
        UserSettingsComponent,
        ChangePasswordComponent,
        UserSkillsComponent,
        UserManageSkillsComponent
    ]
})

export class UsersModule {

}
