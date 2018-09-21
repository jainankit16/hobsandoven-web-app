import { SharedService } from '../../../../../shared/services/pms/shared.services';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'program-jobsite-summary',
  templateUrl: './program-jobsite-summary.component.html'
})
export class ProgramJobsiteSummaryComponent implements OnInit {
  @Input() selectedJobsite: any;
  userState: any;
  constructor( private _sharedservice: SharedService) {
    this._sharedservice.getUserState().subscribe(current => {
      this.userState = current;
    });
  }

  ngOnInit() {
  }

}
