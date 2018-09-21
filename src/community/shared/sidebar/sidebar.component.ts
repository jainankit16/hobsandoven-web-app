import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/authentication.service';
import { AppStateService } from '../../../shared/services/app-state.service';


@Component({
    selector: 'app-vms-sidebar',
    templateUrl: './sidebar.component.html'
})

export class VMSSidebarComponent implements OnInit, AfterContentChecked {

    accessType = '';
    adminAccessPermission = false;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private appState: AppStateService
    ) {
    }

    ngOnInit() {
        const routeData = this.route.snapshot.data;
        if (routeData && routeData['currentUser']) {
            this.accessType = routeData['currentUser']['accessType'];
        }
    }
    ngAfterContentChecked() {
        this.adminAccessPermission = this.appState.getAdminAccessPermission();
    }

    logout() {
        this.authService.logout();
    }
}
