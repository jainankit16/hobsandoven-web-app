import { Component, OnInit, Input } from '@angular/core';
import { PreloaderService } from 'shared/services/preloader.service';
import { CaseApi } from '../../../../../../../sdk/services';
import { Subscription } from 'rxjs';
import { SharedService } from 'shared/services/pms/shared.services';

@Component({
  selector: 'partner-info',
  templateUrl: './partner-info.component.html',
  styleUrls: ['./partner-info.component.css']
})
export class PartnerInfoComponent implements OnInit {
  // gettig input from order list table


  private account: any;
  private caseId: any;
  private servicemanager: any;
  private subscription: Subscription;

  constructor(
    private _caseApi: CaseApi,
    private _preloaderService: PreloaderService,
    private _sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.account = {};
    this.subscription = this._sharedService.getUserState().subscribe(current => {
      window.scroll(0, 0);
      this.servicemanager = current['servicemanager'];
      if (this.servicemanager && this.servicemanager.case) {
        this.caseId = this.servicemanager.case.caseId;
      }
    });
    // loading account on load of the component 
    this.loadAccountDetails();
  }

  // load account detail function to get acount details associated with selected case item. 
  loadAccountDetails() {
    this._preloaderService.showPreloader();
    let filter = {
      where: { 'id': this.caseId },
      fields: ['AccountId', 'CaseNumber'],
      include: [{
        relation: 'Account',
        scope: {
          fields: ['Name', 'Default_Pricelist__c', 'Service_Global_Ref__c', 'Webcase_Account_Name__c', 'RecordTypeId',
            'Account_Number__c', 'BillingStreet', 'ShippingStreet', 'BillingCity', 'ShippingCity', 'BillingState', 'ShippingState',
            'BillingCountry', 'ShippingCountry', 'BillingPostalCode', 'ShippingPostalCode', 'Billing_country_Code__c',
            'Shipping_country_Code__c', 'Master_Project__c'],
          include: [{
            relation: 'pricelist',
            scope: {
              fields: ['Name']
            }
          }, {
            relation: 'program',
            scope: {
              fields: ['Name']
            }
          }]
        }
      }]
    }
    this._caseApi.findOne(filter).subscribe(
      result => {
        // get result to call findone from case service 
        if (result['Account']) {
          this.account = result['Account'];
        }
        this._preloaderService.hidePreloader();
      }, error => {
        this._preloaderService.hidePreloader();
      })
  }


}
