import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../services/pms/shared.services';

@Component({
  selector: 'left-tab-content',
  templateUrl: './left-tab-content.component.html'
})
export class LeftTabContentComponent implements OnInit, AfterViewInit {
  @Output() scrollWidth: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('calulateWidth') elementView: ElementRef;
  accountInfo: {};
  isActive = 'Account';

  constructor(
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this._sharedService.getUserState().subscribe(current => {
        this.accountInfo = {};
        if (current.partner !== undefined) {
          this.accountInfo['login'] = current.partner.login;
          this.accountInfo['id'] = current.partner.id;
      }
    });
  }

  ngAfterViewInit() {
      this.scrollWidth.emit(this.elementView.nativeElement.offsetWidth);
}

  selectJobLocation(currentActive: string) {
    this.isActive = currentActive;
}
}
