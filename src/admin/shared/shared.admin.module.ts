import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavigationComponent } from './header-navigation/navigation.component';
import { AdminSidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        NavigationComponent,
        AdminSidebarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule
    ],
    exports: [
        NavigationComponent,
        AdminSidebarComponent
    ]
})

export class SharedAdminModule { }
