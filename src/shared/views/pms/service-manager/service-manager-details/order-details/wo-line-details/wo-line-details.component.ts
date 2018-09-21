import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wo-line-details',
  templateUrl: './wo-line-details.component.html',
  styleUrls: ['./wo-line-details.component.css']
})
export class WoLineDetailsComponent implements OnInit {
 @Input() woLineData: any;
  constructor() { }

  ngOnInit() {

  }

}
