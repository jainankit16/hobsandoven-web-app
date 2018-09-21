import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-so-line-details',
  templateUrl: './so-line-details.component.html',
  styleUrls: ['./so-line-details.component.css']
})
export class SoLineDetailsComponent implements OnInit {
  @Input() soLineData: any;
  constructor() { }

  ngOnInit() {
  }

}
