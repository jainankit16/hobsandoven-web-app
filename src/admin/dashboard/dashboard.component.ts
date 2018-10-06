import { Component } from '@angular/core';
import { APP_VERSION, BUILD_DATE } from '../version';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  webTitle = 'Hobs&Oven.com';
  buildDate = BUILD_DATE;
  appVersion = APP_VERSION;

  constructor() { }

}
