import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../../../shared/services/pms/shared.services';
import { jobLocationMapService } from '../../../../shared/services/pms/job-location.service';
import { QuoteService } from '../../../../shared/services/pms/quote.service';

import { JobInstructionApi } from './../../../../shared/sdk/services/custom/JobInstruction';

@Component({
    selector: 'schedule-setup',
    templateUrl: './schedule-setup.component.html',
    styleUrls: ['./schedule-setup.component.css']
})
export class ScheduleSetupComponent implements OnInit, OnDestroy {

    userState: any;
    ProgramIstrue: Boolean;
    QuoteIstrue: Boolean;
    pricingFilterType = 'Pricing';
    errorMsg = '';
    WorkOrderSummary = '';
    case = {};
    scheduleData = {};
    todaysDate = new Date()
    isCollapsed = false;
    source: string;

    constructor(
        private _sharedService: SharedService,
        private _location: Location,
        private _router: Router,
        private _quoteService: QuoteService
    ) {
        this._sharedService.pushactivewizard(5);
    }

    ngOnInit() {
        this.initializeObj();
        this._quoteService.getWorkOrderDetails().subscribe(data => {
            this.scheduleData = data;
            this.WorkOrderSummary = data['WorkOrderSummary']
        }, error => {
            console.log(error);

        })

        this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
            this.errorMsg = '';
            if (
                this.userState.program &&
                this.userState.program.programReferCode != null
            ) {
                this.ProgramIstrue = true;
            } else {
                this.ProgramIstrue = false;
            }
            if (this.userState.quote && this.userState.quote.quoteNo != null) {
                this.QuoteIstrue = true;
                this.isCollapsed = false;
                this.pricingFilterType = 'Pricing';
            } else {
                this.QuoteIstrue = false;
                this.initializeObj();
                this._sharedService.setFilteredQuoteLineObj([]);
                this._sharedService.setServiceProvider([]);
            }
        });
    }

    setTodaysDate() {
        this.scheduleData['startDate'] = this.todaysDate;
    }

    ngOnDestroy() {
        if (!this.source) {
            this.userState.program = {};
            this.userState.quote = {};
            this._sharedService.setUserState(this.userState);
            this._quoteService.setWorkOrderDetails([]);
            this._sharedService.setFilteredQuoteLineObj([]);
        }
    }

    initializeObj() {
        this.scheduleData = {
            scheduleType: '',
            isPrescheduled: false,
            startDate: '',
            startHour: '--None--',
            startMin: '--None--',
            WorkOrderSummary: '',
            mins: ['--None--', '00', '15', '30', '45'],
            hours: ['--None--', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14',
                '15', '16', '19', '18', '19', '20', '21', '22', '23'],
            partnerCaseNumber: '',
            partnerPONumber: ''
        }
    }

    filterPricing(type: string) {
        this.errorMsg = '';
        if (type === 'Pricing') {
            this.isCollapsed = false;
        } else if (type === 'ServiceProvider') {
            this.isCollapsed = true;
            this.pricingFilterType = 'ServiceProvider';
        }
    }
    getActiveNavBarStatus(choice: string) {
        if (this.pricingFilterType === choice) {
            return true;
        } else {
            return false;
        }
    }

    changeAppointmentScheduleType(event) {
        this.scheduleData['scheduleType'] = event.target.value
        if (
            event.target.value ===
            'Pre-Scheduled Appointment(Enter Date/Time (Local Time Zone) below)'
        ) {
            this.scheduleData['isPrescheduled'] = true;
        } else {
            this.scheduleData['isPrescheduled'] = false;
        }
    }

    saveScheduleStep() {
        this.source = 'next';
        this.errorMsg = ''; // clears the errors
        // console.log(this.appointment)
        const saveProfiles = this._sharedService.getServiceProvider();
        let isComplete = [];
        if (saveProfiles.length > 0) {
            saveProfiles.forEach((item, index) => {
                if (item.hasOwnProperty('provider') && item.jobsite != null && item.serviceZone) {
                    isComplete[index] = 'true';
                } else {
                    isComplete[index] = 'false';
                }
            });
        }
        if (isComplete.indexOf('false') === -1 && isComplete.length > 0) {
            if (this.WorkOrderSummary !== '') {
                if (this.scheduleData['partnerCaseNumber'] && this.scheduleData['partnerPONumber']) {
                    if (this.scheduleData['scheduleType'] !== '') {
                        this.scheduleData['WorkOrderSummary'] = this.WorkOrderSummary
                        this._quoteService.setWorkOrderDetails(this.scheduleData); // sets work order details to be used in next step
                        this._router.navigate(['/pms/configure/confirm']);      // redirects to confirm step
                    } else {
                        this.errorMsg = 'Please select appointment schedule.';
                    }
                } else {
                    this.errorMsg = 'Please fill partner po number and case number.';
                }
            } else {
                this.errorMsg = 'Please fill work order summary';
            }
        } else {
            this.errorMsg = 'Please select Service provider';
        }
    }

    goBack(): void {
        this.source = 'back';
        this._router.navigate(['/pms/configure/instruction'])
    }
}
