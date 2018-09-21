import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AlertService } from './alert.service';
import { environment } from '../../environments/environment';
import { UsersApi } from '../sdk/services/custom/Users';
import { UserAlertApi } from '../sdk/services/custom/UserAlert';


@Injectable()
export class SocketService {
    websocket: any = null;
    _dataTitle: string;
    private totalUnreadNotification = new BehaviorSubject<number>(0);
    private notificationHeaderList = new Subject<any>();
    private markReadList = new Subject<any>();
    private socketMessage = new Subject<any>();
    constructor(
        private _router: Router,
        private _alertService: AlertService,
        private _titleService: Title,
        private _userAlertApi: UserAlertApi,
        private _usersApi: UsersApi
    ) {
        // this.connectSocket();
    }

    connectSocket() {
        // console.log(this._usersApi.getCurrentToken())
        const token = this._usersApi.getCurrentToken();
        const url = environment.websocket + '?access_token=' + token.id
        this.websocket = new WebSocket(url, 'echo-protocol');
        this.websocket.onopen = () => {
            console.log('WebService Connected to ' + environment.websocket);
            // const data = { userId: this._usersApi.getCurrentId() };
            // this.websocket.send(data);
        }
    }

    disconnectSocket() {
        this.websocket.onclose = () => {
            console.log('WebService disconneted to ' + environment.websocket);
            this.websocket.close();
        }
    }

    getWebSocketData(): Observable<any> {
        this.websocket.onmessage = (event) => {
            if (event.data) {
                const parsedEvent = JSON.parse(event.data)
                if (parsedEvent.getUserAlert) {
                    this.socketMessage.next(parsedEvent);
                }

            }
        }
        return this.socketMessage.asObservable();
        // return Observable.create(observer => {
        //     this.websocket.onmessage = (evt) => {
        //       observer.next(evt);
        //     };
        //   })
        //   .map(res => JSON.parse(res.data))
        //   .share();
    }

    /**
    *
    * @param dataTitle
    */
    setFavNotification(dataTitle, unReadCount) {
        const favNotification = ((unReadCount > 0) ? '(' + unReadCount + ') Notifications | ' : '');
        if (dataTitle === 'notificationCounter') {
            this._dataTitle = favNotification;
        } else {
            this._dataTitle = (dataTitle) ? (favNotification + '' + dataTitle) : favNotification;
        }
        this._dataTitle = (dataTitle) ? (favNotification + '' + dataTitle) : favNotification;
        this._titleService.setTitle(this._dataTitle);
    }
    /**
    *
    * @param dataTitle
    */
    setCountNotification(dataTitle = null) {
        this.countNotification().subscribe(count => {
            this.getWebSocketData().subscribe((result: any) => {
                if (this._usersApi.getCurrentId()) {
                    count += result.getCountAlert ? result.getCountAlert : 0;
                    if (dataTitle) {
                        this.setFavNotification(dataTitle, count);
                    }
                    this.totalUnreadNotification.next(count);
                    return false;
                }
            });
            if (this._usersApi.getCurrentId()) {
                if (dataTitle) {
                    this.setFavNotification(dataTitle, count);
                }
                this.totalUnreadNotification.next(count);
            }

        });

    }
    /***
     * use to show total unread count notification
     */
    getCountNotification(): Observable<number> {
        return this.totalUnreadNotification.asObservable();
    }

    /**
     * to get notification list top header
     */
    getHeaderNotifications(): Observable<any> {
        return this.notificationHeaderList.asObservable();
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
    setHeaderNotifications(condition) {
        this.showAlertNotification(condition).subscribe(notifications => {
            this.getWebSocketData().subscribe((result: any) => {
                if (result && result.getUserAlert) {
                    notifications.unshift(result.getUserAlert);
                    if (notifications.length > 10) {
                        notifications.length = 10;
                    }
                    this.notificationHeaderList.next(notifications);
                    return false;
                }
            });
            this.notificationHeaderList.next(notifications);
        });
    }

    /**
     *
     * @param condition
     * @example {userId:currentUserId,isRead:false}
     */
    countNotification() {
        return this._userAlertApi.count({ userId: this._usersApi.getCurrentId(), isRead: false }).map(data => data['count']);
    }

    /**
     *  @param condition
     * @example {userId:currentUserId}
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
                    lists['isRead'] = 1;
                    lists['alertId'] = condition['alertId'];
                }
                if (Object.keys(condition).length === 0) {
                    lists['all'] = 1;
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
                this.goToPage(viewUrl);
            }, () => {
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
