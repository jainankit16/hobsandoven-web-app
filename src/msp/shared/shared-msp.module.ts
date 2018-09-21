import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        SidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule
    ],
    exports: [
        SidebarComponent,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule
    ]
})
export class SharedMSPModule {
}
