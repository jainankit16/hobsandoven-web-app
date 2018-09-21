import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PreloaderService } from '../../../../../../services/preloader.service';
import { SharedService } from '../../../../../../services/pms/shared.services';
import { FilterServiceApi } from '../../../../../../sdk';

@Component({
    selector: 'orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.css']
})

export class OrdersListComponent implements OnInit, OnDestroy {

    orders = [];
    selectedOrderId = '';
    userState = {};
    private subscription: Subscription;

    constructor(
        private router: Router,
        private _sharedService: SharedService,
        private _preloaderService: PreloaderService,
        private _filterServiceApi: FilterServiceApi
    ) { }

    ngOnInit() {
        let isCompInit = true;
        this.subscription = this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
            if (
                this.userState['servicemanager'] &&
                this.userState['servicemanager']['case'] &&
                !this.userState['servicemanager']['page']
            ) {
                this.selectedOrderId = this.userState['servicemanager']['case']['caseId'];
                this.userState['servicemanager']['page'] = 'orders-list';
                isCompInit = false;
                this.loadOrdersList('subscriber');
            }
        });
        if (isCompInit && this.userState['servicemanager']['case']) {
            this.selectedOrderId = this.userState['servicemanager']['case']['caseId'];
            this.loadOrdersList('init');
        }
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }

    loadOrdersList(source) {
        let paramObj = {
            'models': ['Case'],
            'where': {},
            'order': 'id ASC'
        };
        // selected account
        if (
            this.userState['servicemanager']['account'] &&
            this.userState['servicemanager']['account']['accountId'] !== 'All Accounts'
        ) {
            paramObj['where']['AccountId'] = this.userState['servicemanager']['account']['accountId'];
        }
        // selected program
        if (
            this.userState['servicemanager']['program'] &&
            this.userState['servicemanager']['program']['programId'] !== 'All Programs'
        ) {
            paramObj['where']['Project_SOP__c'] = this.userState['servicemanager']['program']['programId'];
        }
        // selected jobsite
        if (
            this.userState['servicemanager']['jobsite'] &&
            this.userState['servicemanager']['jobsite']['jobsiteId'] !== 'All Jobsites'
        ) {
            paramObj['where']['Jobsite__c'] = this.userState['servicemanager']['jobsite']['jobsiteId'];
        }
        this._preloaderService.showPreloader();
        this._filterServiceApi.getAllFiltersData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['cases'] && !data['cases']['error']) {
                        this.orders = data['cases']['list'];
                        // set selected order
                        this.setSelectedOrder(source);
                    }
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                console.log('Error fetching data>>', error.message);
                this._preloaderService.hidePreloader();
            }
        );
    }

    setSelectedOrder(source) {
        let exists = false;
        for (let i = 0; i < this.orders.length; i++) {
            if (this.selectedOrderId === this.orders[i]['id']) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            if (this.orders.length) {
                this.selectOrder(this.orders[0]);
            } else {
                this.selectedOrderId = '';
                this.setUserState(source, '');
                this.router.navigate(['/pms/service-manager/list-details', this.selectedOrderId]);
            }
        } else {
            this.setUserState(source, this.selectedOrderId);
        }
    }

    setUserState(source, selectedOrderId) {
        if (source === 'subscriber') {
            this.userState['servicemanager']['case']['caseId'] = selectedOrderId;
            this.userState['servicemanager']['page'] = 'orders-list';
            this.userState['servicemanager']['isCompleted'] = true;
            this._sharedService.setUserState(this.userState);
        }
    }

    selectOrder(order) {
        this.selectedOrderId = order['id'];
        this.router.navigate(['/pms/service-manager/list-details', this.selectedOrderId]);
    }

}
