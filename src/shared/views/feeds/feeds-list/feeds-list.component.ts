import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { ModalService } from '../../../services/modal.service';
import { AppStateService } from '../../../services/app-state.service';
import { ModelNames } from '../../../models/static-list-data.service';

import { ActivityApi, AccountApi, ProjectApi } from '../../../sdk';
import { UtilityService } from '../../../services/utility.service';
import { SharedService } from '../../../services/pms/shared.services';
import { PreloaderService } from 'shared/services/preloader.service';

@Component({
    selector: 'app-feeds-list',
    templateUrl: './feeds-list.component.html',
    styleUrls: ['./feeds-list.component.css']
})

export class FeedsListComponent implements OnInit, AfterViewInit {

    @Input() allowFiltering = true;
    pageTitle: any;
    filterCondition: any;
    public feeds = [];
    accountsTypeahead = new EventEmitter<string>();
    accounts: Array<any>;
    accountsFilterItems = [];
    accountsSelected = [];
    programsTypeahead = new EventEmitter<string>();
    programs: Array<any>;
    programsFilterItems = [];
    programsSelected = [];
    programLoading = false;
    modelsList = [];
    modelsSelected = [];
    maxDate = new Date();
    selectedRange: any;
    /*Boot-Datatable params */
    tableData = [];
    itemsPerPage = 10;
    offset = 0;
    isLoadMore = false;
    itemsPerBatch = 200;
    loadingIndicator = false;
    errorMessage: any;
    orderBy = 'createdAt DESC';
    attrContent = 'data-content';
    ExpandViewTitle: any;
    currentExpandViewId: any;
    userAccessType: string;
    accountId: string;
    noRecords = false;
    columns: any;
    @ViewChild('myTable') table: any;
    allColumns: any;


    constructor(
        private _router: Router,
        private _cd: ChangeDetectorRef,
        private _fb: FormBuilder,
        private _modalService: ModalService,
        private _appState: AppStateService,
        private _activityApi: ActivityApi,
        private _accountApi: AccountApi,
        private _projectApi: ProjectApi,
        private _utilityService: UtilityService,
        private _sharedservice: SharedService,
        private el: ElementRef,
        private _loader: PreloaderService,
    ) { }

    ngAfterViewInit() {
        let elHeader = this.el.nativeElement.querySelector('.datatable-header')
        let elBody = this.el.nativeElement.querySelector('datatable-body');
        elHeader.onscroll = () => {
            elBody.scrollLeft = elHeader.scrollLeft
        }
        elBody.onscroll = () => {
            elHeader.scrollLeft = elBody.scrollLeft
        }
    }

    ngOnInit() {
        this.pageTitle = 'Activity Feed List';
        this.userAccessType = this._appState.getAccessType();
        this.columns = [
            { name: 'Account', prop: 'accountName', width: 150, visible: (this.userAccessType === 'internal') ? true : false, sortable: true },
            { name: 'Program', prop: 'programName', width: 200, visible: true, sortable: true },
            { name: 'Description', prop: 'description', width: 400, visible: true, sortable: true },
            { name: 'Activity By', prop: 'activityByName', width: 120, visible: true, sortable: true },
            { name: 'Date', prop: 'createdAt', width: 150, visible: true, sortable: true },
            { name: 'Action', prop: 'action', width: 80, visible: true, sortable: false }
        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling
        this.accountId = this._appState.getSelectedAccount();

        this.searchAccountNames();
        this.getAllModels();
        this.loadFeed();
    }

    toggle(col) {
        col.visible = !col.visible;
    }

    loadFeed() {
        if (this.userAccessType !== 'internal') {
            this.loadProgramsForAccounts([this.accountId]);
            this.filterCondition = { 'context.accountId': this.accountId };
        } else if (localStorage.getItem('ImpersonationId')) {
            this.loadProgramsForAccounts([localStorage.getItem('ImpersonationId')]);
            this.filterCondition = { 'context.accountId': localStorage.getItem('ImpersonationId') };
        }
        this.getFeeds(0);
    }
    getFeeds(offset) {
        const findObj = this.getFilterCondition(offset);
        this.loadingIndicator = true;
        this._activityApi.find(findObj).subscribe(
            data => {
                if (data.length < this.itemsPerBatch) {
                    this.noRecords = true;
                } else {
                    this.noRecords = false;
                }
                const results = this.modifyData(data);
                if (!this.isLoadMore) {
                    this.tableData = (results) ? results : [];
                    this._loader.hidePreloader();
                    this.loadingIndicator = false;
                } else {
                    if (results.length) {
                        results.forEach(c => {
                            this.tableData.push(c);
                        });
                        this.tableData = [...this.tableData];
                    }
                    this._loader.hidePreloader();
                    this.loadingIndicator = false;
                }
            },
            err => {
                this.errorMessage = err.messages;
                this._loader.hidePreloader();
                this.loadingIndicator = false;
            }
        );
    }

    modifyData(data) {
        if (data.length) {
            data.forEach((item, index) => {
                item['accountName'] = (item.context && item.context.accountName) ? item.context.accountName : '';
                item['programName'] = (item.context && item.context.programName) ? item.context.programName : '';
                item['viewUrl'] = (item.context && item.context.viewUrl) ? item.context.viewUrl : '';
                item['viewUrlTitle'] = (item.context && item.context.viewUrlTitle) ? item.context.viewUrlTitle : '';
                item['description'] = (item.description) ? item.description : '';
                item['activityByName'] = (item.context && item.context.activityByName) ? item.context.activityByName : '';
                item['createdAt'] = (item.createdAt) ? this._utilityService.dateFormate(item.createdAt) : '';
                item['viewUrl'] = (item.context && item.context.viewUrl) ? item.context.viewUrl : '';

                //  delete key
                delete item.context;
            });
            return data;
        } else {
            return [];
        }
    }

    getFilterCondition(offset) {
        const findObj = {
            limit: this.itemsPerBatch,
            order: this.orderBy,
            skip: offset
        };
        if (this.allowFiltering && this.filterCondition) {
            findObj['where'] = this.filterCondition;
        }
        return findObj;
    }

    /*Data Table funcation start here*/
    loadMoreRecords() {
        this.isLoadMore = true;
        this.loadingIndicator = true;
        this._loader.showPreloader();
        this.offset = this.tableData.length;
        this.getFeeds(this.tableData.length);
    }

    searchAccountNames() {
        this.accountsFilterItems = [];
        this.accountsTypeahead.pipe(
            distinctUntilChanged(),
            debounceTime(200),
            switchMap(term =>
                (term) ? this._accountApi.find(
                    {
                        where: { Name: { like: '%' + term + '%', options: 'i' } },
                        fields: ['Name', 'sfdcId']
                    }) : this.accountsFilterItems = []
            ))
            .subscribe(x => {
                this._cd.markForCheck();
                this.accountsFilterItems = x;
            }, (err) => {
                console.log(err);
                this.accountsFilterItems = [];
            });
    }

    // Account change trigger
    onAccountChnage(e) {
        if (this.accountsSelected.length) {
            this.programLoading = true;
            this.loadProgramsForAccounts(this.accountsSelected);
        } else {
            this.programLoading = false;
            this.programsSelected = [];
            this.programsFilterItems = [];
            this.accountsFilterItems = [];
        }
    }

    // Load master programs for selected Accounts
    loadProgramsForAccounts(accounts) {
        this.programsSelected = []; // clears previous program selection
        this._projectApi
            .getMasterProjects({
                accountId: accounts
            })
            .subscribe(
                result => {
                    this.programsFilterItems = result.programs;
                    this.programLoading = false;
                },
                err => {
                    this.programsFilterItems = [];
                    this.programLoading = false;
                }
            );
    }

    refreshView() {
        this.isLoadMore = false;
        this.table.offset = 0
        let inputs;
        let index;
        inputs = document.getElementsByTagName('input');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].value = '';
        }
        // this.filterObj = {};
        this.getFeeds(0);
    }


    getAllModels() {
        this.modelsList = ModelNames;
    }
    clearDate() {
        this.selectedRange = '';
    }
    filterFeeds() {
        let dateFrom: any;
        let dateTo: any;
        if (this.selectedRange && this.selectedRange.length > 0) {
            dateFrom = this.selectedRange[0]
                ? this.transform(this.selectedRange[0]) + ' 00:00:00'
                : '';
            dateTo = this.selectedRange[1]
                ? this.transform(this.selectedRange[1]) + ' 23:59:59'
                : '';
            dateFrom = new Date(dateFrom);
            dateTo = new Date(dateTo);
        }

        const filterObj = {};
        if (this.userAccessType === 'internal') {
            if (this.accountsSelected && this.accountsSelected.length > 0) {
                filterObj['context.accountId'] = { inq: this.accountsSelected };
            }
        } else {
            filterObj['context.accountId'] = { inq: this.accountId };
        }

        if (this.modelsSelected && this.modelsSelected.length > 0) {
            filterObj['modelName'] = { inq: this.modelsSelected };
        }
        if (this.programsSelected && this.programsSelected.length > 0) {
            filterObj['context.programId'] = { inq: this.programsSelected };
        }

        if (dateFrom && dateTo) {
            filterObj['createdAt'] = { between: [dateFrom, dateTo] };
        } else if (dateFrom) {
            filterObj['createdAt'] = { gte: dateFrom };
        } else if (dateTo) {
            filterObj['createdAt'] = { lte: dateTo };
        }
        if (filterObj) {
            this.filterCondition = filterObj;
            this.isLoadMore = false;
            this.getFeeds(0);
        }
    }

    resetFilters() {
        this.accountsFilterItems = [];
        this.accountsSelected = [];
        this.modelsSelected = [];
        this.programsFilterItems = [];
        this.programsSelected = [];
        this.programLoading = false;
        this.selectedRange = [];
        this.filterCondition = {};
        this.loadFeed();
    }

    transform(value: string) {
        const datePipe = new DatePipe('en-US');
        value = datePipe.transform(value, 'shortDate');
        return value;
    }

    openDetails(content, size, id, title) {
        this.ExpandViewTitle = title;
        this.currentExpandViewId = id;
        this._modalService.open(content, size);
    }

    goToUrl(viewUrl) {
        if (viewUrl) {
            this._router.navigateByUrl(viewUrl);
        }
    }

    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'ActivityFeeds');

    }
}
