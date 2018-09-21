import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { UsersApi } from '../../sdk/services/custom/Users';
import { AlertService } from '../../services/alert.service';
import { SocketService } from '../../services/socket.service';

@Component({
    selector: 'app-notification-header',
    templateUrl: './notification-header.component.html'
})

export class NotificationHeaderComponent implements OnInit, OnDestroy {
    @Input() modelName: string;
    @Input() modelId: string;
    errorMessage: any;

    private subscription1: Subscription;
    public notificationLists: Array<any>;

    constructor(
        private _alertService: AlertService,
        private _usersApi: UsersApi,
        private _socketService: SocketService
    ) { }

    ngOnInit() {
        this.setHeaderNotification();
    }

    ngOnDestroy() {
        if (this.subscription1) {
            this.subscription1.unsubscribe();
        }

    }

    setHeaderNotification() {
        const condition = { userId: this._usersApi.getCurrentToken().userId, limit: 10 };
        this._socketService.setHeaderNotifications(condition);
        this.subscription1 = this._socketService.getHeaderNotifications().subscribe(userNotification => {
            this.notificationLists = userNotification;
            this._socketService.getMarkRead().subscribe(data => {
                if (data['all'] === 1) {
                    this.notificationLists.forEach((notification) => {
                        notification['isRead'] = 1;
                    });
                } else {
                    this.notificationLists.forEach((notification) => {
                        if (notification['alertId'] === data['alertId']) {
                            notification['isRead'] = data['isRead'];
                        }
                    });
                }
            });
            this.errorMessage = (this.notificationLists.length === 0) ? 'No new notification' : '';
        }, error => {
            this._alertService.error(error);
        });

    }

    markAsRead(id = null, viewUrl = null) {
        let condition = {};
        if (id) {
            condition = Object.assign(condition, { alertId: id });
        }

        this._socketService.setMarkRead(condition, viewUrl);
    }
}
