import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'default-profile',
  templateUrl: './default-profile.component.html',
  styleUrls: ['./default-profile.component.css']
})
export class DefaultProfileComponent implements OnInit {
  @Input() project: any;

  constructor() { }

  ngOnInit() {
  }

}
