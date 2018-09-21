import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { Subscription } from 'rxjs/Rx';

import { AlertService } from '../../../services/alert.service';
import { ModalService } from '../../../services/modal.service';
import { MapService } from '../../../services/map.service';
import { CommonService } from '../../../services/common.service';

import { UsersApi, AccountApi, DepartmentApi } from '../../../sdk';
import { environment } from '../../../../environments/environment';

interface FormData {
    concurrency: number;
    autoUpload: boolean;
    verbose: boolean;
}

@Component({
    selector: 'app-user-leftpanel',
    templateUrl: './user-left-panel.component.html',
    styleUrls: ['./user-left-panel.component.css'],
    providers: [MapService, ModalService]
})

export class UserLeftPanelComponent implements OnInit, OnDestroy {

    marker: any;
    user: any;
    accountInfo: any;
    deptInfo: any;
    imgpath: any;
    subscription: Subscription;

    constructor(
        private mapService: MapService,
        private usersApi: UsersApi,
        private _accountApi: AccountApi,
        private _deptApi: DepartmentApi,
        private _modalService: ModalService,
        private alertService: AlertService,
        private commonService: CommonService
    ) {
        /*initializing ngui-goolge direction map*/
        this.marker = this.mapService.marker;
        this.imgpath = environment.baseUrl + '/' + environment.apiVersion;
    }

    ngOnInit() {
        let onLoad = true;
        this.subscription = this.commonService.getUserProfile().subscribe(userProfile => {
            this.user = userProfile;
            if (this.user && this.user.id) {
                if (this.user.AccountId && onLoad) {
                    this.getAccountInfo(this.user.AccountId);
                }
                if (this.user.profile && this.user.profile.Department && onLoad) {
                    this.getDepartmentInfo(this.user.profile.Department);
                }
                onLoad = false;
            }
        });
    }

    getAccountInfo(accountId) {
        const reqObj = {
            fields: ['Name', 'Service_Global_Ref__c'],
            where: { 'sfdcId': accountId }
        };
        this._accountApi.find(reqObj).subscribe(
            result => {
                if (result && result.length) {
                    this.accountInfo = result[0];
                }
            },
            error => {
                console.log(error.message);
            }
        );
    }

    getDepartmentInfo(deptId) {
        const reqObj = {
            fields: ['Name'],
            where: { 'sfdcId': deptId }
        };
        this._deptApi.find(reqObj).subscribe(
            result => {
                if (result && result.length) {
                    this.deptInfo = result[0];
                }
            },
            error => {
                console.log(error.message);
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // to show map direction ngui-goolge map
    clicked(event) {
        this.mapService.clicked(event);
    }

    open(content, size) {
        this._modalService.open(content, size);
    }

    // to show uploaded image in left panel and heder bar
    pictureUploaded(event) {
        this.user.picture = event.picture;
        this.user.profileImage = event.profileImage;
        this.commonService.setUserProfile(this.user);
    }

    // remove profile picture
    removePicture(container, fileName) {
        if (fileName && confirm('Are you sure, you want to delete your profile picture ?')) {
            this.commonService.removeFile(container, this.user.picture).subscribe(success => {
                this.user.picture = '';
                this.commonService.removeFile(container, this.user.profileImage).subscribe(succes => {
                    this.user.profileImage = '';
                    this.removeUploadedImage(container);
                }, error => {
                    this.alertService.error(error.message);
                    console.log(error.message);
                });
            }, error => {
                this.alertService.error(error.message);
                console.log(error.message);
            });
        }
    }

    removeUploadedImage(container) {
        this.usersApi.patchAttributes(container, {
            picture: this.user.picture,
            profileImage: this.user.profileImage
        }).subscribe(result => {
            this.commonService.setUserProfile(this.user);
            this.alertService.success('Profile picture has been removed succefully.');
        });
    }
}
