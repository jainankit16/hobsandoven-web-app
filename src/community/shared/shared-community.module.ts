import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { VMSSidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        VMSSidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        VMSSidebarComponent,
        CommonModule,
        RouterModule
    ]
})

export class SharedCommunityModule { }
