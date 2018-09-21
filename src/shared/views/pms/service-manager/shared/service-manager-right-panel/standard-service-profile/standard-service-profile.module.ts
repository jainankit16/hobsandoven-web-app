import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StandardServiceProfileComponent } from './standard-service-profile.component';

@NgModule({
    declarations: [
        StandardServiceProfileComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        StandardServiceProfileComponent
    ],
    schemas: []
})

export class StandardServiceProfileModule { }
