import { BehaviorSubject } from 'rxjs';

export class AppStateService {

    private isAuthenticated = new BehaviorSubject<boolean>(false);
    private navAsVendor = new BehaviorSubject<boolean>(null);
    private navAsPartner = new BehaviorSubject<object>(null);
    private appState = new BehaviorSubject<object>(null);

    private selectedAccount = '';
    private accessType = '';
    private homeUrl = '';
    private adminAccessPermission = undefined;

    /* getter/setter for the adminAccessPermission */
    setAdminAccessPermission(adminAccessPermission: boolean) {
        this.adminAccessPermission = adminAccessPermission;
    }
    getAdminAccessPermission() {
        return this.adminAccessPermission;
    }

    /* getter/setter for the selected accountId */
    setSelectedAccount(accountId: string) {
        this.selectedAccount = accountId;
    }
    getSelectedAccount() {
        return this.selectedAccount;
    }

    /* getter/setter for the user access type */
    setAccessType(accessType: string) {
        this.accessType = accessType;
    }
    getAccessType() {
        return this.accessType;
    }

    /* getter/setter to redirect to user's landing page url */
    setHomeUrl(homeUrl: string) {
        this.homeUrl = homeUrl;
    }
    getHomeUrl() {
        return this.homeUrl;
    }

    setAuthState(isLoggedIn: boolean) {
        this.isAuthenticated.next(isLoggedIn);
    }
    getAuthState() {
        return this.isAuthenticated.asObservable();
    }

    setNavAsVendor(account: any) {
        this.navAsVendor.next(account);
    }
    getNavAsVendor() {
        return this.navAsVendor;
    }

    setNavAsPartner(account: any) {
        this.navAsPartner.next(account);
    }
    getNavAsPartner() {
        return this.navAsPartner;
    }

    setAppState(appState: any) {
        this.appState.next(appState);
    }
    getAppState() {
        return this.appState;
    }
}
