import { ValueList } from '../../../shared/models/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'service-zone',
  templateUrl: './service-zone.component.html'
})
export class ServiceZoneComponent implements OnInit {
  @Input() serviceZones: any[];
  @Output() changeZone: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  toggleZone(e, zoneObj) {
    console.log(zoneObj);
    this.changeZone.emit(zoneObj);
  }
}
