import { Component, Input } from '@angular/core';

@Component({
  selector: 'appointment-schedule-summary',
  templateUrl: './appointment-schedule-summary.component.html'
})
export class AppointmentScheduleSummaryComponent {
  @Input() appointment: any
  constructor() { }

 

}
