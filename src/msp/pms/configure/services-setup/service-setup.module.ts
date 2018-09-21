import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/*All component imported here*/
import { ServiceSetupComponent } from './service-setup.component'


@NgModule({
    imports: [
        FormsModule,
        NgbModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [ServiceSetupComponent]
})

export class ServiceSetupModule { }

