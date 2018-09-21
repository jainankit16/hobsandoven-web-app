import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ProjectApi } from '../../../../shared/sdk/services/custom/Project';
import { PreloaderService } from '../../../../shared/services/preloader.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  @Input() modelId: any;
  @Input() embeddedView = false;
  errorMessage: string;
  project: any;
  title: any;

  constructor(
    private _projectApi: ProjectApi,
    private _preloaderService: PreloaderService
  ) {
  }

  ngOnInit() {
    this.getProjectDetails(this.modelId);
  }

  getProjectDetails(projectId) {
    this._preloaderService.showPreloader();
    this._projectApi
      .findOne({
        fields: {
          sfdcId: true,
          Project__c: true,
          Project_Standard__c: true,
          Name: true,
          APVP_Group_Number__c: true,
          APVP_Record_Count__c: true,
          Account__c: true,
          Customer_Service_Type__c: true,
          Deadline__c: true,
          Description__c: true,
          Duration__c: true,
          Field_Service_Program_Type__c: true,
          Jobsite_Contact_Email_Service_Desk__c: true,
          Jobsite_Contact_Email_Technical_Esc__c: true,
          Jobsite_Contact_Name_Service_Desk__c: true,
          Jobsite_Contact_Name_Technical_Esc__c: true,
          Jobsite_Contact_Phone_Service_Desk__c: true,
          Jobsite_Contact_Phone_Technical_Esc__c: true,
          Jobsite_Contact_Selection__c: true,
          Kick_off__c: true,
          Partner_Name_Text__c: true,
          Partner_Pricelist__c: true,
          Program_Activation__c: true,
          Progress__c: true,
          RecordTypeId: true,
          Resource_Pool_Type_Used_for_backfill__c: true,
          Service_Dispatch_SLA_Priority__c: true,
          Service_Technical_Level__c: true,
          SoW_Equipment_Tracking_Vendor__c: true,
          Vendor_Pricelist__c: true,
          Vendor_Type__c: true,
          Status__c: true
        },
        where: {
          sfdcId: projectId
        },
        include: [{
          relation: 'Partner',
          scope: {
            fields: ['sfdcId', 'Name'],
          }
        }, {
          relation: 'RecordType',
          scope: {
            fields: ['sfdcId', 'Name'],
          }
        }, {
          relation: 'PartnerPricelist',
          scope: {
            fields: ['Name'],
          }

        }, {
          relation: 'VendorPricelist',
          scope: {
            fields: ['Name'],
          }
        }]
      })
      .subscribe(
        result => {
          this.project = result;
          this.title = this.project.Name;
          this._preloaderService.hidePreloader();
        },
        error => {
          this.errorMessage = error.message;
          this._preloaderService.hidePreloader();
        }
      );
  }
  ngOnDestroy() { }
}
