import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterServiceApi, ProjectApi } from '../../../../sdk';
import { AppStateService } from './../../../../services/app-state.service';
import { PreloaderService } from 'shared/services/preloader.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './../../../../services/modal.service';

@Component({
    selector: 'app-filter-user',
    templateUrl: './filter-user.component.html',
    styleUrls: ['./filter-user.component.css']
})
export class FilterUserComponent implements OnInit {
    // variable to notify orders list to filter data
    @Output() filterData: EventEmitter<Object> = new EventEmitter<Object>();
    selectedAccountId: string;
    accountArr = [];
    accountNameArr = [];
    isInternalUser = false;
    isVendor = false;
    ddlObj = {
        accounts: [],
        programs: [],
        departments: [],
        groups: [],
        regions: [],
        shiftEquSchedules: []
    }
    ddlSelectedObj = {
        account: '',
        program: '',
        department: '',
        group: '',
        region: '',
        shiftEquSchedule: ''
    }
    constructor(
        private _projectApi: ProjectApi,
        private _appState: AppStateService,
        private _modalService: ModalService,
        private _activatedRoute: ActivatedRoute,
        private _filterServiceApi: FilterServiceApi,
        private _preloaderService: PreloaderService
    ) {
        if (this._appState.getAccessType() === 'internal') {
            this.isInternalUser = true;
        }
        if ((this._appState.getAccessType() === 'vendor') ||
            (this._appState.getAccessType() === 'partner') ||
            (this._activatedRoute.snapshot.data.page === 'vms')) {
            this.isVendor = true;
        }
    }
    ngOnInit() {
        this.getCurrentUser();
    }
    getCurrentUser() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        if (this.selectedAccountId) {
            const paramObj = {
                'models': ['Account', 'Department', 'Group', 'Region', 'WorkerShift']
            };
            if (this._appState.getAccessType() === 'internal') {
                this.isInternalUser = true;
            } else {
                paramObj['accountId'] = this.selectedAccountId
            }
            this.loadDropdownData(paramObj);
            this.ddlSelectedObj.account = this.selectedAccountId;
            this.onAccountChange();
        }
    }

    loadDropdownData(paramObj) {
        // get data for filters
        this._filterServiceApi.getAllFiltersData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    // accounts
                    if (data['accounts'] && data['accounts']['list']) {
                        this.ddlObj.accounts = data['accounts']['list'];
                    }
                    // department
                    if (data['department'] && data['department']['list']) {
                        this.ddlObj.departments = data['department']['list'];
                    }
                    // group
                    if (data['groups'] && data['groups']['list']) {
                        this.ddlObj.groups = data['groups']['list'];
                    }
                    // region
                    if (data['regions'] && data['regions']['list']) {
                        this.ddlObj.regions = data['regions']['list'];
                    }
                    // workerShift
                    if (data['workerShifts'] && data['workerShifts']['list']) {
                        this.ddlObj.shiftEquSchedules = data['workerShifts']['list'];
                    }
                    this.notifyFilterValues();
                }
            },
            error => {
                console.log('Error fetching data>>', error.message);
                this._preloaderService.hidePreloader();
            }
        );
    }

    onFilterChange(source) {
        if (source === 'account') {
            this.onAccountChange();
        }
        this.notifyFilterValues();
    }

    onAccountChange() {
        if (this.ddlSelectedObj.account && this.ddlSelectedObj.account !== '' && !this.isVendor) {
            this._projectApi.getMasterProjects({ accountId: this.ddlSelectedObj.account }).subscribe(
                res => {
                    if (res && res.programs) {
                        this.ddlObj.programs = res.programs;
                    } else {
                        this.ddlSelectedObj.program = null;
                    }
                    this._preloaderService.hidePreloader();
                },
                err => {
                    this._preloaderService.hidePreloader();
                })
        }
    }

    getAccountArr(accounts) {
        this.accountArr = [];
        if (accounts && accounts.sfdcId) {
            this.accountArr = accounts.sfdcId;
            this.accountNameArr = accounts.Name;
            this._appState.setSelectedAccount(accounts.sfdcId[0]);
        }
        this.notifyFilterValues()
    }
    // Emit selected filter values
    notifyFilterValues() {
        const filterObj = {}
        if (this.accountArr && this.accountArr.length) {
            filterObj['AccountId'] = { inq: this.accountArr }
        } else if (this.ddlSelectedObj.account) {
            filterObj['AccountId'] = this.ddlSelectedObj.account
        } else {
            filterObj['AccountId'] = this.selectedAccountId;
        }
        if (this.ddlSelectedObj.program) {
            filterObj['Program'] = this.ddlSelectedObj.program
        }
        if (this.ddlSelectedObj.department) {
            filterObj['Department'] = this.ddlSelectedObj.department
        }
        if (this.ddlSelectedObj.group) {
            filterObj['Group'] = this.ddlSelectedObj.group
        }
        if (this.ddlSelectedObj.region) {
            filterObj['Region'] = this.ddlSelectedObj.region
        }
        if (this.ddlSelectedObj.shiftEquSchedule) {
            filterObj['Shift'] = this.ddlSelectedObj.shiftEquSchedule
        }
        this.filterData.emit(filterObj);
    }
    reset() {
        this.ddlSelectedObj.account = this.selectedAccountId;
        this.onAccountChange();
        this.accountArr = [];
        this.accountNameArr = [];
        this.ddlSelectedObj.program = '';
        this.ddlSelectedObj.department = '';
        this.ddlSelectedObj.group = '';
        this.ddlSelectedObj.region = '';
        this.ddlSelectedObj.shiftEquSchedule = '';
        this.notifyFilterValues();
    }

    showAccountList(content, size) {
        this._modalService.open(content, size);
    }

}
