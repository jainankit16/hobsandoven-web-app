import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { IAlert, AlertType } from '../../shared/models/common';

@Injectable()
export class AlertService {
    private subject = new Subject<IAlert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType[AlertType.Success], message, keepAfterRouteChange);
    }

    error(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType[AlertType.Error], message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType[AlertType.Info], message, keepAfterRouteChange);
    }

    warn(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType[AlertType.Warning], message, keepAfterRouteChange);
    }

    alert(AlertType: string, message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.clear();
        this.subject.next(<IAlert>{ type: AlertType, message: message });
        window.scrollTo(0, 0);
        // if (AlertType !== 'error') {
        //     // to autoclose after 5 second.
        //     setTimeout(() => {
        //         this.clear();
        //     }, 5000)
        // }
    }

    clear() {
        this.subject.next();
    }
}
