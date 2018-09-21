import {Component, OnInit} from '@angular/core';

import {IAlert, AlertType} from '../../models/common';

import {AlertService} from '../../services/alert.service';


@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    alerts: IAlert[] = [];

    constructor(private alertService: AlertService) {}

    ngOnInit() {

        this.alertService.getAlert().subscribe((alert: IAlert) => {

            if (!alert) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }

            // add alert to array
            this.alerts.push(alert);
        });
    }



    cssClass(alert: IAlert) {
        if (!alert) {
            return;
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType[AlertType.Success]:
                return 'alert alert-success';
            case AlertType[AlertType.Error]:
                return 'alert alert-danger';
            case AlertType[AlertType.Info]:
                return 'alert alert-info';
            case AlertType[AlertType.Warning]:
                return 'alert alert-warning';
        }
    }

    removeAlert(alert: IAlert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

}
