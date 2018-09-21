import { Component, OnInit } from '@angular/core';
import { WorkOrderApi } from '../../../sdk/services/custom/WorkOrder';

@Component({
  selector: "workorder-list-modal",
  templateUrl: "./workorder-list-modal.component.html",
  styleUrls: ["./workorder-list-modal.component.css"]
})
export class WorkorderListModalComponent implements OnInit {
  WorkOrders: any[];
  workOrderFilter: any;
  search: any;
  filter: any = {
    programFilter: String,
    workOrderFilter: String,
    workOrdersStartDate: String,
    workOrdersEndDate: String
  };
  constructor(private _WorkOrderApi: WorkOrderApi) {}

  ngOnInit() {
  
    this.filterReset();
  }
  // For calling Project API complete.

  loadWorkOrder() {
    this._WorkOrderApi
      .find({
        where: this.search,
       include: [{
         relation: 'program',
         scope: {
           Project__c: true,
           sfdcId: true,
           Name: true,
           Account__c: true
         }
        },
        {
         relation: 'JobsiteProject',
         scope: {
           Project_SOP__c: true,
           sfdcId: true,
           Name: true,
           Account__c: true
         }
        }]
        ,
        //order: "Name ASC"
      })
      .subscribe(data => {
        this.WorkOrders = data
        this.workOrderFilter = data
      });
  }


  filterData(filterData) {
    this.search ={};
    if (this.filter.programFilter != 'NONE') {
      this.search = Object.assign(this.search,
         { 'Project_SOP__c': filterData.programFilter})
      }
    if (this.filter.workOrderFilter != 'NONE') {
       this.search = Object.assign(this.search,
         { 'sfdcId': filterData.workOrderFilter})
    }
    if (this.filter.workOrdersStartDate != '' && this.filter.workOrdersEndDate != '') {
       this.search = Object.assign(this.search,
         { and: [{ 'CreatedDate': { gte: this.filter.workOrdersStartDate } }, { 'CreatedDate': { lte: this.filter.workOrdersEndDate } }]});
        // }
    }
     this.loadWorkOrder()
  }

  filterReset() {
    this.filter.programFilter = 'NONE',
      this.filter.workOrderFilter = 'NONE',
      this.filter.workOrdersStartDate = ''
      this.filter.workOrdersEndDate = ''
    this.loadWorkOrder();
  }

}
