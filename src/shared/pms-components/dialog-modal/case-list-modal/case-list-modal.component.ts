import { Component, OnInit } from '@angular/core';

import { AppStateService } from '../../../services/app-state.service';

import { CaseApi, AccountApi } from '../../../sdk';

@Component({
    selector: 'case-list-modal',
    templateUrl: './case-list-modal.component.html',
    styleUrls: ['./case-list-modal.component.css']
})

export class CaseListModalComponent implements OnInit {

    selectedAccountId: string;
   cases: any[];
   accounts: any[];
   CaseFilter: any[];
   filter: any = {
        programFilter: String,
        caseFilter: String,
        caseDate: String,
        jobsite: String
    };

    constructor(
        private _appState: AppStateService,
        private _CaseApi: CaseApi,
        private _AccountApi: AccountApi,
    ) {
        this.filterReset();
    }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
    }

    loadAccountList(cases) {
        this._AccountApi
            .find({
                where: {},
            })
            .subscribe(data => {
                cases.map(item => {
                    if (item.hasOwnProperty('program')) {
                        item.Account = data.filter((account: any) => {
                            if (account.sfdcId === item.program.Account__c) {
                                return account
                            }
                        }
                        )[0];
                    } else {
                        item.Account = {
                            Name: null
                        }
                        item.program = {
                            Name: null
                        }
                    }
                    if (!item.hasOwnProperty('Jobsite')) {
                        item.Jobsite = {
                            Name: null
                        }
                    }
                });
                this.cases = cases;
                this.CaseFilter = cases;
            });
    }


    // For calling case API complete.

    loadCase() {
        this._CaseApi
            .find({
                where: {
                    Name: { neq: '' },
                    Account__c: this.selectedAccountId
                },
                include: [
                    {
                        relation: 'program',
                        scope: {
                            fields: {
                                Name: true,
                                Jobsite_ID__c: true,
                                Account__c: true,
                                sfdcId: true
                            }
                        }
                    },
                    {
                        relation: 'Jobsite',
                        scope: {
                            fields: {
                                Name: true,
                                Project__c: true,
                                sfdcId: true
                            }
                        }
                    }
                ]
            })
            .subscribe(data => {
                // this.cases = data
                this.loadAccountList(data);
            });
    }

    dateConvertor(inputDate: string): string {
        const dateObj = new Date(inputDate);
        let year = dateObj.getFullYear()
        let mon = dateObj.getMonth().toString();
        mon = (mon.length === 1) ? '0' + mon : mon;
        let date = dateObj.getUTCDate();
        let dateFormat = [year, mon, date].join('-');
        return dateFormat;
    }

    filterCaseData(filterData) {
        let newCases = this.cases;
        if (this.filter.programFilter !== 'NONE') {
            newCases = newCases.filter(function (item) {
                return item.program.sfdcId === filterData.programFilter;
            });
        }
        if (this.filter.caseFilter !== 'NONE') {
            newCases = newCases.filter(function (item) {
                return item.Partner_Case_Number__c === filterData.caseFilter;
            });
        }
        if (this.filter.caseDate !== '') {
            newCases = newCases.filter(function (item) {
                item.createdAt = this.dateConvertor(item.createdAt);
                return item.createdAt === filterData.caseDate
            }.bind(this));
        }
        if (this.filter.jobsite !== 'NONE') {
            newCases = newCases.filter(function (item) {
                return item.Jobsite.sfdcId === filterData.jobsite;
            });
        }
        this.CaseFilter = newCases;
        console.log(this.CaseFilter);
    }
    filterReset() {
        this.filter.programFilter = 'NONE',
            this.filter.caseFilter = 'NONE',
            this.filter.caseDate = '',
            this.filter.jobsite = 'NONE'
        this.loadCase();
    }
}
