import { Component, AfterContentChecked } from '@angular/core';
import { AppStateService } from 'shared/services/app-state.service';

@Component({
  selector: 'pms-menu',
  templateUrl: './pms-menu.component.html',
  styleUrls: ['./pms-menu.component.css']
})
export class PmsMenuComponent implements AfterContentChecked {
  adminAccessPermission: boolean;
  constructor(private _appState: AppStateService) { }

  ngAfterContentChecked() {
    this.adminAccessPermission = this._appState.getAdminAccessPermission();
  }
}
