import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NotificationComponent } from './notification.component';
import { NotificationHeaderComponent } from './notification-header.component';
import { UtilityService } from '../../services/utility.service';
import { SharedService } from '../../services/pms/shared.services';

@NgModule({
    declarations: [
        NotificationComponent,
        NotificationHeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgxDatatableModule
    ],
    exports: [
        NotificationComponent,
        NotificationHeaderComponent
    ],
    schemas: [],
    providers: [
        UtilityService,
        SharedService
    ]
})

export class NotificationModule { }
