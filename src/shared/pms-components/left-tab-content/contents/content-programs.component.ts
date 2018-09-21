import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { OrderBy } from '../../../pipe/order/orderby.pipe';

import { PreloaderService } from '../../../services/preloader.service';
import { SharedService } from '../../../services/pms/shared.services';
import { AppStateService } from '../../../services/app-state.service';

import { DashboardApi, AccountApi } from '../../../sdk';

@Component({
    selector: 'content-programs',
    templateUrl: './content-programs.component.html'
})

export class ContentProgramsComponent implements OnInit, OnDestroy {

    @Input() page: string;
    showRadioButtons = false;
    programs = [];
    selectedProgramId = 'All Programs';
    contentData: any;
    subscription: Subscription;
    userState = {};

    constructor(
        private _modalService: NgbModal,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _sharedService: SharedService,
        private _dashboardApi: DashboardApi,
        private _accounntApi: AccountApi
    ) { }

    ngOnInit() {
        if (this.page && this.page.indexOf('service-manager') !== -1) {
            this.showRadioButtons = true;
            this.programs.push({ 'sfdcId': 'All Programs', 'Name': 'All Programs', 'Project__c': 'All Programs' });
            // subscribe user state to read account & load programs
            this.subscription = this._sharedService.getUserState().subscribe(current => {
                this.userState = current;
            });
            this.selectedProgramId = this.userState['servicemanager']['program']['programId'];
            // load programs data
            if (this.userState['servicemanager']['account']['accountId'] !== 'All Accounts') {
                this.loadProjectData(this.userState['servicemanager']['account']['accountId']);
            } else {
                this.loadAllAccounts();
            }
        } else {
            const selectedAccountId = this._appState.getSelectedAccount();
            if (selectedAccountId) {
                this.loadProjectData(selectedAccountId);
            }
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    loadProjectData(accountId) {
        this._preloaderService.showPreloader();
        const paramObj = {
            'accountId': accountId,
            'models': ['Project']
        };
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['programs'] && data['programs']['list']) {
                        this.programs = this.programs.concat(data['programs']['list']);
                        this.programs = new OrderBy().transform(this.programs, ['-CreatedDate']);
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

    loadAllAccounts() {
        this._preloaderService.showPreloader();
        this._accounntApi.getAllPartnerAccount({}).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    const accountIds = [];
                    data.forEach(item => {
                        accountIds.push(item['sfdcId']);
                    });
                    this.loadProjectData(accountIds);
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                console.log('Error fetching data>>', error.message);
                this._preloaderService.hidePreloader();
            }
        );
    }

    selectProgram(program) {
        this.selectedProgramId = program['sfdcId'];
        // set current selected program
        this.userState['servicemanager']['program'] = {
            'programId': program['sfdcId'],
            'programName': program['Name'],
            'ProgramCode': program['Project__c']
        };
        if (!this.userState['servicemanager']['region']) {
            this.userState['servicemanager']['region'] = {
                'regionId': 'All Regions',
                'regionName': 'All Regions'
            };
        }
        if (program['sfdcId'] !== 'All Programs') {
            this.userState['servicemanager']['jobsite'] = {
                'jobsiteId': 'All Jobsites',
                'jobsiteName': 'All Jobsites'
            };
            if (this.page && this.page === 'service-manager-details') {
                this.userState['servicemanager']['isCompleted'] = false;
                delete this.userState['servicemanager']['page'];
            }
        }
        this._sharedService.setUserState(this.userState);
    }

    openDetailPage(content, _size, dataRow) {
        if (dataRow['sfdcId'] !== 'All Programs') {
            this._modalService.open(content, { size: _size });
            this.contentData = dataRow;
        }
    }
}
