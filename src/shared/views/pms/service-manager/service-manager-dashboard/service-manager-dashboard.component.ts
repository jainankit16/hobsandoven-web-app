import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { PreloaderService } from '../../../../services/preloader.service';
import { AppStateService } from '../../../../services/app-state.service';
import { SharedService } from '../../../../services/pms/shared.services';

import { CaseApi } from '../../../../sdk';

@Component({
    selector: 'service-manager-dashboard',
    templateUrl: './service-manager-dashboard.component.html',
    styleUrls: ['./service-manager-dashboard.component.css'],
    providers: [DatePipe]
})

export class ServiceManagerDashboardComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    chartData = { yearly: [], country: [], caseType: [] };
    view = [700, 400];
    userState = {};
    isInternalUser = false;
    filterQuery = {};
    errorMessage = { yearly: '', country: '', caseType: '' }
    orderBy = 'createdAt';
    downloadError = '';

    constructor(
        public _datepipe: DatePipe,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _sharedService: SharedService,
        private _caseApi: CaseApi
    ) { }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }
        this.subscription = this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
            if (this.userState['servicemanager'] && Object.keys(this.userState['servicemanager']).length) {
                this.getFilterCondition();
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getFilterCondition() {
        this.filterQuery = {};
        let fromdate;
        let todate;
        if (this.userState['servicemanager']['fromDate']) {
            fromdate = this.transform(this.userState['servicemanager']['fromDate']) + ' 00:00:00';
        }
        if (this.userState['servicemanager']['toDate']) {
            todate = this.transform(this.userState['servicemanager']['toDate']) + ' 23:59:59';
        }

        if (this.userState['servicemanager']['account']['accountId']) {
            this.filterQuery['AccountId'] = this.userState['servicemanager']['account']['accountId'];
        }
        // for programs
        if (this.userState['servicemanager']['program']['programId'] &&
            this.userState['servicemanager']['program']['programId'] !== 'All Programs') {
            this.filterQuery['Project_SOP__c'] = this.userState['servicemanager']['program']['programId'];
        }
        // for Jobsites
        if (this.userState['servicemanager']['jobsite']['jobsiteId'] &&
            this.userState['servicemanager']['jobsite']['jobsiteId'] !== 'All Jobsites') {
            this.filterQuery['Jobsite__c'] = this.userState['servicemanager']['jobsite']['jobsiteId']
        }
        // for caseNumber
        if (this.userState['servicemanager']['caseNumber']) {
            this.filterQuery['CaseNumber'] = this.userState['servicemanager']['caseNumber'];
        }
        // for Partner case number
        if (this.userState['servicemanager']['partnerCaseNumber']) {
            this.filterQuery['Partner_Case_Number__c'] = this.userState['servicemanager']['partnerCaseNumber']
        }
        // for Partner case number
        if (this.userState['servicemanager']['serviceStatus'] &&
            this.userState['servicemanager']['serviceStatus'] !== '--None--') {
            this.filterQuery['Dispatch_Service_Resolution_Status__c'] = this.userState['servicemanager']['serviceStatus']
        }

        // for Regions
        if (this.userState['servicemanager']['region']['regionId'] &&
            this.userState['servicemanager']['region']['regionId'] !== 'All Regions') {
            this.filterQuery['region'] = this.userState['servicemanager']['region']['regionId'];
        }
        // for Country
        if (this.userState['servicemanager']['countryCode'] &&
            this.userState['servicemanager']['countryCode'] !== '--None--') {
            this.filterQuery['countryCode'] = this.userState['servicemanager']['countryCode'];
        }

        // for date
        if (!(fromdate && todate)) {
            this.filterQuery['createdAt'] = this.currentYeardate();
        } else if (fromdate && todate) {
            this.filterQuery['createdAt'] = { between: [fromdate, todate] }
        } else if (fromdate) {
            this.filterQuery['createdAt'] = { gte: fromdate };
        } else if (todate) {
            this.filterQuery['createdAt'] = { lte: todate };
        }

        this.getChartData();
    }

    getChartData() {
        this._preloaderService.showPreloader();
        this.chartData = { yearly: [], country: [], caseType: [] };
        const findQuery = {
            'where': this.filterQuery,
            'source': this.isInternalUser,
            'order': this.orderBy
        }
        this._caseApi.getServiceManagerChartData(findQuery).subscribe(
            data => {
                if (data) {
                    if (data['produceYearlyData'] && data['produceYearlyData'].length) {
                        this.chartData['yearly'] = data['produceYearlyData'];
                    }
                    if (data['produceCountryData'] && data['produceCountryData'].length) {
                        this.chartData['country'] = data['produceCountryData'];
                    }
                    if (data['produceCaseTypeData'] && data['produceCaseTypeData'].length) {
                        this.chartData['caseType'] = data['produceCaseTypeData'];
                    }
                }
                this.chartErrorMessage()
                this._preloaderService.hidePreloader();
            }, err => {
                this.errorMessage = err;
                this._preloaderService.hidePreloader();
            })
    }

    chartErrorMessage() {
        this.errorMessage = { yearly: '', country: '', caseType: '' }
        if (!this.chartData.yearly.length) {
            this.errorMessage.yearly = 'No data for cases';
        }
        if (!this.chartData.country.length) {
            this.errorMessage.country = 'No data for Cases by Jobsite Country';
        }
        if (!this.chartData.caseType.length) {
            this.errorMessage.caseType = 'No data for Cases by Type';
        }
    }

    transform(value: string) {
        const datePipe = new DatePipe('en-US');
        value = datePipe.transform(value, 'shortDate');
        return value;
    }

    currentYeardate() {
        let fromDate = this.transform(new Date(new Date().getFullYear(), 0, 1).toString());
        let toDate = this.transform(new Date(new Date().getFullYear(), 11, 31).toString());
        fromDate = fromDate + ' 00:00:00';
        toDate = toDate + ' 23:59:59';
        return { between: [fromDate, toDate] };
    }

    downloadFile() {
        this.downloadError = '';
        const req = {};
        const where = this.prepareQueryForDownload();
        if (Object.keys(where).length) {
            req['where'] = where;
        }
        this._preloaderService.showPreloader();
        this._caseApi.downloadServiceManagerCaseData(req).subscribe(
            data => {
                if (data && data.length) {
                    data = this.prepareDownloadData(data);
                    this._sharedService.exportData(data, 'PMSDashboard');
                } else {
                    this.downloadError = 'No data to download!';
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                this.downloadError = error.message;
                this._preloaderService.hidePreloader();
            }
        );
    }

    prepareQueryForDownload() {
        const where = {};
        // account
        if (
            this.userState['servicemanager']['account'] &&
            this.userState['servicemanager']['account']['accountId']
        ) {
            where['AccountId'] = this.userState['servicemanager']['account']['accountId'];
        }
        // program
        if (
            this.userState['servicemanager']['program'] &&
            this.userState['servicemanager']['program']['programId'] &&
            this.userState['servicemanager']['program']['programId'] !== 'All Programs'
        ) {
            where['Project_SOP__c'] = this.userState['servicemanager']['program']['programId'];
        }
        // jobsite
        if (
            this.userState['servicemanager']['jobsite'] &&
            this.userState['servicemanager']['jobsite']['jobsiteId'] &&
            this.userState['servicemanager']['jobsite']['jobsiteId'] !== 'All Jobsites'
        ) {
            where['Jobsite__c'] = this.userState['servicemanager']['jobsite']['jobsiteId'];
        }
        // caseNumber
        if (this.userState['servicemanager']['caseNumber']) {
            where['CaseNumber'] = this.userState['servicemanager']['caseNumber'];
        }
        // partnerCaseNumber
        if (this.userState['servicemanager']['partnerCaseNumber']) {
            where['Partner_Case_Number__c'] = this.userState['servicemanager']['partnerCaseNumber'];
        }
        // serviceStatus
        if (this.userState['servicemanager']['serviceStatus'] && this.userState['servicemanager']['serviceStatus'] !== '--None--') {
            where['Dispatch_Service_Resolution_Status__c'] = this.userState['servicemanager']['serviceStatus'];
        }
        // fromDate
        let fromDate = null;
        if (this.userState['servicemanager']['fromDate']) {
            fromDate = this.transform(this.userState['servicemanager']['fromDate']) + ' 00:00:00';
        }
        // toDate
        let toDate = null;
        if (this.userState['servicemanager']['toDate']) {
            toDate = this.transform(this.userState['servicemanager']['toDate']) + ' 00:00:00';
        }
        // fromDate & toDate
        if (fromDate && toDate) {
            where['createdAt'] = { 'between': [fromDate, toDate] };
        } else if (fromDate) {
            where['createdAt'] = { gte: fromDate };
        } else if (toDate) {
            where['createdAt'] = { lte: toDate };
        }
        // region
        if (
            this.userState['servicemanager']['region'] &&
            this.userState['servicemanager']['region']['regionId'] &&
            this.userState['servicemanager']['region']['regionId'] !== 'All Regions'
        ) {
            where['region'] = this.userState['servicemanager']['region']['regionId'];
        }
        // country
        if (this.userState['servicemanager']['countryCode'] && this.userState['servicemanager']['countryCode'] !== '--None--') {
            where['countryCode'] = this.userState['servicemanager']['countryCode'];
        }
        return where;
    }

    prepareDownloadData(data) {
        const preparedData = [];
        data.forEach(item => {
            preparedData.push({
                'Case Number': item['CaseNumber'] ?
                    item['CaseNumber'] : '',
                'IRON PMS Case Number': item['Iron_Case_Number__c'] ?
                    item['Iron_Case_Number__c'] : '',
                'Iron PMS Case Status': item['Status'] ?
                    item['Status'] : '',
                'Dispatch Service Resolution Status - FSE': item['Dispatch_Service_Resolution_Status__c'] ?
                    item['Dispatch_Service_Resolution_Status__c'] : '',
                'Partner Case Number': item['Partner_Case_Number__c'] ?
                    item['Partner_Case_Number__c'] : '',
                'Jobsite Name': item['Jobsite'] ?
                    item['Jobsite']['Name'] : '',
                'Asset Name': item['asset'] ?
                    item['asset']['Name'] : '',
                'IRON Case Created Date (Partner)': item['createdAt'] ?
                    this._datepipe.transform(item['createdAt'], 'MM-dd-yyyy') : '',
                'JobSite/Ship to Street': item['Ship_to_Company_Name__c'] ?
                    item['Ship_to_Company_Name__c'] : '',
                'JobSite/Ship Contact (Name)': item['Ship_to_Contact_Name__c'] ?
                    item['Ship_to_Contact_Name__c'] : '',
                'JobSite/Ship Contact (Phone Number)': item['Ship_to_Contact_Phone_Number__c'] ?
                    item['Ship_to_Contact_Phone_Number__c'] : '',
                'JobSite/Ship Contact (Email Address)': item['Ship_To_Contact_Email_Address__c'] ?
                    item['Ship_To_Contact_Email_Address__c'] : '',
                'IRON Help Desk - Cust Phone # Recd': item['B1A_IRON_Help_Desk_Cust_Phone_Recd__c'] ?
                    item['B1A_IRON_Help_Desk_Cust_Phone_Recd__c'] : '',
                'IRON Help Desk - Cust Email Recd': item['B2A_IRON_Help_Desk_Cust_Email_Recd__c'] ?
                    item['B2A_IRON_Help_Desk_Cust_Email_Recd__c'] : '',
                'IRON Help Desk - Contact Mode': item['B2_IRON_Help_Desk_Contact_Mode__c'] ?
                    item['B2_IRON_Help_Desk_Contact_Mode__c'] : '',
                'IRON Help Desk - Customer Contacted': item['B3_IRON_Help_Desk_Customer_Contacted__c'] ?
                    item['B3_IRON_Help_Desk_Customer_Contacted__c'] : '',
                'Appointment Schedule Status (Customer)': item['Appointment_Schedule_Status_Customer__c'] ?
                    item['Appointment_Schedule_Status_Customer__c'] : '',
                'Phone Scheduling-1st Attempt-Unreachable': item['Phone_Scheduling_1st_Attempt_Unreachable__c'] ?
                    item['Phone_Scheduling_1st_Attempt_Unreachable__c'] : '',
                'Phone Scheduling-2nd Attempt-Unreachable': item['Phone_Scheduling_2nd_Attempt_Unreachable__c'] ?
                    item['Phone_Scheduling_2nd_Attempt_Unreachable__c'] : '',
                'Phone Scheduling-3rd Attempt-Unreachable': item['Phone_Scheduling_3rd_Attempt_Unreachable__c'] ?
                    item['Phone_Scheduling_3rd_Attempt_Unreachable__c'] : '',
                'Field Service Schedule ETA Date': item['Field_Service_Schedule_ETA_Date_Time__c'] ?
                    item['Field_Service_Schedule_ETA_Date_Time__c'] : '',
                'Field Service Schedule ETA Date/Time': item['Field_Service_Schedule_ETA_Date_Time__c'] ?
                    item['Field_Service_Schedule_ETA_Date_Time__c'] : '',
                'Dispatch Worker Name': item['worker'] ?
                    item['worker']['Name'] : '',
                'Dispatch Worker Phone': item['Dispatch_Worker_Phone__c'] ?
                    item['Dispatch_Worker_Phone__c'] : '',
                'PMS Case Summary': item['Case_Summary__c'] ?
                    item['Case_Summary__c'] : '',
                'IRON PMS Case Comments (from IRON)': '',
                'IRON PMS Case Comments (from Partner)': ''
            })
        });
        return preparedData;
    }

}

