import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreloaderService } from '../../../../../services/preloader.service';
import { MapService } from '../../../../../services/map.service';
import { JobApi } from '../../../../../sdk';

@Component({
    selector: 'job-detail-sidebar',
    templateUrl: './job-detail-sidebar.component.html',
    styleUrls: ['./job-detail-sidebar.component.css'],
    providers: [MapService]
})

export class JobDetailSidebarComponent implements OnInit {
    @Input() jobId: string;
    private routeSubscription: any;
    job: any;
    direction: any;

    constructor(
        private route: ActivatedRoute,
        private _preloaderService: PreloaderService,
        private _jobApi: JobApi,
        private mapService: MapService,
    ) {
        /** Initializing ngui-goolge direction map **/
        this.mapService.direction.subscribe(data => {
            this.direction = data;
        });
    }

    ngOnInit() {
        if (this.jobId) {
            this.loadData(this.jobId);
        }
    }

    loadData(jobId) {
        this._preloaderService.showPreloader();
        const reqObj = {
            'where': { 'sfdcId': jobId },
            'fields': ['statusTracker', 'Job_Status_Internal__c', 'Technical_Level__c', 'Dispatch_Worker_Phone__c',
                'Jobsite_Contact_Technical_Escalation__c', 'Jobsite_Contact_SDesk_Name_phone_email__c', 'Case__c', 'ICC_Case__c',
                'Special_Instruction_from_PMS_Case_Auto__c', 'Vendorsite__c', 'Jobsite__c', 'Appointment__c', 'Dispatch_Worker_Name__c'],
            'include': [
                {
                    'relation': 'appointment',
                    'scope': {
                        'fields': ['sfdcId', 'Customer_Appointment_Setup_Required__c',
                            'Customer_Appointment_DateTime_Scheduled__c', 'Customer_Appointment_Start_Scheduled__c'
                        ]
                    }
                },
                {
                    'relation': 'worker',
                    'scope': {
                        'fields': ['sfdcId', 'Name']
                    }
                },
                {
                    'relation': 'jobsite',
                    'scope': {
                        'fields': ['sfdcId', 'Name', 'geolocation__Latitude__s', 'geolocation__Longitude__s', 'City__c',
                            'Country__c', 'Street__c', 'Zip__c']
                    }
                },
                {
                    'relation': 'vendorsite',
                    'scope': {
                        'fields': ['sfdcId', 'Name', 'geolocation__c', 'geolocation__Longitude__s', 'Street__c', 'State__c',
                            'Zip_Postal_Code__c', 'City__c', 'Zip_Postal_Code__c', 'Country__c']
                    }
                }
            ]
        };

        function comma(prop) {
            return prop ? ', ' + prop : '';
        }

        this._jobApi.getJobDetailsById(reqObj).subscribe(
            result => {
                if (result && Object.keys(result).length > 0) {
                    this.job = result;
                    let statusTracker = (this.job.statusTracker === null) ? {} : JSON.parse(this.job.statusTracker);
                    this.job.statusTracker = Object.keys(statusTracker).map(key => statusTracker[key]);
                    if (result.jobsite) {
                        this.job.destination = result.jobsite.Street__c + comma(result.jobsite.City__c) + comma(result.jobsite.State__c) +
                            comma(result.jobsite.Zip_Postal_Code__c) + comma(result.jobsite.Country__c);
                    }
                    if (result.vendorsite) {
                        this.job.origin = result.vendorsite.Street__c + comma(result.vendorsite.City__c) +
                            comma(result.vendorsite.State__c) + comma(result.vendorsite.Zip_Postal_Code__c) +
                            comma(result.vendorsite.Country__c);
                    }
                    if (this.job.origin && this.job.destination) {
                        this.mapService.setLocation(this.job.origin, this.job.destination)
                    }
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                this._preloaderService.hidePreloader();
                console.log(error);
            }
        );
    }

    // to show map direction ngui-goolge map
    directionsChanged() {
        this.mapService.directionsChanged();
    }

    showDirection(event) {
        this.mapService.showDirection(event);
    }
}
