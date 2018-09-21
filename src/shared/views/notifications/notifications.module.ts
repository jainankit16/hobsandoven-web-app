import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../components/shared.module';
import { NotificationModule } from '../../components/notification/notification.module';

import { NotificationsRoutingModule } from './notificatons.routing';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { NotificationsHomeComponent } from './notifications-home/notifications-home.component';

@NgModule({
    imports: [
        NotificationsRoutingModule,
        CommonModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NotificationModule
    ],
    declarations: [
        NotificationsListComponent,
        NotificationsHomeComponent
    ],
    exports: [
        NotificationsListComponent,
        NotificationsHomeComponent
    ],
    schemas: []
})
export class NotificationsModule { }
