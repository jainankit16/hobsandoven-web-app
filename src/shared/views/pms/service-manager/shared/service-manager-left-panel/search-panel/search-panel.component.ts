import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../../../../services/pms/shared.services';
import { PreloaderService } from '../../../../../../services/preloader.service';
import { FilterServiceApi } from '../../../../../../sdk';

@Component({
    selector: 'search-panel',
    templateUrl: './search-panel.component.html',
    styleUrls: ['./search-panel.component.css']
})

export class SearchPanelComponent implements OnInit, OnDestroy {

    caseNumber = '';
    partnerCaseNumber = '';
    countries = [];
    serviceStatuses = [
        { 'sfdcId': 'New', 'Name': 'New' },
        { 'sfdcId': 'In-Progress', 'Name': 'In-Progress' },
        { 'sfdcId': 'Resolved', 'Name': 'Resolved' },
        { 'sfdcId': 'Closed', 'Name': 'Closed' },
    ];
    selectedCountry = '--None--';
    selectedServiceStatus = '--None--';
    selectedFromData = '';
    selectedToDate = '';
    maxDate = new Date();
    minDate: any;

    userState: any;
    private subscription: Subscription;

    constructor(
        private _sharedService: SharedService,
        private _preloaderService: PreloaderService,
        private _filterServiceApi: FilterServiceApi
    ) { }

    ngOnInit() {
        this.subscription = this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
        });
        // load dropdown values
        this.loadDropdownData();
        // set selected filter values
        this.setSelectedValues();
    }

    setSelectedValues() {
        if (this.userState['servicemanager']['caseNumber']) {
            this.caseNumber = this.userState['servicemanager']['caseNumber'];
        }
        if (this.userState['servicemanager']['partnerCaseNumber']) {
            this.partnerCaseNumber = this.userState['servicemanager']['partnerCaseNumber'];
        }
        if (this.userState['servicemanager']['serviceStatus']) {
            this.selectedServiceStatus = this.userState['servicemanager']['serviceStatus'];
        }
        if (this.userState['servicemanager']['countryCode']) {
            this.selectedCountry = this.userState['servicemanager']['countryCode'];
        }
        if (this.userState['servicemanager']['fromDate']) {
            this.selectedFromData = this.userState['servicemanager']['fromDate'];
        }
        if (this.userState['servicemanager']['toDate']) {
            this.selectedToDate = this.userState['servicemanager']['toDate'];
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    loadDropdownData() {
        const paramObj = {
            'models': ['Country']
        };
        // get data for filters
        this._filterServiceApi.getAllFiltersData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    // countries
                    if (data['countries'] && !data['countries']['error']) {
                        this.countries = data['countries']['list'];
                    }
                }
            },
            error => {
                console.log('Error fetching data>>', error.message);
            }
        );
    }

    setUserState() {
        this.userState['servicemanager']['caseNumber'] = this.caseNumber;
        this.userState['servicemanager']['partnerCaseNumber'] = this.partnerCaseNumber;
        this.userState['servicemanager']['serviceStatus'] = this.selectedServiceStatus;
        this.userState['servicemanager']['countryCode'] = this.selectedCountry;
        this.userState['servicemanager']['fromDate'] = this.selectedFromData;
        this.userState['servicemanager']['toDate'] = this.selectedToDate;
        this._sharedService.setUserState(this.userState);
    }

    search() {
        this.setUserState();
    }

    reset() {
        this.caseNumber = '';
        this.partnerCaseNumber = '';
        this.selectedServiceStatus = '--None--';
        this.selectedCountry = '--None--';
        this.selectedFromData = '';
        this.selectedToDate = '';
        this.setUserState();
    }

    onDateChange() {
        this.selectedToDate = '';
        this.minDate = this.selectedFromData;
    }
}
