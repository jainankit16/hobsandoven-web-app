import { Component } from '@angular/core';
import { SharedService } from '../../../services/pms/shared.services';

@Component({
    templateUrl: './service-manager.component.html',
    styleUrls: ['./service-manager.component.css']
})

export class ServiceManagerComponent {

    constructor(private _sharedService: SharedService) {
        this._sharedService.pushactivewizard(2);
    }

}
