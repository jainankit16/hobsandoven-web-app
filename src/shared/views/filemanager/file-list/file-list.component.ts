import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ModelNames } from '../../../models/static-list-data.service';
import { ModalService } from '../../../services/modal.service';
import { DocumentService } from '../../../services/document.service';
import { AppStateService } from '../../../services/app-state.service';
import { DepartmentService } from '../../../services/department.service';

import { UsersApi, AccountApi, ProjectApi, DocumentApi } from '../../../sdk';
import { environment } from '../../../../environments/environment';
import { UtilityService } from '../../../services/utility.service';

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.css']
})

export class FileListComponent implements OnInit {

    selectedAccountId: string;

    @Input() allowFiltering = true;
    pageTitle: any;
    filterCondition: any;
    user: any;
    containerPath: string;
    userAccessType: string;

    loadingIndicator = true;
    /*Boot-Datatable params */
    isTableData = false;
    tableData = [];
    tableResource: any;
    tableDataCount = 0;
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 200;
    orderBy = 'createdAt DESC';
    attrContent = 'data-content';
    maxDate = new Date();
    /*ng-select param*/
    PmsAccountId = '';
    isAccountDisabled = false;
    modelNames = ModelNames;

    selectedRange: any;

    accountsTypeahead = new EventEmitter<string>();
    accounts: Array<any>;
    accountFilterItems = [];
    accountsSelected = [];

    departments: Array<any>;
    departmentsLoading = true;
    departmentsSelected = [];

    modelsList: Array<any>;
    modelsSelected = [];

    programLoading = false;
    programs: Array<any>;
    programsParents = {};
    programFilterItems = [];
    programsSelected = [];

    parentCategories = {};
    categories: Array<any>;
    categoriesFlat = {};
    categoriesLoading = true;
    categoriesSelected = [];

    subCategories: Array<any>;
    subCategoriesLoading = true;
    subCategoriesSelected = [];
    noRecords = false;
    noAccount = 'Searching...';

    constructor(
        private _cd: ChangeDetectorRef,
        private _router: Router,
        public _docService: DocumentService,
        private _departmentService: DepartmentService,
        private _modalService: ModalService,
        private _appState: AppStateService,
        private _documentApi: DocumentApi,
        private _accountApi: AccountApi,
        private _projectApi: ProjectApi,
        private _userApi: UsersApi,
        private _utilityService: UtilityService
    ) {
        this.pageTitle = 'Document List';
        this._userApi.getCurrent().subscribe(result => {
            this.user = result;
        });
    }

    ngOnInit() {
        this.userAccessType = this._appState.getAccessType();
        this.selectedAccountId = this._appState.getSelectedAccount();
        this.containerPath = environment.baseUrl + '/' + environment.apiVersion + '/Containers/';

        if (this.allowFiltering) {
            this.searchAccountNames();
            this.getCategories();
            this.getTitles();
            this.getDepartments();
            this.accessPermission();
            this.getAllModels();
        }
    }

    changeView(e) {
        if (!e.target.checked) {
            if (this.userAccessType === 'internal') {
                // this._router.navigate(['app', 'file-manager', 'browser']);
                this._router.navigate(['app', 'file-manager', 'browser', 'jobsiteView', 'Account']);
            } else {
                const accountId = this.selectedAccountId;
                if (accountId) {
                    this._router.navigate(['app', 'file-manager', 'browser', 'jobsiteView', 'Program', accountId]);
                } else {
                    this._router.navigate(['/']);
                }

            }
        }
    }

    // groupByAccount = item => item.Partner.Name;

    //    groupDocCategories = item => item.parent.title; // performs category | sub category grouping
    // Get Document Categories and Sub Categories
    getCategories() {
        this._docService.getCategories().subscribe(results => {
            this.categories = results;
            this.categoriesLoading = false;
        });
    }

    getTitles() {
        this._docService.getTitles().subscribe(results => {
            this.subCategories = [];
            results.forEach(c => {
                if (c.documentCategory) {
                    c.parent = c.documentCategory.title
                }
                this.subCategories.push(c);
            });
            this.subCategoriesLoading = false;
        });
    }

    // Get Departments
    getDepartments() {
        this._departmentService.getDepartments().subscribe(
            results => {
                this.departments = results;
                this.departmentsLoading = false;
            },
            err => {
                this.departments = [];
            }
        );
    }

    // Get Model Names
    getAllModels() {
        this.modelsList = ModelNames;
    }

    // Get Accounts filtered by name
    searchAccountNames() {
        this.accountFilterItems = [];
        this.accountsTypeahead
            .pipe(
                distinctUntilChanged(),
                debounceTime(200),
                switchMap(term =>
                    (term) ? this._accountApi.find({
                        where: { Name: { like: '%' + term.trim() + '%', options: 'i' } },
                        fields: ['Name', 'id', 'sfdcId']
                    }) : this.accountFilterItems = []
                )
            )
            .subscribe(
                x => {
                    this._cd.markForCheck();
                    this.accountFilterItems = x;
                    this.noAccount = (this.accountFilterItems.length === 0) ? 'No account found.' : '';
                },
                err => {
                    console.log(err);
                    this.accountFilterItems = [];
                    this.noAccount = '';
                }
            );
    }

    // Account change trigger
    onAccountChnage(e) {
        if (this.accountsSelected.length) {
            this.programLoading = true;
            this.loadProgramsForAccounts(this.accountsSelected);
        }
    }

    // Load master programs for selected Accounts
    loadProgramsForAccounts(accounts) {
        this.programsSelected = []; // clears previous program selection
        this._projectApi
            .getMasterProjects({
                accountId: accounts,
                fields: ['sfdcId', 'Name', 'Project__c', 'Account__c']
            })
            .subscribe(
                result => {
                    // console.log(result.programs);
                    let filteredPrograms = [];
                    result.programs.forEach(p => {
                        let obj = {
                            name: p.Name + ' (' + p.Project__c + ')',
                            id: p.sfdcId,
                            accountId: p.Account__c,
                            account: p.Partner.Name
                        };
                        filteredPrograms.push(obj);
                    });
                    this.programFilterItems = filteredPrograms;
                    this.programLoading = false;
                },
                err => {
                    this.programFilterItems = [];
                    this.programLoading = false;
                }
            );
    }

    /// to open modal
    // open(content, size) {
    //     this._modalService.open(content, size);
    //     this.isTableData = false;
    // }

    uploadModalClosed(e) {
        this.isTableData = true;
    }

    accessPermission() {
        if (this.userAccessType === 'internal') {
            this.getDocumentList(0);
        } else {
            this.isAccountDisabled = true;
            this.PmsAccountId = this.selectedAccountId;
            this.loadProgramsForAccounts([this.PmsAccountId]);
            this.filterCondition = { 'context.accountsfdcId': this.PmsAccountId };
            this.getDocumentList(0);
        }
    }

    getDocumentList(offset) {
        const findObj = {
            limit: this.itemsPerBatch,
            order: this.orderBy,
            skip: offset,
            where: (this.allowFiltering !== undefined) ? this.filterCondition : ''
        }
        this._documentApi.getDataForListView(findObj).subscribe(
            results => {
                //  console.log("results", results)
                if (results.length < this.itemsPerBatch) {
                    this.noRecords = true;
                }
                if (!this.isLoadMore) {
                    this.tableData = results;
                    this.isTableData = true;
                } else {
                    results.forEach(c => {
                        this.tableData.push(c);
                    });
                    this.tableData = [...this.tableData];
                }

                this.loadingIndicator = false;
            },
            err => {
                this.isTableData = true;
                this.loadingIndicator = false;
                this.tableData = [{
                    'message': err.message,
                }]
            }
        );
    }

    documentUploaded(event: any) {
        event.forEach(e => {
            this.tableData.unshift(e);
        });
        this.tableData = [...this.tableData];
        this.isTableData = true;
    }

    filterDocuments() {
        this.isLoadMore = false;

        let accountArr = this.accountsSelected;
        if (this.userAccessType !== 'internal') {
            accountArr = [this.PmsAccountId]
        }
        const departmentArr = this.departmentsSelected;
        const modelArr = this.modelsSelected;
        const programArr = this.programsSelected;

        const categoryArr = this.categoriesSelected;
        const subCategoryArr = this.subCategoriesSelected;
        let dateFrom = (this.selectedRange && this.selectedRange[0])
            ? this._utilityService.dateFormate(this.selectedRange[0], 'shortDate') + ' 00:00:00'
            : '';
        let dateTo = (this.selectedRange && this.selectedRange[1])
            ? this._utilityService.dateFormate(this.selectedRange[0], 'shortDate') + ' 23:59:59'
            : '';

        const filterObj = {};

        if (accountArr && accountArr.length > 0) {
            filterObj['context.accountsfdcId'] = { inq: accountArr };
        }
        if (departmentArr && departmentArr.length > 0) {
            filterObj['context.departmentId'] = { inq: departmentArr };
        }
        if (modelArr && modelArr.length > 0) {
            filterObj['modelName'] = { inq: modelArr };
        }
        if (programArr && programArr.length > 0) {
            filterObj['context.programsfdcId'] = { inq: programArr };
        }
        if (categoryArr && categoryArr.length > 0) {
            filterObj['categoryId'] = { inq: categoryArr };
        }
        if (subCategoryArr && subCategoryArr.length > 0) {
            filterObj['subCategoryId'] = { inq: subCategoryArr };
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
            this.isTableData = false;
            this.noRecords = false;
            this.getDocumentList(0);
        }
    }

    loadMoreRecords() {
        this.isLoadMore = true;
        this.loadingIndicator = true;
        this.getDocumentList(this.tableData.length);
    }

    resetFilters() {
        if (this.userAccessType === 'internal') {
            this.accountsSelected = [];
        }
        this.departmentsSelected = [];
        this.modelsSelected = [];
        this.programsSelected = [];
        this.categoriesSelected = [];
        this.subCategoriesSelected = [];
        this.selectedRange = null;
        this.filterDocuments();
    }
    clearPrograms() {
        this.programFilterItems = [];
    }
}
