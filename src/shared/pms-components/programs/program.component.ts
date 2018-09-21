import { Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedService } from '../../services/pms/shared.services';
import { QuoteService } from '../../services/pms/quote.service';
import { PreloaderService } from '../../services/preloader.service';
import { AppStateService } from '../../services/app-state.service';

import { ProjectApi } from '../../sdk/services/custom/Project';

@Component({
    selector: 'select-program',
    templateUrl: './program.component.html'
})

export class ProgramComponent implements OnInit, OnDestroy {

    @Input('page') page: string;
    @Input('stop') stop: string;
    @Output() selectedProject: EventEmitter<string> = new EventEmitter<string>();

    private contentData: any;
    programs: any[];
    userState: any;
    errorMessage: any;
    programSFId: any;
    private subscription: Subscription;

    constructor(
        private _location: Location,
        private _modalService: NgbModal,
        public _sharedservice: SharedService,
        private _quoteService: QuoteService,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _projectApi: ProjectApi
    ) { }

    ngOnInit() {
        // on component initialization
        const selectedAccountId = this._appState.getSelectedAccount();
        let isComponentInitialised = false;
        if (selectedAccountId) {
            this.loadProjectData(selectedAccountId);
        }
        // on account selection change
        this.subscription = this._sharedservice.getUserState().subscribe(current => {
            this.userState = current;
            if (isComponentInitialised && this.userState.partner && this.userState.partner.sfdcId && !this.userState.program.programSFId) {
                this._appState.setSelectedAccount(this.userState.partner.sfdcId);
                this.loadProjectData(this.userState.partner.sfdcId);
            }
        });
        isComponentInitialised = true;
    }

    loadProjectData(accountId) {
        this.programs = [];
        if (accountId && accountId !== '') {
            this._preloaderService.showPreloader();
            // Request object passed as parameter with required fields for this api
            const req = {
                'accountId': accountId,
                'order': 'CreatedDate DESC',
                'fields': ['sfdcId', 'Name', 'CreatedDate', 'Project__c', 'Status__c', 'Description__c',
                    'Jobsite_Contact_Selection__c', 'Service_Description__c', 'SOW_Description_Customer_Long__c',
                    'Special_Service_Instructions__c', 'Required_Tools__c', 'SoW_Equipment_Tracking_Vendor__c',
                    'Lastmodifieddate', 'updatedAt', 'Account__c', 'Partner_Pricelist__c', 'Project_Standard__c',
                    'Service_Technical_Level__c', 'Service_Dispatch_SLA_Priority__c', 'Talent_Type__c', 'Customer_Service_Type__c']
            }
            this._projectApi.getMasterProjects(req).subscribe(
                data => {
                    this.programs = data.programs;
                    if (this.userState && this.userState.program && this.userState.program.programSFId) {
                        this.programSFId = this.userState.program.programSFId;
                        this._quoteService.quoteManagerDataList(this.programSFId, true, this.userState);
                    } else {
                        this.programSFId = '';
                    }
                    this.errorMessage = this.programs.length ? '' : 'No data to display';
                    this._preloaderService.hidePreloader();
                },
                error => {
                    this.errorMessage = error.message;
                    this._preloaderService.hidePreloader();
                }
            );
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // on change of program selection
    selectProgramID(program) {
        // set selected program
        this.userState.program = { 'isExisting': true };
        this.userState.program.programSFId = program.sfdcId;
        this.userState.program.programReferCode = program.Project__c;
        this.userState.program.programName = program.Name;
        // emit selected program
        this.selectedProject.emit(program);
        let closeLoader = true;
        if (this._location.path().indexOf('program') !== -1) {
            closeLoader = false;
        }
        // Not to load in case of Jobsite setup
        if (!this.stop) {
            this._quoteService.quoteManagerDataList(program.sfdcId, closeLoader, this.userState);
        } else {
            this._sharedservice.setUserState(this.userState);
        }
    }

    openDetailPage(content, _size, dataRow) {
        this._modalService.open(content, { size: _size });
        this.contentData = dataRow;
    }
}


