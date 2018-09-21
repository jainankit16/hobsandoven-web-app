import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../../shared/services/pms/shared.services';
import { activewizard } from '../../../../shared/services/global.value';
import { Location } from '@angular/common';


@Component({
    templateUrl: './service-setup.component.html'
})

export class ServiceSetupComponent {
    serviceForm: FormGroup; // <--- serviceForm is of type FormGroup
    serviceselect = 'first';
    active: number;

    constructor(private fb: FormBuilder, public _router: Router, private _sharedservice: SharedService) { // <--- inject FormBuilder
        this._sharedservice.pushactivewizard(1);
        this.createForm();
    }

    createForm() {
        this.serviceForm = this.fb.group({
            servicename: [this.serviceselect, Validators.required], // <--- the FormControl called "servicename"
        });
    }

    onSubmit() {
        this._router.navigate(['/pms/configure/program']);
    }
}
