import { Component, Input } from '@angular/core';

@Component({
  selector: 'top-wizard-panel',
  templateUrl: './top-wizard-panel.component.html',
  styleUrls: ['./top-wizard-panel.component.css']
})
export class TopWizardPanelComponent {
  @Input() headTitle: String;
  @Input() isLoadProgressBar: Boolean = false;
  active = 1;
  wizardsteps: any[];

  constructor() {
    this.wizardsteps = [
      { name: 'All Orders', title: 'All Orders' },
      {
        name: 'Work Orders',
        title: 'Jobsite Work Orders',
      },
      {
        name: 'Cases',
        title: 'Jobsite Case',
      },
      {
        name: 'Invited',
        title: 'Jobsite Invited',
      },
      {
        name: 'Declined',
        title: 'Jobsite Declined',
      },
      {
        name: 'Accepted',
        title: 'Jobsite Accepted',
      },
      {
        name: 'Assigned',
        title: 'Jobsite Assigned',
      },
      {
        name: 'Started',
        title: 'Jobsite Started',
      },
      {
        name: 'Pending Approval',
        title: 'Jobsite Pending Approval',
      },
      {
        name: 'Invoiced',
        title: 'Jobsite Invoiced',
      },
      {
        name: 'Paid',
        title: 'Jobsite Paid',
      },
      {
        name: 'Closed',
        title: 'Jobsite Closed',
      },
      {
        name: 'Cancelled',
        title: 'Jobsite Cancelled',
      }
    ];
  }
}
