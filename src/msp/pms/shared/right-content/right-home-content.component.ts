import { SharedService } from '../../../../shared/services/pms/shared.services';
import { Component } from '@angular/core';

@Component({
  selector: 'app-right-content',
  templateUrl: './right-home-content.component.html'
})
export class RightHomeContentComponent {
  userState: any;
  constructor(private _sharedService: SharedService) {
    this._sharedService.getUserState().subscribe(current => {
      this.userState = current;
    });
  }

  openMyCoverageMap() {
    if (this.userState.program && this.userState.program.programSFId) {
      window.open('/pms/coverage-map/' + this.userState.program.programSFId);
    } else {
      window.open('/pms/coverage-map');
    }
  }
}
