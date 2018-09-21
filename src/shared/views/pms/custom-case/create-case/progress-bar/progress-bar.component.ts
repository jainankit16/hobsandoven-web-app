import { Component, Input } from '@angular/core';

@Component({
    selector: 'case-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.css']
})

export class ProgressBarComponent {
    @Input()
    set isFilled(isFilled: any) {
        this.wizardStatus = isFilled;
        if (this.wizardStatus.hasOwnProperty('program')) {
            this.onDataChanges();
        }
    }

    @Input() headTitle: String;
    @Input() isLoadProgressBar: Boolean = true;
    wizardStatus: any;
    active = 1;
    wizardsteps: any[];
    constructor() {
        this.wizardsteps = [
            {
                name: 'Program',
                title: 'Program',
                active: false
            },
            {
                name: 'Contact',
                title: 'Contact',
                active: false
            },
            {
                name: 'Case Details',
                title: 'Case Details',
                active: false
            },
            {
                name: 'Service Item',
                title: 'Service Item',
                active: false
            },
            {
                name: 'Appointment',
                title: 'Appointment',
            },
            {
                name: 'Files',
                title: 'Files',
                active: false
            },
            {
                name: 'Confirm',
                title: 'Confirm',
                active: false
            },
            {
                name: 'Submit',
                title: 'Submit',
                active: false
            }
        ];
    }

    onDataChanges() {
        this.wizardsteps[0].active = this.wizardStatus.program;
        this.wizardsteps[1].active = this.wizardStatus.contact;
        this.wizardsteps[2].active = this.wizardStatus.case;
        this.wizardsteps[3].active = this.wizardStatus.profile;
        this.wizardsteps[4].active = this.wizardStatus.appointment;
        this.wizardsteps[5].active = this.wizardStatus.files;
        this.wizardsteps[6].active = this.wizardStatus.confirm;
        this.wizardsteps[7].active = this.wizardStatus.submit;
    }
}
