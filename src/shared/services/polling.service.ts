import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AlertService } from './alert.service';
// polling
import { UsersApi } from '../sdk/services/custom/Users';
import { UserAlertApi } from '../sdk/services/custom/UserAlert';
import { AlertApi } from '../sdk/services/custom/Alert';
@Injectable()
export class PollingService {
    socket: any = null;
    _dataTitle: string;
    private totalUnreadNotification = new Subject<number>();
    private notificationList = new Subject<any>();
    private markReadList = new Subject<any>();

    private datTableNotificationList = new Subject<any>();
    datTableNotificationList$ = this.datTableNotificationList.asObservable();

    // set notification polling for 15 min

    countNotifications = Observable.timer(0, 900000);
    notificationHeaders = Observable.timer(0, 900000);
    // notifications = Observable.timer(0, 20000);

    constructor(
        private _router: Router,
        private _alertService: AlertService,
        private _titleService: Title,
        private _userAlertApi: UserAlertApi,
        private _usersApi: UsersApi,
        private _alertApi: AlertApi
    ) {}

    /**
    *
    * @param dataTitle
    */
    setFavNotification(dataTitle, unReadCount) {
        const favNotification = ((unReadCount > 0) ? '(' + unReadCount + ') Notifications | ' : '');
        this._dataTitle = (dataTitle) ? (favNotification + '' + dataTitle) : favNotification;
        this._titleService.setTitle(this._dataTitle);
    }
    /**
    *
    * @param dataTitle
    */
    setCountNotification(dataTitle = null) {
        if (this._usersApi.getCurrentId()) {
            return this.countNotifications
                .flatMap((i) => this.countNotification())
                .subscribe((count) => {
                    if (dataTitle) {
                        this.setFavNotification(dataTitle, count);
                    }
                    this.totalUnreadNotification.next(count);
                });
        }

    }
    /***
     * use to show total unread count notification
     */
    getCountNotification(): Observable<number> {
        return this.totalUnreadNotification.asObservable();
    }

    /**
     * to get notification list
     */
    getNotifications(): Observable<any> {
        return this.notificationList.asObservable();
    }

    /**
     *
     * @param condition
     * {
            userId: currentUserId,
            limit: limit,
            skip: offset,
            order: orderByName
        }
     */
    setNotifications(condition) {
        return this.notificationHeaders
            .flatMap((i) => this.showAlertNotification(condition))
            .subscribe((notifications) => {
                this.notificationList.next(notifications);
            });
    }

    /**
     *
     * @param condition
     * @exaple {userId:currentUserId,isRead:false}
     */
    countNotification() {
        return this._userAlertApi.count({ userId: this._usersApi.getCurrentId(), isRead: false }).map(data => data['count']);
    }

    /**
     *  @param condition
     * @exaple {userId:currentUserId}
    */

    showAlertNotification(condition) {
        return this._userAlertApi.showAlertNotification(condition).map(notifications => notifications);
    }
    /**
     *
     * @param condition
     * @param viewUrl
     */
    setMarkRead(condition: any, viewUrl) {
        const lists = [];
        this._userAlertApi.markRead(condition).subscribe(
            data => {
                if (Object.keys(condition).length > 0) {
                    lists['isRead'] = true;
                    lists['alertId'] = condition['alertId'];
                }
                if (Object.keys(condition).length === 0) {
                    lists['all'] = true;
                }
                this.setCountNotification('Notifications - ServiceO');

                this._alertService.clear();
                if (data['count'] > 0) {
                    this._alertService.success('Notification has been marked as read.');
                }
                this.markReadList.next(lists);
                this.goToPage(viewUrl);

            },
            error => {
                // this._alertService.error(error.message);
                this.goToPage(viewUrl);
            }
        );
    }
    /**
     * to get all marked list
     */
    getMarkRead(): Observable<any> {
        return this.markReadList.asObservable();
    }

    /**
     * 
     * @param viewUrl
     * to visite notification url
     */
    goToPage(viewUrl) {
        if (viewUrl) {
            this._router.navigate([viewUrl]);
        }

    }
}
