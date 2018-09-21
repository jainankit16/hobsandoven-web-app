import { Component, OnInit } from '@angular/core';
import { AppStateService } from './../../../services/app-state.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    notifyFilter: any;
    isInternalUser = false;
    isVendor = false;
    createUserLink = '/pms/user-management/create';
    contactsCount = 0;
    usersCount = 0;
    activeTab = 'tab-0';
    filterObj: any;
    constructor(
        private _appState: AppStateService,
        private _activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        if (this._appState.getAccessType() === 'internal') {
            this.isInternalUser = true;
        }
        if ((this._appState.getAccessType() === 'vendor') || this._activatedRoute.snapshot.data.page === 'vms') {
            this.setVendorFilter();
        }
    }
    setVendorFilter() {
        this.createUserLink = '/vms/user-management/vms-create'; // Modify this code here when add vendor feature is done.
        this.isVendor = true;
    }
    /**
     * This method when we chenges in filter selector
     * @param e
     * @e is `Output` type param.
     */
    onFilterChange(e) {
        this.filterObj = e;
        this.setfilter(false)
    }
    /**
     * This method call when we change `ngb-tabset`.
     * @param e
     * @e is a object of seleted `ngb-tab`.
     */
    onTabChange(e) {
        this.activeTab = e.nextId;
        this.setfilter(true)
    }
    /**
     * This method set filter object and pass to Filter `Input`type object in list selector.
     */
    setfilter(onTabClick) {
        this.notifyFilter = { where: this.filterObj, activeTab: this.activeTab, onTabClick: onTabClick };
    }

    /**
     * This method return total nomber of record in user list.
     * @param totalRecord
     * @totalRecord is `Output` type param.
     */
    getlistCount(count) {
        this.contactsCount = count.contacts;
        this.usersCount = count.users;
    }
}
