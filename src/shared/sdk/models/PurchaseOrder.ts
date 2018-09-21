/* tslint:disable */
import {
  Account,
  Job,
  PurchaseOrderItem,
  Jobsite,
  Project,
  Case,
  Order
} from '../index';

declare var Object: any;
export interface PurchaseOrderInterface {
  "WorkOrderNumber"?: string;
  "sfdcId"?: string;
  "CreatedDate"?: Date;
  "CurrencyIsoCode"?: string;
  "End_Date__c"?: Date;
  "EndDate"?: Date;
  "Experience_Level__c"?: string;
  "Grand_Total_Total_From_Line_Items__c"?: number;
  "Job_Service_Type__c"?: string;
  "Jobsite__c"?: string;
  "LastModifiedDate"?: Date;
  "LineItemCount"?: number;
  "List_Price_Total_from_Line_Items__c"?: number;
  "Project_Case_Description__c"?: string;
  "Roll_up_Additional_Rate__c"?: number;
  "Roll_up_Discount__c"?: number;
  "Roll_up_PPE_Hours__c"?: number;
  "Roll_up_Unit_Rate__c"?: number;
  "Roll_up_VAT_Percent__c"?: number;
  "Service_Level_Agreement_SLA_Requirement__c"?: string;
  "Service_Dispatch__c"?: string;
  "Start_Date__c"?: Date;
  "Status"?: string;
  "Vendor__c"?: string;
  "Work_Order_num__c"?: string;
  "GrandTotal"?: number;
  "CaseId"?: string;
  "AccountId"?: string;
  "Sales_Order__c"?: string;
  "Project__c"?: string;
  "id"?: number;
  vendor?: Account;
  job?: Job;
  account?: Account;
  lineItems?: PurchaseOrderItem[];
  jobsite?: Jobsite;
  project?: Project;
  case?: Case;
  order?: Order;
}

export class PurchaseOrder implements PurchaseOrderInterface {
  "WorkOrderNumber": string;
  "sfdcId": string;
  "CreatedDate": Date;
  "CurrencyIsoCode": string;
  "End_Date__c": Date;
  "EndDate": Date;
  "Experience_Level__c": string;
  "Grand_Total_Total_From_Line_Items__c": number;
  "Job_Service_Type__c": string;
  "Jobsite__c": string;
  "LastModifiedDate": Date;
  "LineItemCount": number;
  "List_Price_Total_from_Line_Items__c": number;
  "Project_Case_Description__c": string;
  "Roll_up_Additional_Rate__c": number;
  "Roll_up_Discount__c": number;
  "Roll_up_PPE_Hours__c": number;
  "Roll_up_Unit_Rate__c": number;
  "Roll_up_VAT_Percent__c": number;
  "Service_Level_Agreement_SLA_Requirement__c": string;
  "Service_Dispatch__c": string;
  "Start_Date__c": Date;
  "Status": string;
  "Vendor__c": string;
  "Work_Order_num__c": string;
  "GrandTotal": number;
  "CaseId": string;
  "AccountId": string;
  "Sales_Order__c": string;
  "Project__c": string;
  "id": number;
  vendor: Account;
  job: Job;
  account: Account;
  lineItems: PurchaseOrderItem[];
  jobsite: Jobsite;
  project: Project;
  case: Case;
  order: Order;
  constructor(data?: PurchaseOrderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PurchaseOrder`.
   */
  public static getModelName() {
    return "PurchaseOrder";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PurchaseOrder for dynamic purposes.
  **/
  public static factory(data: PurchaseOrderInterface): PurchaseOrder{
    return new PurchaseOrder(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'PurchaseOrder',
      plural: 'PurchaseOrders',
      path: 'PurchaseOrders',
      idName: 'id',
      properties: {
        "WorkOrderNumber": {
          name: 'WorkOrderNumber',
          type: 'string'
        },
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
          type: 'string'
        },
        "End_Date__c": {
          name: 'End_Date__c',
          type: 'Date'
        },
        "EndDate": {
          name: 'EndDate',
          type: 'Date'
        },
        "Experience_Level__c": {
          name: 'Experience_Level__c',
          type: 'string'
        },
        "Grand_Total_Total_From_Line_Items__c": {
          name: 'Grand_Total_Total_From_Line_Items__c',
          type: 'number'
        },
        "Job_Service_Type__c": {
          name: 'Job_Service_Type__c',
          type: 'string'
        },
        "Jobsite__c": {
          name: 'Jobsite__c',
          type: 'string'
        },
        "LastModifiedDate": {
          name: 'LastModifiedDate',
          type: 'Date'
        },
        "LineItemCount": {
          name: 'LineItemCount',
          type: 'number'
        },
        "List_Price_Total_from_Line_Items__c": {
          name: 'List_Price_Total_from_Line_Items__c',
          type: 'number'
        },
        "Project_Case_Description__c": {
          name: 'Project_Case_Description__c',
          type: 'string'
        },
        "Roll_up_Additional_Rate__c": {
          name: 'Roll_up_Additional_Rate__c',
          type: 'number'
        },
        "Roll_up_Discount__c": {
          name: 'Roll_up_Discount__c',
          type: 'number'
        },
        "Roll_up_PPE_Hours__c": {
          name: 'Roll_up_PPE_Hours__c',
          type: 'number'
        },
        "Roll_up_Unit_Rate__c": {
          name: 'Roll_up_Unit_Rate__c',
          type: 'number'
        },
        "Roll_up_VAT_Percent__c": {
          name: 'Roll_up_VAT_Percent__c',
          type: 'number'
        },
        "Service_Level_Agreement_SLA_Requirement__c": {
          name: 'Service_Level_Agreement_SLA_Requirement__c',
          type: 'string'
        },
        "Service_Dispatch__c": {
          name: 'Service_Dispatch__c',
          type: 'string'
        },
        "Start_Date__c": {
          name: 'Start_Date__c',
          type: 'Date'
        },
        "Status": {
          name: 'Status',
          type: 'string'
        },
        "Vendor__c": {
          name: 'Vendor__c',
          type: 'string'
        },
        "Work_Order_num__c": {
          name: 'Work_Order_num__c',
          type: 'string'
        },
        "GrandTotal": {
          name: 'GrandTotal',
          type: 'number'
        },
        "CaseId": {
          name: 'CaseId',
          type: 'string'
        },
        "AccountId": {
          name: 'AccountId',
          type: 'string'
        },
        "Sales_Order__c": {
          name: 'Sales_Order__c',
          type: 'string'
        },
        "Project__c": {
          name: 'Project__c',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        vendor: {
          name: 'vendor',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Vendor__c',
          keyTo: 'sfdcId'
        },
        job: {
          name: 'job',
          type: 'Job',
          model: 'Job',
          relationType: 'belongsTo',
                  keyFrom: 'Service_Dispatch__c',
          keyTo: 'sfdcId'
        },
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'AccountId',
          keyTo: 'sfdcId'
        },
        lineItems: {
          name: 'lineItems',
          type: 'PurchaseOrderItem[]',
          model: 'PurchaseOrderItem',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'WorkOrder'
        },
        jobsite: {
          name: 'jobsite',
          type: 'Jobsite',
          model: 'Jobsite',
          relationType: 'belongsTo',
                  keyFrom: 'Jobsite__c',
          keyTo: 'sfdcId'
        },
        project: {
          name: 'project',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Project__c',
          keyTo: 'sfdcId'
        },
        case: {
          name: 'case',
          type: 'Case',
          model: 'Case',
          relationType: 'belongsTo',
                  keyFrom: 'CaseId',
          keyTo: 'sfdcId'
        },
        order: {
          name: 'order',
          type: 'Order',
          model: 'Order',
          relationType: 'belongsTo',
                  keyFrom: 'Sales_Order__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
