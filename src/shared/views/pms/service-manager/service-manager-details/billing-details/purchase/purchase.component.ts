import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'shared/services/pms/shared.services';

@Component({
  selector: 'purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit, OnDestroy {

  selectedTab: string;
  userState: any;
  subscription: Subscription;
  constructor(
    private _sharedService: SharedService,
  ) { }
  ngOnInit() {
    this.subscription = this._sharedService.getUserState().subscribe(current => {
      this.userState = current;
    });
    // billing tab route
    if (this.userState['billing'] && this.userState['billing']['subTab']) {
      this.selectedTab = this.userState['billing']['subTab'];
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
