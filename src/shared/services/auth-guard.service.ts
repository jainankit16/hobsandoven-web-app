import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd, ActivatedRoute } from '@angular/router';

import { UsersApi } from '../sdk/services/custom/Users';
import { AppStateService } from './app-state.service';
import { CommonService } from './common.service';
import { SocketService } from '../services/socket.service';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _appState: AppStateService,
        private _usersApi: UsersApi,
        private _socketService: SocketService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        console.log('AuthGuard#canActivate called');
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url: string): boolean {
        if (this._usersApi.isAuthenticated()) {
            this.setDataTitle();
            return true;
        }
        this._router.navigateByUrl('/login');
        return false;
    }

    setDataTitle() {
        this._router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this._activatedRoute)
            .map((route) => {
                while (route.firstChild) {
                    route = route.firstChild;
                } return route;
            }).take(1).subscribe((event) => {
                const permissions = (event.data['value']['permissions']) ? event.data['value']['permissions'] : null;
                if (permissions && !permissions.includes(this._appState.getAccessType())) {
                    this._router.navigate(['/pages-error-403']); // when navigated url not allowed
                } else {
                    this.adminAccessPermission(event.data['value']);
                    this._socketService.connectSocket();
                    this._socketService.setCountNotification((event.data['value']['title']) ? event.data['value']['title'] : 'ServiceO');
                }
            });
    }

    adminAccessPermission(adminPermission) {
        if (adminPermission['adminAccessPermission']) {
            this._usersApi.adminAccessPermission().subscribe(res => {
                if (!res) {
                    this._router.navigate(['/pages-error-403']);
                }
            }, err => {
                console.log(err);
            });
        }
    }
}

/*Check user active or not. If user active than redirect to user dashboard.*/
@Injectable()
export class ActiveUserAuthGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _appState: AppStateService,
        private _commonService: CommonService,
        private _usersApi: UsersApi
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkUserExist(url);
    }

    checkUserExist(url: string): boolean {
        if (url.indexOf('reset') === -1 && this._usersApi.isAuthenticated()) {
            const token = this._usersApi.getCurrentToken();
            this._appState.setAuthState(true);
            this._commonService.setUserProfile(token.user);
            this._appState.setAccessType(token.user.accessType);
            this._appState.setHomeUrl(token.user.redirectUrl);
            this._router.navigate([token.user.redirectUrl]);
            return false;
        }
        return true;
    }
}
