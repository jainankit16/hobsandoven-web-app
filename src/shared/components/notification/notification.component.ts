import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { UsersApi } from '../../sdk/services/custom/Users';
import { UtilityService } from '../../services/utility.service';
import { SocketService } from '../../services/socket.service';
import { Title } from '@angular/platform-browser';
@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit, OnDestroy {
    pageTitle: any;
    private subsUnsbscribe: Subscription;
    public notificationLists: Array<any>;
    /*Boot-Datatable params */
    tableData = [];
    loadingIndicator = false;
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 200;
    offset = 0;
    tableDataCount = 0;
    columns: any;
    allColumns: any;
    noRecords = false;

    orderBy = 'createdAt DESC';

    constructor(
        private _usersApi: UsersApi,
        private _utilityService: UtilityService,
        private _socketService: SocketService,
        private _titleService: Title
    ) { }

    ngOnInit() {
        this.getNotification(0);

        this.columns = [
            { name: 'Type', prop: 'type', width: 60, visible: true, sortable: false },
            { name: 'Model Name', prop: 'modelName', width: 120, visible: true, sortable: true },
            { name: 'Message', prop: 'message', width: 600, visible: true, sortable: true },
            { name: 'Notification Time', prop: 'createdAt', width: 170, visible: true, sortable: true },
            { name: 'Action', prop: 'isRead', width: 120, visible: true, sortable: false }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling
    }

    ngOnDestroy() {
        if (this.subsUnsbscribe) {
            this.subsUnsbscribe.unsubscribe();
        }

    }

    /**
     *
     * @param offset
     */
    getNotification(offset) {
        this.loadingIndicator = true;
        const conditionDataTable = {
            userId: this._usersApi.getCurrentToken().userId,
            limit: this.itemsPerBatch,
            skip: offset,
            order: this.orderBy
        }

        this.subsUnsbscribe = this._socketService.showAlertNotification(conditionDataTable).subscribe(data => {
            // when notification set mark as read/header/notificationpage
            this.openreadFolder();
            const results = this.modifyData(data);
            this.noRecords = (results.length < this.itemsPerBatch) ? true : false;
            if (!this.isLoadMore) {
                this.tableData = (results) ? results : [];
            } else {
                if (results.length) {
                    results.forEach(c => {
                        this.tableData.push(c);
                    });
                    this.tableData = [...this.tableData];
                }
            }

            this._socketService.getWebSocketData().subscribe((_data: any) => {
                if (_data && _data.getUserAlert) {                    
                    const item = this._modifyData(_data.getUserAlert);
                   // item['isRead'] = 0;
                    this.tableData.unshift(item);
                    this.tableData = [...this.tableData];
                }

            });
            this.loadingIndicator = false;

        }, error => {
            this.loadingIndicator = false;
        });


    }

    modifyData(data) {
        if (data.length) {
            data.forEach((item) => {
                item['type'] = (item.alert && item.alert.type) ? item.alert.type : '';
                item['modelName'] = (item.alert && item.alert.modelName) ? item.alert.modelName.toUpperCase() : '';
                item['alertId'] = (item.alert) ? item.alert.id : '';
                item['viewUrl'] = (item.alert && item.alert.viewUrl) ? item.alert.viewUrl : '';
                item['message'] = (item.alert && item.alert.message) ? item.alert.message : '';
                item['createdAt'] = (item.alert && item.alert.createdAt) ? this._utilityService.dateFormate(item.alert.createdAt) : '';
                item['isRead'] = item.isRead ? 1 : 0;

                //  delete key
                // delete item.alert;
            });
            return data;
        } else {
            return [];
        }
    }

    _modifyData(item) {
        if (item) {
            item['type'] = (item.alert && item.alert.type) ? item.alert.type : '';
            item['modelName'] = (item.alert && item.alert.modelName) ? item.alert.modelName.toUpperCase() : '';
            item['alertId'] = (item.alert) ? item.alert.id : '';
            item['viewUrl'] = (item.alert && item.alert.viewUrl) ? item.alert.viewUrl : '';
            item['message'] = (item.alert && item.alert.message) ? item.alert.message : '';
            item['createdAt'] = (item.alert && item.alert.createdAt) ? this._utilityService.dateFormate(item.alert.createdAt) : '';
            item['isRead'] = item.isRead ? 1 : 0;
        } else {
            item = [];
        }

        return item;
    }

    loadMoreRecords() {
        this.isLoadMore = true;
        this.loadingIndicator = true;
        this.offset = this.tableData.length;
        this.getNotification(this.tableData.length);
    }

    toggle(col) {
        col.visible = !col.visible;
    }

    markAsRead(id = null, viewUrl = null) {
        let condition = {};
        if (id) {
            condition = Object.assign(condition, { alertId: id });
        }

        this._socketService.setMarkRead(condition, viewUrl);
        // when notification set mark as read
        this.openreadFolder();
    }

    openreadFolder() {
        // when notification set mark as read
        this._socketService.getMarkRead().subscribe(data => {
            if (data) {
                if (data['all'] === 1) {
                    this.tableData.forEach((notification) => {
                        notification['isRead'] = 1;
                    });
                } else {
                    this.tableData.forEach((notification) => {
                        if (notification['alertId'] === data['alertId']) {
                            notification['isRead'] = data['isRead'];
                        }
                    });
                }
            }
        });
    }
}
