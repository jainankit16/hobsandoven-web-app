import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { ServiceZoneComponent } from './service-zone.component';

@NgModule({
    declarations: [
        ServiceZoneComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        ServiceZoneComponent
    ],
    schemas: []
})

export class ServiceZoneModule { }
