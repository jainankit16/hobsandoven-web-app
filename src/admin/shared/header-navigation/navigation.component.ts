import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../shared/services/authentication.service';
import { CommonService } from '../../../shared/services/common.service';
import { LoopBackAuth } from '../../../shared/sdk';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-admin-header',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

    user: any;
    imgpath: any;
    webTitle: 'ServiceO';

    constructor(
        private _auth: LoopBackAuth,
        private commonService: CommonService,
        private authSerice: AuthService
    ) { }

    ngOnInit(): void {
        this.imgpath = environment.baseUrl + '/' + environment.apiVersion;
        this.user = this._auth.getCurrentUserData();

        if (this.user && this.user['id']) {
            this.getProfileImage();
        }
    }

    getProfileImage() {
        if (this.user['profileImage']) {
            this.setProfileImage(this.user);
        } else {
            this.user.profileImage = '';
            this.commonService.setUserProfile(this.user);
        }
    }

    setProfileImage(user) {
        this.commonService.fileExist(user.id, user.profileImage).subscribe(
            profileImgData => {
                if (profileImgData) {
                    this.user.profileImage = user.profileImage;
                }
            },
            error => {
                this.user.profileImage = '';
                this.commonService.setUserProfile(this.user);
            }
        );
    }

    logout() {
        this.authSerice.logout();
    }
}
