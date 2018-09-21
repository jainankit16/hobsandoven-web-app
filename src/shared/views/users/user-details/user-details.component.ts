import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { UsersApi, CountryCodeApi } from '../../../sdk';

import { AlertService } from '../../../services/alert.service';
import { CommonService } from '../../../services/common.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html'
})

export class UserDetailsComponent implements OnInit {

    userProfileForm: FormGroup;
    countries: any;
    setting: any;
    initailProfileData: any;

    constructor(
        private fb: FormBuilder,
        private usersApi: UsersApi,
        private alertService: AlertService,
        private commonService: CommonService
    ) {
        this.userProfileForm = new FormGroup({
            id: new FormControl(),
            firstname: new FormControl(),
            lastname: new FormControl(),
            email: new FormControl(),
            Phone: new FormControl(),
            Birthdate: new FormControl(),
            MailingCity: new FormControl(),
            MailingState: new FormControl(),
            MailingCountry: new FormControl()
        });
    }

    ngOnInit() {
        // get current user details
        this.usersApi.getCurrent({ include: ['profile'] }).subscribe(
            userProfile => {
                this.setting = userProfile;
                this.commonService.setUserProfile(this.setting);
                if (this.setting.hasOwnProperty('id')) {
                    this.settingForms();
                }
            },
            error => {
                this.alertService.error('Failed to load user details!');
                console.log(error.message);
            }
        );

        // get country list
        this.commonService.getCountries().subscribe(
            countryList => {
                this.countries = countryList;
            },
            error => {
                this.alertService.error('Failed to load countries list!');
                console.log(error.message);
            }
        );
    }

    settingForms() {
        this.userProfileForm = this.fb.group({
            id: [this.setting.id],
            firstname: [this.setting.firstname],
            lastname: [this.setting.lastname],
            email: [this.setting.email],
            Phone: [this.setting.profile ? this.setting.profile.Phone : ''],
            Birthdate: [this.setting.profile ? this.setting.profile.Birthdate : null],
            MailingCity: [this.setting.profile ? this.setting.profile.MailingCity : ''],
            MailingState: [this.setting.profile ? this.setting.profile.MailingState : ''],
            MailingCountry: [this.setting.profile ? this.setting.profile.MailingCountry : '']
        });
        this.userProfileForm.controls.email.disable();
        this.initailProfileData = this.userProfileForm.value;
    }

    updateUserProfile() {
        let isValuechanged = true;
        if (JSON.stringify(this.initailProfileData) === JSON.stringify(this.userProfileForm.value)) {
            isValuechanged = false;
        }
        if (isValuechanged && this.setting.id) {
            // update user details
            this.usersApi.patchAttributes(this.setting.id, {
                firstname: this.userProfileForm.value.firstname,
                lastname: this.userProfileForm.value.lastname
            }).subscribe(
                user => {
                    this.setting.firstname = this.userProfileForm.value.firstname;
                    this.setting.lastname = this.userProfileForm.value.lastname;
                    // update user profile details
                    if (this.setting.hasOwnProperty('profile') && this.setting.profile.hasOwnProperty('UserId')) {
                        this.usersApi.updateProfile(this.setting.profile.UserId, {
                            UserId: this.setting.id,
                            FirstName: this.setting.firstname,
                            LastName: this.setting.lastname,
                            Email: this.setting.email,
                            Birthdate: this.userProfileForm.value.Birthdate,
                            Phone: this.userProfileForm.value.Phone,
                            MailingCity: this.userProfileForm.value.MailingCity,
                            MailingState: this.userProfileForm.value.MailingState,
                            MailingCountry: this.userProfileForm.value.MailingCountry
                        }).subscribe(
                            result => {
                                this.setting.profile.Birthdate = this.userProfileForm.value.Birthdate;
                                this.setting.profile.Phone = this.userProfileForm.value.Phone;
                                this.setting.profile.MailingCity = this.userProfileForm.value.MailingCity;
                                this.setting.profile.MailingState = this.userProfileForm.value.MailingState;
                                this.setting.profile.MailingCountry = this.userProfileForm.value.MailingCountry;
                                // update user's profile in common service
                                this.commonService.setUserProfile(this.setting);
                                this.alertService.success('Profile has been updated successfully.');
                            },
                            err => {
                                this.alertService.error(err.message);
                                console.log(err.message);
                            }
                        );
                    } else {
                        this.usersApi.createProfile(this.setting.id, {
                            UserId: this.setting.id,
                            FirstName: this.setting.firstname,
                            LastName: this.setting.lastname,
                            Email: this.setting.email,
                            Birthdate: this.userProfileForm.value.Birthdate,
                            Phone: this.userProfileForm.value.Phone,
                            MailingCity: this.userProfileForm.value.MailingCity,
                            MailingState: this.userProfileForm.value.MailingState,
                            MailingCountry: this.userProfileForm.value.MailingCountry,
                            AccountId: this.setting.AccountId
                        }).subscribe(
                            result => {
                                this.setting['profile'] = {};
                                this.setting.profile.Birthdate = this.userProfileForm.value.Birthdate;
                                this.setting.profile.Phone = this.userProfileForm.value.Phone;
                                this.setting.profile.MailingCity = this.userProfileForm.value.MailingCity;
                                this.setting.profile.MailingState = this.userProfileForm.value.MailingState;
                                this.setting.profile.MailingCountry = this.userProfileForm.value.MailingCountry;
                                // update user's profile in common service
                                this.commonService.setUserProfile(this.setting);
                                this.alertService.success('Profile has been updated successfully.');
                            },
                            err => {
                                this.alertService.error(err.message);
                                console.log(err.message);
                            }
                        );
                    }
                },
                err => {
                    this.alertService.error(err.message);
                    console.log(err.message);
                }
            );
        } else {
            this.alertService.success('Profile has been updated successfully.');
        }
    }
}
