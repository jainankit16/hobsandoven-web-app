import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MSPMenuComponent } from './sub-navigation/msp/msp-menu.component';

import { RightContentModule } from './right-content/right-home-content.module';
import { ConfigureModule } from './configure/configure.module';

@NgModule({
    declarations: [MSPMenuComponent],
    imports: [CommonModule, NgbModule, RightContentModule, ConfigureModule, RouterModule],
    exports: [CommonModule, NgbModule, RightContentModule, ConfigureModule, MSPMenuComponent]
})
export class MSPSharedModule { }
