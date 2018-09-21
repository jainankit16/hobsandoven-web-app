import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { distinctUntilChanged, debounceTime, switchMap, tap } from 'rxjs/operators'
import { Subject } from 'rxjs';
import { UsersApi, DocumentShareApi } from '../../../../sdk';
import { AlertService } from '../../../../services/alert.service';
import { PlatformLocation, Location } from '@angular/common';

@Component({
    selector: 'share-file-modal',
    templateUrl: 'share-file-modal.component.html'
})
export class ShareFileModalComponent implements OnInit {
    @Input() modelName: string;
    @Input() modelId: string;
    @Input() rowData: any;

    baseURL: string;

    users = [];
    usersLoading = false;
    usersTypeahead = new Subject<string>();
    selectedUsers = [];

    groups = [];
    groupsLoading = false;
    groupsTypeahead = new Subject<string>();
    selectedGroups = [];

    teams = [];
    teamsLoading = false;
    teamsTypeahead = new Subject<string>();
    selectedTeams = [];

    constructor(
        private _documentShareApi: DocumentShareApi,
        private _usersApi: UsersApi,
        private _alertService: AlertService,
        private _modalService: ModalService,
        private _platformLocation: PlatformLocation,
        private _cd: ChangeDetectorRef
    ) {
        this.baseURL = (_platformLocation as any).location.origin;
    }

    ngOnInit() {
        this.initializeUsers();
        this.initializeGroups();
        this.initializeTeams();
    }

    // ngAfterViewChecked() {
    //     // this.detectChanges();
    // }

    // detectChanges() {
    //     if (!this._cd['destroyed']) {
    //         this._cd.detectChanges();
    //     }
    // }

    initializeGroups() {
        this.groups = [
            { name: 'Sales Department- General' },
            { name: 'Billing Department' }
        ]
    }

    initializeTeams() {
        this.teams = [
            { name: 'Sales Team' },
            { name: 'Billing Team' }
        ]
    }

    initializeUsers() {
        this.users = []
        this.usersTypeahead
            .pipe(tap(() => this.usersLoading = true),
                distinctUntilChanged(),
                debounceTime(200),
                switchMap(term =>
                    (term) ? this._usersApi.find({
                        where: { email: { like: '%' + term + '%', options: 'i' } },
                        fields: ['email', 'id', 'sfdcId', 'firstname', 'lastname', 'accessType']
                    }) :  this.users = []
                )
            )
            .subscribe(
                x => {
                    this._cd.markForCheck();
                    this.users = x;
                    this.usersLoading = false
                },
                err => {
                    console.log(err);
                    this.users = [];
                    this.usersLoading = false
                }
            );
    }

    addTag(usr) {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (usr.match(mailformat)) {
            console.log('external user added', usr)
            return { email: usr, isExternal: true };
        } else {
            console.warn('User could not be added due to invalid email address.')
        }
    }
    onAdd(e) {
        console.log(' add', e)
        e['dateShared'] = new Date();
    }

    share() {
        console.log(' share now', this.selectedUsers);
        const users = this.selectedUsers.filter(usr => !usr.isExternal)
        const externalUsers = this.selectedUsers.filter(usr => usr.isExternal)
        this._documentShareApi
            .share({
                users: users,
                externalUsers: externalUsers,
                groups: this.selectedGroups,
                teams: this.selectedTeams,
                modelName: this.modelName,
                modelId: this.modelId,
                contentType: this.rowData.type ? 'Document' : 'Query',
                src: this.baseURL
            })
            .subscribe(
                result => {

                    if (result.status.data.success) {
                        this._modalService.closed();
                        this._alertService.clear();
                        this._alertService.success(result.status.data.success.message);
                    } else {
                        this._alertService.clear();
                        this._alertService.error(result.status.data.success.message);
                    }
                },
                err => {
                    console.log(err.message)
                }
            );
    }

    clearUser(usr) {
        const result = this.selectedUsers.filter(it => {
            return it.sfdcId !== usr.sfdcId;
        });
        this.selectedUsers = result;
    }

    clearGroup(grp) {
        const result = this.selectedGroups.filter(it => {
            return it.sfdcId !== grp.sfdcId;
        });
        this.selectedGroups = result;
    }

    clearTeam(t) {
        const result = this.selectedTeams.filter(it => {
            return it.sfdcId !== t.sfdcId;
        });
        this.selectedTeams = result;
    }

    // close modal on click
    closeModal() {
        this._modalService.closed();
    }

}