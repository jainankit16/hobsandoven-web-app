import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';

@NgModule({
    declarations: [
        HeaderNavigationComponent
    ],
    imports: [
        NgbModule,
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderNavigationComponent
    ]
})

export class SharedModule { }
