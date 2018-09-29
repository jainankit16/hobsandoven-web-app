import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header-navigation',
    templateUrl: './header-navigation.component.html',
    styleUrls: ['./header-navigation.component.css']
})

export class HeaderNavigationComponent implements OnInit {

    webTitle: 'Hobs&Oven';
    // user: any;
    // imgpath: any;

    constructor() { }

    ngOnInit() {
        // this.imgpath = environment.baseUrl + '/' + environment.apiVersion;
        // this.user = this._auth.getCurrentUserData();
        // if (this.user && this.user['id']) {
        //     this.getProfileImage();
        // }
    }

    // getProfileImage() {
    //     if (this.user['profileImage']) {
    //         this.setProfileImage(this.user);
    //     } else {
    //         this.user.profileImage = '';
    //         this.commonService.setUserProfile(this.user);
    //     }
    // }

    // setProfileImage(user) {
    //     this.commonService.fileExist(user.id, user.profileImage).subscribe(
    //         profileImgData => {
    //             if (profileImgData) {
    //                 this.user.profileImage = user.profileImage;
    //             }
    //         },
    //         error => {
    //             this.user.profileImage = '';
    //             this.commonService.setUserProfile(this.user);
    //         }
    //     );
    // }

    // logout() {
    //     this.authSerice.logout();
    // }
}
