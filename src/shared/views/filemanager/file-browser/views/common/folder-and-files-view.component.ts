import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

import { ModalService } from '../../../../../services/modal.service';
import { AppStateService } from '../../../../../services/app-state.service';
import { AccountTypeService } from '../../../../../services/account-type.service';
import { ToolbarComponent } from '../../../../../components/toolbar/toolbar.component';
import { DocumentApi, UsersApi } from '../../../../../sdk';
import { PreloaderService } from '../../../../../services/preloader.service';
import { environment } from '../../../../../../environments/environment';
import { UtilityService } from '../../../../../services/utility.service';

@Component({
    selector: 'app-folder-and-file-view',
    templateUrl: 'folder-and-files-view.component.html',
    styleUrls: ['folder-and-files-view.component.css']
})

export class FolderAndFileViewComponent implements OnInit, AfterViewInit {
    @Input() modelName;
    @Input() sfdcId;
    @Input() currentLevel;
    @Input() viewType;
    @Input() viewTypes;
    // For File Upload Selector
    uploadModelName;
    uploadModelId;
    loadFilesForModel;
    isLoadFiles;
    folderName: any;

    tableData = [];
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 200;
    orderBy = 'Name Asc';
    columns: any[];
    allColumns: any[];
    accountTypes = []
    selectedAccountType: any;

    // viewTypes = []
    selectedViewType: any;

    containerPath: string;
    userAccessType: string;
    token: any;
    breadCrumbs: any;
    isUploadDisabled = false;
    items: Observable<Array<string>>;
    term = new FormControl();

    modelId: any;

    // modelName: any;
    currentRouteId: any;
    detailModalId: any;
    detailModalName: any;
    isFile = false;
    isDetailDisabled = false
    sharedModalData: any;
    // currentLevel: any;
    offset = 0;
    @ViewChild(DatatableComponent) table: DatatableComponent;

    /*toolbar basic configuration */
    toolbarOptions: any = [];
    @ViewChild('uploadContent') uploadContent: ElementRef; // in case of modal
    @ViewChild(ToolbarComponent) toolbarConfig: ToolbarComponent;
    /*end of toolbar basic configuration */
    noRecords = false;
    constructor(
        private _preloaderService: PreloaderService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _modalService: ModalService,
        private _appState: AppStateService,
        private usersApi: UsersApi,
        private _accountTypeService: AccountTypeService,
        private _documentApi: DocumentApi,
        private _utilityService: UtilityService
    ) {
        const s = this._router.routeReuseStrategy;
        s.shouldReuseRoute = () => false;
        this.folderName = _route.snapshot.queryParams['fn'];
    }
    ngOnInit() {
        // this._userApi.getCurrent().subscribe(result => {
        //     this.user = result;
        // });
        this.token = this.usersApi.getCurrentToken();
        this.containerPath = environment.baseUrl + '/' + environment.apiVersion + '/Containers/';
        this.userAccessType = this._appState.getAccessType();

        this.getAccountTypes();  // Loads account types
        this.selectedViewType = this.viewTypes.find(obj => obj.value === this.viewType);
        const currentFolderObj = this.selectedViewType.folderHiearchy.find(obj => obj.model === this.modelName);
        this.isLoadFiles = currentFolderObj ? currentFolderObj.loadFiles : false;
        this.loadFilesForModel = currentFolderObj ? currentFolderObj.loadFilesForModel : '';
        this.isUploadDisabled = currentFolderObj ? currentFolderObj.isUploadDisabled : true;  // flag to enable/disable upload
        this.isDetailDisabled = currentFolderObj ? currentFolderObj.isDetailDisabled : true;  // flag to enable/disable detail;

        if (this.currentLevel === 'six' && this.viewType === 'jobsiteView' && this.folderName) {
            this.uploadModelName = this.folderName;
            this.detailModalName = this.folderName;
        } else if (this.currentLevel === 'six' && this.viewType === 'departmentView' && this.folderName) {
            this.uploadModelName = this.folderName;
            this.detailModalName = this.folderName;
        } else {
            this.uploadModelName = this.loadFilesForModel;
            this.detailModalName = currentFolderObj ? currentFolderObj.model : '';
        }

        // console.log('this.uploadModelName', this.uploadModelName)
        // console.log('this.detailModalName', this.detailModalName)

        this.columns = [
            { name: 'Name', prop: 'Name', minWidth: 400, width: 400, sortable: true, resizeable: true, visible: true },
            { name: 'Document Category', prop: 'category', minWidth: 200, width: 200, sortable: true, resizeable: true, visible: true },
            { name: 'Document Title', prop: 'subCategory', minWidth: 200, width: 200, sortable: true, resizeable: true, visible: true },
            { name: 'Modified', prop: 'createdAt', minWidth: 150, width: 150, sortable: true, resizeable: false, visible: true },
            { name: 'Size', prop: 'size', minWidth: 100, width: 100, sortable: true, resizeable: false, visible: true },
            { name: 'Members', prop: 'members', minWidth: 100, width: 100, resizeable: false, visible: true },
            { name: '', prop: '', minWidth: 50, width: 50, resizeable: false, visible: true }
        ];

        this.allColumns = this.columns.slice(); // Used for Columns Toggling

        this.initSearch()  // initiate search with autocomplte
        this.getFileBrowserdata(); // loads data 

    }

    /**
     * toolbar configuration
     */
    ngAfterViewInit() {
        /** Toobar Options*/
        this.toolbarOptions.push(
            {
                title: 'Upload',
                type: 'button',
                class: 'btn-sm btn-primary',
                icon: 'fa-plus',
                callback: 'open',
                customArgs: [this.uploadContent, 'lg'],
                isDisabled: this.isUploadDisabled,
                sortKey: 0,
            },
            {
                title: 'Edit Columns',
                type: 'button',
                class: 'btn-sm btn-primary editColumn',
                icon: 'fa-th',
                sortKey: 1
            },
            {
                title: 'Refresh',
                type: 'button',
                class: 'btn-sm btn-primary',
                icon: 'fa-refresh',
                callback: 'refreshView',
                sortKey: 2
            }
        );
        this.toolbarConfig.setToolbar(this.toolbarOptions);
        // this.toolbarConfig.add({
        //   title: 'New Toolbar',
        //   type: 'button',
        //   class: 'btn-sm btn-warning',
        //   icon: 'fa-refresh',
        //   callback: 'refreshView',
        //   sortKey: 3
        // });

        // this.toolbarConfig.remove([{ sortKey: 5}, { sortKey: 6 }]);
        // this.toolbarConfig.updateAttribute('0', 'isDisabled', true);
        // this.toolbarConfig.updateAttribute('1', 'isDisabled', true);
        // this.toolbarConfig.updateAttribute('2', 'isDisabled', true);
    }

    /**
    *
    * @param arg
    */
    activateEvent(arg) {
        const callbackArgs = this.toolbarConfig.bindEvent(this.toolbarOptions, arg);
        if (callbackArgs && callbackArgs.length > 0) {
            this[callbackArgs[0]].apply(this, (callbackArgs[1]) ? callbackArgs[1] : null);
        }

    }

    documentUploaded(event: any) {
        event.forEach(e => {
            const newFileData = {
                id: e.id,
                Name: e.fileMeta.name,
                size: e.fileMeta.size,
                createdAt: e.createdAt,
                type: e.fileMeta.type,
                fileMeta: e.fileMeta,
                category: e.category && e.category.title ? e.category.title : '',
                subCategory: e.subCategory && e.subCategory.title ? e.subCategory.title : ''
            };
            if (this.currentLevel === 'six') {
                this.tableData.unshift(newFileData);
            } else {
                this.tableData.push(newFileData);
            }
        });
        this.tableData = [...this.tableData];
        this.itemsPerPage = this.tableData.length;
    }

    // Get File Browser Data filtered by name
    initSearch() {
        this.term.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .do(() => this._preloaderService.showPreloader())
            .switchMap(term =>
                this._documentApi
                    .getDataForFolderView({
                        level: this.currentLevel,
                        viewType: this.selectedViewType.value,
                        modelName: this.modelName,
                        fn: this.folderName,
                        sfdcId: this.sfdcId,
                        loadFiles: this.isLoadFiles,
                        loadFilesForModel: this.loadFilesForModel,
                        recordType: this.selectedAccountType,
                        term: term,
                        skip: this.offset,
                        limit: this.itemsPerBatch
                    })
            ).subscribe(x => {
                if (this.currentLevel !== 'one') {
                    this.tableData = x.dataList;
                    this.itemsPerPage = this.tableData.length; // to disable the pagination in ngx-datatable
                } else {
                    if (!this.isLoadMore) {
                        this.tableData = x.dataList;
                    } else {
                        x.dataList.forEach(c => {
                            this.tableData.push(c);
                        });
                        this.tableData = [...this.tableData];
                    }
                }
                this._preloaderService.hidePreloader()
            },
            err => this._preloaderService.hidePreloader(),
        )
    }

    loadMoreRecords() {
        this.isLoadMore = true;
        this.offset = this.tableData.length;
        this.getFileBrowserdata();
    }

    // Get Account Types
    getAccountTypes() {
        this._accountTypeService.getAccountTypes().subscribe(
            results => {
                this.accountTypes = results;
            },
            err => {
                this.accountTypes = [];
            }
        );
    }

    // Account Type change trigger
    onAccountTypeChnage(e) {
        this.isLoadMore = false;
        this.offset = 0;
        this.table.offset = 0;
        this.getFileBrowserdata();
    }

    // View Type change trigger
    onViewTypeChnage() {
        if (this.userAccessType === 'internal') {
            this._router.navigate(['app', 'file-manager', 'browser',
                this.selectedViewType.value, this.selectedViewType.folderHiearchy[0].model]);
        } else {
            const accountId = this._appState.getSelectedAccount();
            if (accountId) {
                this._router.navigate(['app', 'file-manager', 'browser',
                    this.selectedViewType.value, this.selectedViewType.folderHiearchy[1].model, accountId]);
            } else {
                this._router.navigate(['app', 'file-manager']);
            }

        }

    }

    getIdForModel() {
        const id = this.sfdcId;
        // console.log(this.breadCrumbs)
        // console.log(id)
        const dbObj = this.breadCrumbs.filter(function (d) {
            if (d.sfdcId === id) {
                return d;
            }
        });
        // console.log(dbObj)
        let result = '';
        // check to handle 2 sfdcIds after static folder selection
        if (dbObj.length > 1) {
            result = dbObj[1] ? dbObj[1].id : '';
        } else {
            result = dbObj[0] ? dbObj[0].id : '';
        }
        // const result = dbObj[0] ? dbObj[0].id : '';
        return result;
    }

    getFileBrowserdata() {
        this._preloaderService.showPreloader()
        this._documentApi
            .getDataForFolderView({
                level: this.currentLevel,
                viewType: this.selectedViewType.value,
                modelName: this.modelName,
                fn: this.folderName,
                sfdcId: this.sfdcId,
                loadFiles: this.isLoadFiles,
                recordType: this.selectedAccountType,
                loadFilesForModel: this.loadFilesForModel,
                skip: this.offset,
                limit: this.itemsPerBatch
            })
            .subscribe(
                result => {
                    this.noRecords = (result.dataList.length < this.itemsPerBatch) ? true : false;
                    if (this.currentLevel !== 'one') {
                        this.tableData = result.dataList;
                        this.itemsPerPage = this.tableData.length; // to disable the pagination in ngx-datatable
                    } else {
                        if (!this.isLoadMore) {
                            this.tableData = result.dataList;
                        } else {
                            result.dataList.forEach(c => {
                                this.tableData.push(c);
                            });
                            this.tableData = [...this.tableData];
                        }
                    }

                    this.breadCrumbs = result.breadCrumbs;
                    const dbId = this.getIdForModel();
                    if (dbId) {
                        this.uploadModelId = dbId;
                        // console.log('this.uploadModelId>>>', this.uploadModelId)
                        //  this.isUploadDisabled = false;
                    } else {
                        // console.log('Model Id issues>>>')
                        this.isUploadDisabled = true;
                    }
                    this._preloaderService.hidePreloader()
                },
                err => {
                    this.toolbarConfig.updateAttributes(
                        [
                            { 'sortKey': 0, 'name': 'isDisabled', 'value': true },
                            { 'sortKey': 1, 'name': 'isDisabled', 'value': true },
                            { 'sortKey': 2, 'name': 'isDisabled', 'value': true }
                        ]
                    );
                    this.tableData = [{
                        'message': err.message,
                    }];
                    this.tableData[0][this.columns[0]['prop']] = err.message;
                    this._preloaderService.hidePreloader()
                }
            );
    }

    toggle(col) {
        col.visible = !col.visible;
    }

    changeView(e) {
        if (e.target.checked) {
            this._router.navigate(['app', 'file-manager']);
        }
    }

    refreshView() {
        this.term.setValue('');
        this.isLoadMore = false;
        this.table.offset = 0;
        this.offset = 0;
        this.getFileBrowserdata();
    }

    onBreadCrumbClick(obj) {
        let url = '/app/file-manager/browser/' + this.viewType;
        if (obj !== 'home') {
            url = url + obj.Url;
        } else {

            if (this.userAccessType !== 'internal') {
                const accountId = this._appState.getSelectedAccount();
                if (accountId) {
                    url = url + '/' + this.selectedViewType.folderHiearchy[1].model + '/' + accountId
                } else {
                    url = '/'
                }
            } else {
                url = url + '/' + this.selectedViewType.folderHiearchy[0].model
            }
        }
        // console.log('url', url)
        this._router.navigateByUrl(url);
    }

    getPrevElement() {
        let prevModel = ''
        for (let i = 0; i < this.selectedViewType.folderHiearchy.length; i++) {
            if (this.selectedViewType.folderHiearchy[i].model === this.modelName) {
                prevModel = this.selectedViewType.folderHiearchy[i - 1] ? this.selectedViewType.folderHiearchy[i - 1].model : this.modelName
                break;       // <=== breaks out of the loop
            }
        }
        return prevModel;
    }

    getNextElement() {
        let nextModel = ''
        for (let i = 0; i < this.selectedViewType.folderHiearchy.length; i++) {
            if (this.selectedViewType.folderHiearchy[i].model === this.modelName) {
                nextModel = this.selectedViewType.folderHiearchy[i + 1] ? this.selectedViewType.folderHiearchy[i + 1].model : this.modelName
                break;       // <=== breaks out of the loop
            }
        }
        return nextModel;
    }

    onFolderClick(obj) {
        // console.log(this.currentLevel)
        // console.log(this.viewType);
        // console.log(obj);
        let nextRoute = ''

        if (this.currentLevel === 'five' && this.viewType === 'jobsiteView') {
            nextRoute = 'Document'
        } else if (this.currentLevel === 'four' && this.viewType === 'departmentView') {
            nextRoute = this.folderName
        } else if (this.currentLevel === 'five' && this.viewType === 'departmentView') {
            nextRoute = 'Document'
        } else {
            nextRoute = this.getNextElement()
        }

        // console.log(nextRoute);
        // Used to redirect to next level folder view
        let navigationArray = ['app', 'file-manager', 'browser', this.viewType, nextRoute, obj.sfdcId]

        if (this.currentLevel === 'four' && this.viewType === 'jobsiteView') {
            navigationArray = ['app', 'file-manager', 'browser', this.viewType, obj.Value, obj.sfdcId]
            this._router.navigate(navigationArray, {
                queryParams: { fn: obj.Value },
                queryParamsHandling: 'merge'
            });
        } else if (this.currentLevel === 'three' && this.viewType === 'departmentView') {
            navigationArray = ['app', 'file-manager', 'browser', this.viewType, nextRoute, obj.sfdcId]
            this._router.navigate(navigationArray, {
                queryParams: { fn: obj.Value },
                queryParamsHandling: 'merge'
            });
        } else {
            this._router.navigate(navigationArray, { queryParamsHandling: 'merge' });
        }
    }

    getDetails(data, content, size) {
        this.detailModalId = data.id;
        this.isFile = data.type ? true : false;
        this._modalService.open(content, size);
    }

    openShareModal(data, content, size) {
        this.sharedModalData = data;
        this.detailModalId = data.id;
        this.isFile = data.type ? true : false;
        this._modalService.open(content, size);
    }

    /// to open modal
    open(content, size) {
        this._modalService.open(content, size);
    }

    download(row) {
        if (row.type) {
            console.log('Download Triggered for File')
            const url = environment.baseUrl + '/' + environment.apiVersion +
                '/Documents/download/' + row.id + '?access_token=' + this.token.id
            this._utilityService.downloadAndOpenPdfFile(url, row.fileMeta.name)
        } else {
            console.log('Download Triggered for Folder')
        }
    }
}
