import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../../../services/pms/shared.services';

@Component({
  templateUrl: './programs-list.component.html'
})

export class ProgramsListComponent implements OnInit, OnDestroy {

  userState: any;

  constructor(
    public _sharedservice: SharedService
  ) { }

  ngOnInit() {
    this._sharedservice.getUserState().subscribe(current => {
      this.userState = current;
    });
  }

  ngOnDestroy() {
    if (this.userState.program) {
      this.userState.program = {}
    }
    this._sharedservice.setUserState(this.userState);
  }

}
