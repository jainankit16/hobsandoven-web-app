import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { SidebarNavigationComponent } from './sidebar/sidebar-navigation.component';

@NgModule({
    declarations: [
        HeaderNavigationComponent,
        SidebarNavigationComponent
    ],
    imports: [
        NgbModule,
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderNavigationComponent,
        SidebarNavigationComponent
    ]
})

export class SharedModule { }
