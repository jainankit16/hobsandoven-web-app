import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { UsersApi } from './../../../../sdk';
import { EmailServiceApi } from './../../../../sdk/services/custom/EmailService';
import { AlertService } from './../../../../services/alert.service';
import { PreloaderService } from './../../../../services/preloader.service';
import { AppStateService } from './../../../../services/app-state.service'
import { ConfirmDialogService } from './../../../../services/confirm-dialog.service';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.css'],
    providers: [EmailServiceApi]
})
export class ListUserComponent implements OnInit, AfterViewChecked {
    @Output() setlistCount: EventEmitter<object> = new EventEmitter<object>();
    @Input()
    set filter(filterObj) {
        if (filterObj && filterObj.where) {
            this.activeTable = false;
            this.initialLoad(filterObj)
        }
    }

    /*Boot-Datatable params */
    activeTable: boolean;
    ngxOffset = 0;
    loadingIndicator = false;
    tableData = [];
    itemsPerPage = 10;
    isLoadMore = false;
    currentOffset: number;
    itemsPerBatch = 200;
    orderBy = 'createdAt DESC';
    tabId: any;
    /*Component params*/
    dataObject: any;
    whereCondition: any;
    URISegment: string;
    isInternalUser = false;
    isVendor = false;
    updateBtn = '/pms/user-management/update';
    viewBtn = '/pms/user-management/view';
    noRecords = false;
    constructor(
        private _usersApi: UsersApi,
        private _preloaderService: PreloaderService,
        private _appState: AppStateService,
        private _alertService: AlertService,
        private _confirmDialogService: ConfirmDialogService,
        private _activatedRoute: ActivatedRoute,
        private _platformLocation: PlatformLocation,
        private _router: Router,
        private _cd: ChangeDetectorRef
    ) {
        this.URISegment = (_platformLocation as any).location.origin;
        this.currentOffset = this.itemsPerBatch;
    }

    ngOnInit() {
        if (this._appState.getAccessType() === 'internal') {
            this.isInternalUser = true;
        }
        if ((this._appState.getAccessType() === 'vendor') || this._activatedRoute.snapshot.data.page === 'vms') {
            this.updateBtn = '/vms/user-management/vms-update';
            this.viewBtn = '/vms/user-management/vms-view';
            this.isVendor = true;
        }
    }
    initialLoad(filterObj) {
        this.tabId = filterObj.activeTab;
        this.ngxOffset = 0;
        this.isLoadMore = false;
        if (!filterObj.onTabClick) {
            this.currentOffset = this.itemsPerBatch;
            this.dataObject = {};
            this.whereCondition = filterObj.where;
            this.getUserList(0);
        } else {
            this.setLoadMore(this.dataObject, true);
            this.setTableData(this.dataObject);
        }
    }
    getUserList(offset) {
        this._preloaderService.showPreloader();
        this.loadingIndicator = true;
        const obj = {
            activeTab: this.tabId,
            models: 'userslist',
            limit: this.itemsPerBatch,
            order: this.orderBy,
            skip: offset,
            where: this.whereCondition
        }
        this._usersApi.getUserList(obj).subscribe(
            results => {
                if (results && results.user) {
                    this.setLocaldataObject(results);
                    this.setListCount();
                } else {
                    this.dataObject = {};
                    this.tableData = [];
                    this.activeTable = true;
                    this.setlistCount.emit({ users: 0, contacts: 0 });
                }
                this.loadingIndicator = false;
                this._preloaderService.hidePreloader();
            },
            error => {
                this._alertService.warn('Oops! something went wrong.');
                this.loadingIndicator = false;
                this._preloaderService.hidePreloader();
            }
        );
    }

    setLocaldataObject(data) {
        this.setLoadMore(data, false);
        if (!this.isLoadMore) {
            this.dataObject = data;
        } else {
            data.user.forEach(c => {
                this.dataObject.user.push(c);
            });
            data.contact.forEach(c => {
                this.dataObject.contact.push(c);
            });
            this.dataObject.user = [...this.dataObject.user];
            this.dataObject.contact = [...this.dataObject.contact];
        }
        this.dataObject = this.dataObject;
        this.setTableData(this.dataObject);
    }

    setTableData(results) {
        this.tableData = [];
        if (this.tabId !== 'tab-2') {
            this.tableData = results.user;
        } else {
            this.tableData = results.contact;
        }
        this.activeTable = true;
    }

    setLoadMore(data, onTabClick) {
        let isloadMore;
        const userLength = data ? data.user ? data.user.length : 0 : 0;
        const contactLength = data ? data.contact ? data.contact.length : 0 : 0;
        if (onTabClick) {
            if (this.tabId !== 'tab-2') {
                isloadMore = (userLength < this.currentOffset) ? true : false;
            } else {
                isloadMore = (contactLength < this.currentOffset) ? true : false;
            }
        } else {
            if (this.tabId !== 'tab-2') {
                isloadMore = (userLength < this.itemsPerBatch) ? true : false;
            } else {
                isloadMore = (contactLength < this.itemsPerBatch) ? true : false;
            }
        }
        this.noRecords = isloadMore;

    }

    setListCount() {
        const userCount = this.dataObject ? this.dataObject.user ? this.dataObject.user.length : 0 : 0;
        const contactCount = this.dataObject ? this.dataObject.contact ? this.dataObject.contact.length : 0 : 0;
        this.setlistCount.emit({ users: userCount, contacts: contactCount });
    }

    onActionButtonClick(user, navUrl) {
        if (this.tabId === 'tab-2') {
            this._router.navigate([navUrl, user.contactId], { queryParams: { type: 'contact' } });
        } else {
            this._router.navigate([navUrl, user.id], { queryParams: { type: 'user' } });
        }
    }

    onClickResetPassword(user) {
        const _thisEvnt = this;
        this._confirmDialogService.confirmThis(
            {
                title: 'Warning!!',
                titleIcon: 'mdi mdi-alert text-warning',
                text: 'Do you want to reset password of \"' + user.firstName + ' ' + user.lastName + '\" (' + user.email + ') ?'
            },
            function () {
                _thisEvnt._preloaderService.showPreloader();
                _thisEvnt._usersApi.resetPassword({ 'email': user.email, 'URISegment': _thisEvnt.URISegment }).subscribe(
                    data => {
                        _thisEvnt._alertService.success('Reset password E-mail has been sent to ' + user.email);
                        _thisEvnt._preloaderService.hidePreloader();
                    }, err => {
                        _thisEvnt._alertService.warn('Oops! something went wrong.');
                        _thisEvnt._preloaderService.hidePreloader();
                    });
            },
            function () {
                // Do nothing on cancel
                _thisEvnt._preloaderService.hidePreloader();
            }
        );
    }
    onClickActive(user) {
        const _thisEvnt = this;
        const msg = user.isActive ? 'deactivate' : 'activate'
        this._confirmDialogService.confirmThis(
            {
                title: 'Warning!!',
                titleIcon: 'mdi mdi-alert text-warning',
                text: 'Do you want to ' + msg + ' \"' + user.firstName + ' ' + user.lastName + '\" (' + user.email + ') ?'
            },
            function () {
                _thisEvnt._preloaderService.showPreloader();
                const isActive = user.isActive ? false : true;
                _thisEvnt._usersApi.patchAttributes(user.id, { isActive: isActive }).subscribe(res => {
                    _thisEvnt.isLoadMore = false;
                    _thisEvnt.getUserList(0);
                    user['isActive'] = isActive;
                    _thisEvnt._alertService.success('User ' + user.firstName + ' ' + user.lastName + ' ' + msg + 'd successfully!')
                    _thisEvnt._preloaderService.hidePreloader();
                }, err => {
                    _thisEvnt._alertService.warn('Oops! something went wrong.');
                    _thisEvnt._preloaderService.hidePreloader();
                })
            },
            function () {
                // Do nothing on cancel
                _thisEvnt._preloaderService.hidePreloader();
            }
        );
    }

    /*Data Table funcation start here*/
    loadMoreRecords() {
        this.isLoadMore = true;
        const offset = (this.dataObject.user.length > this.dataObject.contact.length) ?
            this.dataObject.user.length : this.dataObject.contact.length;
        this.currentOffset += this.itemsPerBatch;
        this.getUserList(offset);
    }
    ngAfterViewChecked() {
        this.detectChanges()
    }
    detectChanges() {
        if (!this._cd['destroyed']) {
            this._cd.detectChanges();
        }
    }
}
