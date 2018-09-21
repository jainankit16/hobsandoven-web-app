import { Component, ElementRef, AfterContentInit } from '@angular/core';
import { APP_VERSION, BUILD_DATE } from '../version';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterContentInit {

  webTitle = 'ServiceO';
  buildDate = BUILD_DATE;
  appVersion = APP_VERSION;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngAfterContentInit() {
    // Load the script
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../../assets/js/custom.js';
    this.elementRef.nativeElement.appendChild(s);
  }

}
