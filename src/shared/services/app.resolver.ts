import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Location } from '@angular/common';
import { AppStateService } from './app-state.service';

import { LoopBackAuth } from './../sdk/services/core/auth.service';
import { UsersApi } from './../sdk/services/custom/Users';

@Injectable()
export class AppResolver implements Resolve<any> {

    constructor(
        private _auth: LoopBackAuth,
        private _appState: AppStateService,
        private _usersApi: UsersApi,
        private _location: Location
    ) { }

    resolve() {
        const user = this._auth.getCurrentUserData();
        // set account id
        if (!this._appState.getSelectedAccount()) {
            // Need to remove the hardcoded MagicLink Account Id once we do not have any dependency on the same
            if (user['accessType'] === 'internal' && this._location.path().indexOf('pms') !== -1) {
                this._appState.setSelectedAccount('0011a00000bGvDbAAK');
            } else {
                this._appState.setSelectedAccount(user['AccountId']);
            }
        }
        // set access type
        if (!this._appState.getAccessType()) {
            this._appState.setAccessType(user['accessType']);
        }
        // set home url
        if (!this._appState.getHomeUrl()) {
            this._appState.setHomeUrl(user['redirectUrl']);
        }
        // set adminAccessPermission
        if (this._appState.getAdminAccessPermission() === undefined) {
            this._usersApi.adminAccessPermission().subscribe(
                res => {
                    let adminAccessPermission = false;
                    if (res) {
                        adminAccessPermission = true;
                    }
                    this._appState.setAdminAccessPermission(adminAccessPermission);
                },
                err => {
                    console.log(err);
                }
            );
        }
        return user;
    }
}
