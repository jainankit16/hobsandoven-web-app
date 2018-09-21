import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription, Subject, Observable } from 'rxjs/Rx';

import { CommonService } from '../../services/common.service';
import { UtilityService } from '../../services/utility.service';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/authentication.service';
import { AppStateService } from '../../services/app-state.service';
import { SocketService } from '../../services/socket.service';
import { PreloaderService } from '../../services/preloader.service';

import { UsersApi, AccountApi } from '../../sdk';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-nav-header',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    providers: [ModalService, UtilityService]
})

export class NavigationComponent implements OnInit, OnDestroy {

    user: any;
    imgpath: any;
    accessType = '';
    webTitle = 'ServiceO';
    notification: number;
    viewType = '';
    render = '/pms';
    toggleSwitch: any;
    private subscription: Subscription;
    private subscription1: Subscription;
    @ViewChild('openModel') openModel: ElementRef;
    accounts = [];
    vendor: any;
    tableData = [];
    noRecords: any;
    itemsPerPage = 10;
    itemsPerBatch = 200;
    loadingIndicator: any;
    recordTypeId = '0121a000000QaUYAA0';
    txtAccountName = '';
    public keyUp = new Subject<string>();

    constructor(
        private _location: Location,
        private _cdRef: ChangeDetectorRef,
        private _router: Router,
        private authSerice: AuthService,
        private _preloader: PreloaderService,
        private _appState: AppStateService,
        private _utilityService: UtilityService,
        private commonService: CommonService,
        private _modalService: ModalService,
        private _socketService: SocketService,
        private usersApi: UsersApi,
        private accountApi: AccountApi
    ) { }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this._router.url.indexOf('pms') !== -1) {
            localStorage.removeItem('ImpersonationId');
            this._appState.setNavAsVendor(null);
        }
    }

    ngOnInit() {
        this.imgpath = environment.baseUrl + '/' + environment.apiVersion;
        this.accessType = this._appState.getAccessType();
        // Total notification autoupdate after event
        this.getNotificationsCount();
        // set current view name
        this.setCurrentView();
        // set home page url
        this.setHomePageUrl();
        // get current user
        this.setCurrentUser();
        // init server side search for account
        this.initAccountSearch();
        // check vendor view
        this.checkVendorView();
    }

    getNotificationsCount() {
        this.subscription = this._socketService.getCountNotification().subscribe(
            unreadNotification => {
                this.notification = unreadNotification;
            }
        );
    }

    setCurrentView() {
        this.viewType = '';
        if (this._location.path().indexOf('vms') !== -1 || this._location.path().indexOf('app') !== -1) {
            this.viewType = 'vms';
            this.toggleSwitch = { title: 'Switch to PMS', url: '/pms' };
        } else {
            this.viewType = 'pms';
            this.toggleSwitch = { title: 'Switch to VMS', url: '/vms' };
        }
    }

    setHomePageUrl() {
        this.render = this._appState.getHomeUrl();
        if (!this.render || this.render === '') {
            this.render = '/login';
        }
    }

    setCurrentUser() {
        this.commonService.getUserProfile().subscribe(
            userProfile => {
                this.user = userProfile;
            }
        );
        // set user profile
        if (this.user && this.user['id']) {
            this.accessType = this.user['accessType'];
            this.getProfileImage();
        } else {
            this.usersApi.getCurrent().subscribe(
                user => {
                    this.accessType = user.accessType;
                    this.user = user;
                    this.getProfileImage();
                }
            );
        }
    }

    getProfileImage() {
        if (this.user.profileImage) {
            this.setProfileImage(this.user);
        } else {
            this.user.profileImage = '';
            this.commonService.setUserProfile(this.user);
        }
        /* to open password modal to indicate user to change password */
        if (this.user.promptPasswordChange) {
            this.openModel.nativeElement.click();
            this.detectChanges();
        }
    }

    setProfileImage(user) {
        this.commonService.fileExist(user.id, user.profileImage).subscribe(
            profileImgData => {
                if (profileImgData) {
                    this.user.profileImage = user.profileImage;
                }
            },
            error => {
                this.user.profileImage = '';
                this.commonService.setUserProfile(this.user);
            }
        );
    }

    detectChanges() {
        if (!this._cdRef['destroyed']) {
            this._cdRef.detectChanges();
        }
    }

    initAccountSearch() {
        const observable = this.keyUp
            .map(value => value['target']['value'].toLowerCase())
            .debounceTime(300)
            // .distinctUntilChanged()
            .flatMap((search) => {
                return Observable.of(search).delay(300);
            })
            .subscribe((data) => {
                this.getAccount(0, false);
            });
    }

    checkVendorView() {
        this.vendor = null;
        if (this.accessType === 'internal' && this.viewType === 'vms' && localStorage.getItem('ImpersonationId')) {
            if (this.vendor && this.vendor['sfdcId']) {
                this.setVendorView(this.vendor);
            } else {
                this.accountApi.find({
                    where: { sfdcId: localStorage.getItem('ImpersonationId') },
                    fields: ['id', 'sfdcId', 'Name', 'Company_Reference_code__c', 'createdAt']
                }).subscribe(result => {
                    if (result && result.length) {
                        this.setVendorView(result[0]);
                    } else {
                        this.setVendorView(null);
                    }
                }, err => {
                    this.setVendorView(null);
                });
            }
        } else {
            this.setVendorView(null);
        }
    }

    setVendorView(vendor) {
        this.vendor = vendor;
        if (vendor) {
            localStorage.setItem('ImpersonationId', vendor['sfdcId']);
        } else {
            localStorage.removeItem('ImpersonationId');
        }
        this._appState.setNavAsVendor(this.vendor);
    }

    showVendorView(account) {
        this.setVendorView(account);
        this._modalService.closed();
        window.location.reload();
    }

    closeVendorView($event) {
        this.setVendorView(null);
        window.location.reload();
    }

    logout() {
        this.authSerice.logout();
    }

    onLogoClick() {
        if (this.accessType === 'partner') {
            this._router.navigate(['/pms']);
        } else if (this.accessType === 'vendor') {
            this._router.navigate(['/vms']);
        } else if (this.accessType === 'internal') {
            if (this.viewType === 'vms') {
                this._router.navigate(['/vms']);
            } else if (this.viewType === 'pms') {
                this._router.navigate(['/pms']);
            }
        }
    }

    open(content, size, src) {
        this._modalService.open(content, size);
        if (src === 'ViewAsVendor') {
            this.txtAccountName = '';
            this.getAccount(0, false);
        }
    }

    gotToOrderList() {
        if (this._router.url.indexOf('orders-list') === -1) {
            this._router.navigate(['/pms/service-manager/orders-list']);
        } else {
            window.location.reload();
        }
    }

    showJobs(val) {
        const url = '/vms/jobs';
        if (val === 'all') {
            this._router.navigate([url]);
        } else if (val === 'invited') {
            this._router.navigate([url + '/invited']);
        }
    }

    downloadFile() {
        let filePath = '';
        if (this.accessType === 'internal') {
            filePath = '../../../assets/docs/MSP_User_Manual.pdf';
        } else if (this.accessType === 'partner') {
            filePath = '../../../assets/docs/PMS_User_Manual.pdf';
        } else if (this.accessType === 'vendor') {
            filePath = '../../../assets/docs/VMS_User_Manual.pdf';
        }

        if (filePath) {
            return this._utilityService.downloadAndOpenPdfFile(filePath, 'ServiceO-User Manual.pdf');
        } else {
            alert('Help document not found !!');
        }
    }

    getAccount(offset: number, isLoadMore = false) {
        this.loadingIndicator = true;
        this._preloader.showPreloader();
        this.accountApi.find({
            fields: ['id', 'sfdcId', 'Name', 'Company_Reference_code__c'],
            limit: this.itemsPerBatch,
            where: this.txtAccountName ? { Name: { 'like': '%' + this.txtAccountName + '%' }, RecordTypeId: this.recordTypeId } :
                { Name: { 'neq': this.txtAccountName }, RecordTypeId: this.recordTypeId },
            skip: offset
        }).subscribe(accounts => {
            this.noRecords = (accounts.length < this.itemsPerBatch) ? true : false;
            if (!isLoadMore) {
                this.accounts = accounts;
            } else {
                accounts.forEach(c => {
                    this.accounts.push(c);
                });
                this.accounts = [...this.accounts];
            }
            this.setDataTable();
        }, err => {
            this.loadingIndicator = false;
            this._preloader.hidePreloader();
        })
    }

    loadMoreRecords() {
        this.getAccount(this.accounts.length, true);
    }

    setDataTable() {
        if (this.txtAccountName) {
            const val = this.txtAccountName.toLowerCase();
            this.tableData = this.accounts.filter(function (d) {
                return d.Name.toLowerCase().indexOf(val) !== -1 || !val;
            });
        } else {
            this.tableData = this.accounts;
        }
        this.loadingIndicator = false;
        this._preloader.hidePreloader();
    }
}
