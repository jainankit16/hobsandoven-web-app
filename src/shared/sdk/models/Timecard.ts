/* tslint:disable */
import {
  Account,
  Job,
  PurchaseOrder,
  Worker,
  RecordType
} from '../index';

declare var Object: any;
export interface TimecardInterface {
  "sfdcId"?: string;
  "Any_Observation_or_Suggestions_Notes__c"?: string;
  "Customer_Approval_Status__c"?: string;
  "Customer_Site_Signoff_Name__c"?: string;
  "Final_Timecard__c"?: boolean;
  "Incurred_Date__c"?: Date;
  "Name"?: string;
  "Overtime_Hours__c"?: number;
  "Status__c"?: string;
  "Timesheet_Week_Number_ISO_Auto__c"?: string;
  "Total_Worked_Hours__c"?: number;
  "Vendor_Time_Card_Notes_Tasks_Performed__c"?: string;
  "Vendor_Time_Card_Time_Out_Actual__c"?: Date;
  "Vendor_Time_Card_Time_in_Actual__c"?: Date;
  "Weekend_Hours_Worked__c"?: number;
  "Worker__c"?: string;
  "Purchase_Order_Ref__c"?: string;
  "Service_Dispatch__c"?: string;
  "CreatedById"?: string;
  "CreatedDate"?: Date;
  "isDeleted"?: boolean;
  "Vendor__c"?: string;
  "Visit_Number_Calc__c"?: number;
  "Total_Worked_Hours_Without_Offset__c"?: number;
  "RecordTypeId"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  vendor?: Account;
  job?: Job;
  purchaseOrder?: PurchaseOrder;
  worker?: Worker;
  recordType?: RecordType;
}

export class Timecard implements TimecardInterface {
  "sfdcId": string;
  "Any_Observation_or_Suggestions_Notes__c": string;
  "Customer_Approval_Status__c": string;
  "Customer_Site_Signoff_Name__c": string;
  "Final_Timecard__c": boolean;
  "Incurred_Date__c": Date;
  "Name": string;
  "Overtime_Hours__c": number;
  "Status__c": string;
  "Timesheet_Week_Number_ISO_Auto__c": string;
  "Total_Worked_Hours__c": number;
  "Vendor_Time_Card_Notes_Tasks_Performed__c": string;
  "Vendor_Time_Card_Time_Out_Actual__c": Date;
  "Vendor_Time_Card_Time_in_Actual__c": Date;
  "Weekend_Hours_Worked__c": number;
  "Worker__c": string;
  "Purchase_Order_Ref__c": string;
  "Service_Dispatch__c": string;
  "CreatedById": string;
  "CreatedDate": Date;
  "isDeleted": boolean;
  "Vendor__c": string;
  "Visit_Number_Calc__c": number;
  "Total_Worked_Hours_Without_Offset__c": number;
  "RecordTypeId": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  vendor: Account;
  job: Job;
  purchaseOrder: PurchaseOrder;
  worker: Worker;
  recordType: RecordType;
  constructor(data?: TimecardInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Timecard`.
   */
  public static getModelName() {
    return "Timecard";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Timecard for dynamic purposes.
  **/
  public static factory(data: TimecardInterface): Timecard{
    return new Timecard(data);
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
      name: 'Timecard',
      plural: 'Timecards',
      path: 'Timecards',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Any_Observation_or_Suggestions_Notes__c": {
          name: 'Any_Observation_or_Suggestions_Notes__c',
          type: 'string'
        },
        "Customer_Approval_Status__c": {
          name: 'Customer_Approval_Status__c',
          type: 'string'
        },
        "Customer_Site_Signoff_Name__c": {
          name: 'Customer_Site_Signoff_Name__c',
          type: 'string'
        },
        "Final_Timecard__c": {
          name: 'Final_Timecard__c',
          type: 'boolean'
        },
        "Incurred_Date__c": {
          name: 'Incurred_Date__c',
          type: 'Date'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Overtime_Hours__c": {
          name: 'Overtime_Hours__c',
          type: 'number'
        },
        "Status__c": {
          name: 'Status__c',
          type: 'string'
        },
        "Timesheet_Week_Number_ISO_Auto__c": {
          name: 'Timesheet_Week_Number_ISO_Auto__c',
          type: 'string'
        },
        "Total_Worked_Hours__c": {
          name: 'Total_Worked_Hours__c',
          type: 'number'
        },
        "Vendor_Time_Card_Notes_Tasks_Performed__c": {
          name: 'Vendor_Time_Card_Notes_Tasks_Performed__c',
          type: 'string'
        },
        "Vendor_Time_Card_Time_Out_Actual__c": {
          name: 'Vendor_Time_Card_Time_Out_Actual__c',
          type: 'Date'
        },
        "Vendor_Time_Card_Time_in_Actual__c": {
          name: 'Vendor_Time_Card_Time_in_Actual__c',
          type: 'Date'
        },
        "Weekend_Hours_Worked__c": {
          name: 'Weekend_Hours_Worked__c',
          type: 'number'
        },
        "Worker__c": {
          name: 'Worker__c',
          type: 'string'
        },
        "Purchase_Order_Ref__c": {
          name: 'Purchase_Order_Ref__c',
          type: 'string'
        },
        "Service_Dispatch__c": {
          name: 'Service_Dispatch__c',
          type: 'string'
        },
        "CreatedById": {
          name: 'CreatedById',
          type: 'string'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "isDeleted": {
          name: 'isDeleted',
          type: 'boolean'
        },
        "Vendor__c": {
          name: 'Vendor__c',
          type: 'string'
        },
        "Visit_Number_Calc__c": {
          name: 'Visit_Number_Calc__c',
          type: 'number'
        },
        "Total_Worked_Hours_Without_Offset__c": {
          name: 'Total_Worked_Hours_Without_Offset__c',
          type: 'number'
        },
        "RecordTypeId": {
          name: 'RecordTypeId',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
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
        purchaseOrder: {
          name: 'purchaseOrder',
          type: 'PurchaseOrder',
          model: 'PurchaseOrder',
          relationType: 'belongsTo',
                  keyFrom: 'Purchase_Order_Ref__c',
          keyTo: 'sfdcId'
        },
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'belongsTo',
                  keyFrom: 'Worker__c',
          keyTo: 'sfdcId'
        },
        recordType: {
          name: 'recordType',
          type: 'RecordType',
          model: 'RecordType',
          relationType: 'belongsTo',
                  keyFrom: 'RecordTypeId',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
