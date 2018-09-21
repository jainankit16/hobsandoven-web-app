import { Subscription } from 'rxjs/Rx';
import { CommonService } from './../../../services/common.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersApi, TimezoneApi } from 'shared/sdk';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit, OnDestroy {
  timeZones: {}[];
  preferences: any;
  token: any;
  subs: Subscription
  constructor(
    private _timeZone: TimezoneApi,
    private usersApi: UsersApi,
    private _commonService: CommonService,
  ) {
    this.subs = this._commonService.getUserProfile().subscribe(result => {
      this.token = result;
    }, err => {
      console.log(err);
    });
    this.preferences = new preferenceModel();
    (this.token) ? (this.preferences.timezone = this.token.timezone) : null;
  }

  ngOnInit() {
    this._timeZone.find().subscribe(result => {
      if (result) {
        this.timeZones = result;
      }
    },
      err => {
        console.log(err.message);
      })

  }
  ngOnDestroy() {
    this.subs ? this.subs.unsubscribe() : '';
  }

  updateUserProfile() {

    this.usersApi.patchAttributes(this.token.id, this.preferences).subscribe(result => {
      this.token.timezone = result.timezone;
      this._commonService.setUserProfile(this.token);
    },
      err => {
        console.log(err)
      })
  }

}

export class preferenceModel {
  timezone: string;
}