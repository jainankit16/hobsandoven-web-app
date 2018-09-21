import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NguiMapModule } from '@ngui/map';

import { DetailModalModule } from '../detail-modal/detail-modal.module';

import { JobsiteLocationComponent } from './jobsite-location-map.component';

import { environment } from 'environments/environment';

@NgModule({
    declarations: [
        JobsiteLocationComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=' + environment.googleMapKey }),
        DetailModalModule
    ],
    exports: [
        JobsiteLocationComponent
    ],
    schemas: []
})

export class JobsiteMapModule { }
