import { Component, OnInit } from '@angular/core';

import { UsersApi, LoopBackConfig } from '../../../sdk';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html'
})

export class UserProfileComponent implements OnInit {
    pageTitle: any;

    constructor() {
        this.pageTitle = 'Profile Settings';
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
    }

    ngOnInit() {
    }
}
