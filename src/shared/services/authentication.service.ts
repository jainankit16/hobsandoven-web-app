import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppStateService } from './app-state.service';
import { LoopBackAuth } from '../sdk/services/core/auth.service';
import { AlertService } from './alert.service';

import { UsersApi } from '../sdk/services/custom/Users';
import { Title } from '@angular/platform-browser';
import { SocketService } from './socket.service';

@Injectable()
export class AuthService {

    redirectUrl: string;

    constructor(
        private usersApi: UsersApi,
        private router: Router,
        private auth: LoopBackAuth,
        private appState: AppStateService,
        private alertService: AlertService,
        private _titleService: Title,
        private _socketService: SocketService
    ) { }

    logout() {
        this.usersApi.destroyToken({
            'tokenId': this.auth.getAccessTokenId()
        }).subscribe(
            res => {
                this.destroySession();
            }, err => {
                console.log(err);
                this.alertService.error(err.message);
                this.destroySession();
            }
        );
    }

    destroySession() {
        this._socketService.disconnectSocket();
        this._titleService.setTitle('ServiceO');
        this.usersApi.logout();
        this.auth.clear();
        this.appState.setAuthState(false);
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}
