import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { DetailModalModule } from '../../../../../pms-components/detail-modal/detail-modal.module';
import { LeftTabContentModule } from '../../../../../pms-components/left-tab-content/left-tab-content.module';

import { ServiceManagerLeftPanelComponent } from './service-manager-left-panel.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { RegionsListComponent } from './regions-list/regions-list.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';

@NgModule({
    declarations: [
        ServiceManagerLeftPanelComponent,
        AccountsListComponent,
        RegionsListComponent,
        OrdersListComponent,
        SearchPanelComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        RouterModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        DetailModalModule,
        LeftTabContentModule
    ],
    exports: [
        ServiceManagerLeftPanelComponent,
        AccountsListComponent,
        OrdersListComponent,
        RegionsListComponent,
        SearchPanelComponent
    ]
})

export class ServiceManagerLeftPanelModule { }
