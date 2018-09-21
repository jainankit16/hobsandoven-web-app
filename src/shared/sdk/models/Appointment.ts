/* tslint:disable */
import {
  Job,
  Account,
  Case,
  WorkOrder
} from '../index';

declare var Object: any;
export interface AppointmentInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "Customer_Appointment_Setup_Required__c"?: string;
  "Customer_Appointment_DateTime_Scheduled__c"?: Date;
  "Customer_Appointment_Start_Scheduled__c"?: Date;
  "Customer_Appointment_Start_HRS_Scheduled__c"?: string;
  "Customer_Apptmnt_Start_Minutes_Scheduled__c"?: string;
  "ICC_Case__c"?: string;
  "Job__c"?: string;
  "Partner__c"?: string;
  "PMS_Case__c"?: string;
  "Worker_Departure_Date_Time_Actual__c"?: Date;
  "Worker_Arrival_Date_Time_Actual__c"?: Date;
  "Worker_Arrival_DateTime_Cust_Requested__c"?: Date;
  "Worker_Arrival_Date_Customer_Req_End__c"?: Date;
  "Worker_Arrival_DateTime_Scheduled__c"?: Date;
  "Worker_Arrival_Date_Customer_Requested__c"?: Date;
  "Worker_Arrival_Date_Scheduled__c"?: Date;
  "Worker_Arrival_Date_Local_Time_Zone__c"?: Date;
  "Worker_Arrival_Hours_Actual__c"?: string;
  "Worker_Arrival_Hours_Customer_Requested__c"?: string;
  "Worker_End_DateTime_Scheduled__c"?: Date;
  "Worker_Arrival_Minute_Customer_Requested__c"?: string;
  "Worker_Arrival_Minutes_Actual__c"?: string;
  "Worker_Arrival_Time_Hours_Scheduled__c"?: string;
  "Worker_Arrival_Time_Minutes_Scheduled__c"?: string;
  "Worker_End_Date_Scheduled__c"?: Date;
  "Worker_End_Time_Hours_Scheduled__c"?: string;
  "Worker_End_Time_Minutes_Scheduled__c"?: string;
  "Worker_Finish_Date_Time_Actual__c"?: Date;
  "Worker_Finish_Time_Hour_Actual__c"?: string;
  "Worker_Finish_Time_Minutes_Actual__c"?: string;
  "Worker_InProgress_Start_DateTime_Actual__c"?: Date;
  "Worker_In_Progress_Start_Hour_Actual__c"?: string;
  "Worker_In_Progress_Start_Minute_Actual__c"?: string;
  "Work_Order__c"?: string;
  "Job_Order__c"?: string;
  "id"?: number;
  Job?: Job;
  Account?: Account;
  Case?: Case;
  PMSCase?: Case;
  JobOrder?: WorkOrder;
  WorkOrder?: WorkOrder;
}

export class Appointment implements AppointmentInterface {
  "sfdcId": string;
  "Name": string;
  "Customer_Appointment_Setup_Required__c": string;
  "Customer_Appointment_DateTime_Scheduled__c": Date;
  "Customer_Appointment_Start_Scheduled__c": Date;
  "Customer_Appointment_Start_HRS_Scheduled__c": string;
  "Customer_Apptmnt_Start_Minutes_Scheduled__c": string;
  "ICC_Case__c": string;
  "Job__c": string;
  "Partner__c": string;
  "PMS_Case__c": string;
  "Worker_Departure_Date_Time_Actual__c": Date;
  "Worker_Arrival_Date_Time_Actual__c": Date;
  "Worker_Arrival_DateTime_Cust_Requested__c": Date;
  "Worker_Arrival_Date_Customer_Req_End__c": Date;
  "Worker_Arrival_DateTime_Scheduled__c": Date;
  "Worker_Arrival_Date_Customer_Requested__c": Date;
  "Worker_Arrival_Date_Scheduled__c": Date;
  "Worker_Arrival_Date_Local_Time_Zone__c": Date;
  "Worker_Arrival_Hours_Actual__c": string;
  "Worker_Arrival_Hours_Customer_Requested__c": string;
  "Worker_End_DateTime_Scheduled__c": Date;
  "Worker_Arrival_Minute_Customer_Requested__c": string;
  "Worker_Arrival_Minutes_Actual__c": string;
  "Worker_Arrival_Time_Hours_Scheduled__c": string;
  "Worker_Arrival_Time_Minutes_Scheduled__c": string;
  "Worker_End_Date_Scheduled__c": Date;
  "Worker_End_Time_Hours_Scheduled__c": string;
  "Worker_End_Time_Minutes_Scheduled__c": string;
  "Worker_Finish_Date_Time_Actual__c": Date;
  "Worker_Finish_Time_Hour_Actual__c": string;
  "Worker_Finish_Time_Minutes_Actual__c": string;
  "Worker_InProgress_Start_DateTime_Actual__c": Date;
  "Worker_In_Progress_Start_Hour_Actual__c": string;
  "Worker_In_Progress_Start_Minute_Actual__c": string;
  "Work_Order__c": string;
  "Job_Order__c": string;
  "id": number;
  Job: Job;
  Account: Account;
  Case: Case;
  PMSCase: Case;
  JobOrder: WorkOrder;
  WorkOrder: WorkOrder;
  constructor(data?: AppointmentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Appointment`.
   */
  public static getModelName() {
    return "Appointment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Appointment for dynamic purposes.
  **/
  public static factory(data: AppointmentInterface): Appointment{
    return new Appointment(data);
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
      name: 'Appointment',
      plural: 'Appointments',
      path: 'Appointments',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Customer_Appointment_Setup_Required__c": {
          name: 'Customer_Appointment_Setup_Required__c',
          type: 'string'
        },
        "Customer_Appointment_DateTime_Scheduled__c": {
          name: 'Customer_Appointment_DateTime_Scheduled__c',
          type: 'Date'
        },
        "Customer_Appointment_Start_Scheduled__c": {
          name: 'Customer_Appointment_Start_Scheduled__c',
          type: 'Date'
        },
        "Customer_Appointment_Start_HRS_Scheduled__c": {
          name: 'Customer_Appointment_Start_HRS_Scheduled__c',
          type: 'string'
        },
        "Customer_Apptmnt_Start_Minutes_Scheduled__c": {
          name: 'Customer_Apptmnt_Start_Minutes_Scheduled__c',
          type: 'string'
        },
        "ICC_Case__c": {
          name: 'ICC_Case__c',
          type: 'string'
        },
        "Job__c": {
          name: 'Job__c',
          type: 'string'
        },
        "Partner__c": {
          name: 'Partner__c',
          type: 'string'
        },
        "PMS_Case__c": {
          name: 'PMS_Case__c',
          type: 'string'
        },
        "Worker_Departure_Date_Time_Actual__c": {
          name: 'Worker_Departure_Date_Time_Actual__c',
          type: 'Date'
        },
        "Worker_Arrival_Date_Time_Actual__c": {
          name: 'Worker_Arrival_Date_Time_Actual__c',
          type: 'Date'
        },
        "Worker_Arrival_DateTime_Cust_Requested__c": {
          name: 'Worker_Arrival_DateTime_Cust_Requested__c',
          type: 'Date'
        },
        "Worker_Arrival_Date_Customer_Req_End__c": {
          name: 'Worker_Arrival_Date_Customer_Req_End__c',
          type: 'Date'
        },
        "Worker_Arrival_DateTime_Scheduled__c": {
          name: 'Worker_Arrival_DateTime_Scheduled__c',
          type: 'Date'
        },
        "Worker_Arrival_Date_Customer_Requested__c": {
          name: 'Worker_Arrival_Date_Customer_Requested__c',
          type: 'Date'
        },
        "Worker_Arrival_Date_Scheduled__c": {
          name: 'Worker_Arrival_Date_Scheduled__c',
          type: 'Date'
        },
        "Worker_Arrival_Date_Local_Time_Zone__c": {
          name: 'Worker_Arrival_Date_Local_Time_Zone__c',
          type: 'Date'
        },
        "Worker_Arrival_Hours_Actual__c": {
          name: 'Worker_Arrival_Hours_Actual__c',
          type: 'string'
        },
        "Worker_Arrival_Hours_Customer_Requested__c": {
          name: 'Worker_Arrival_Hours_Customer_Requested__c',
          type: 'string'
        },
        "Worker_End_DateTime_Scheduled__c": {
          name: 'Worker_End_DateTime_Scheduled__c',
          type: 'Date'
        },
        "Worker_Arrival_Minute_Customer_Requested__c": {
          name: 'Worker_Arrival_Minute_Customer_Requested__c',
          type: 'string'
        },
        "Worker_Arrival_Minutes_Actual__c": {
          name: 'Worker_Arrival_Minutes_Actual__c',
          type: 'string'
        },
        "Worker_Arrival_Time_Hours_Scheduled__c": {
          name: 'Worker_Arrival_Time_Hours_Scheduled__c',
          type: 'string'
        },
        "Worker_Arrival_Time_Minutes_Scheduled__c": {
          name: 'Worker_Arrival_Time_Minutes_Scheduled__c',
          type: 'string'
        },
        "Worker_End_Date_Scheduled__c": {
          name: 'Worker_End_Date_Scheduled__c',
          type: 'Date'
        },
        "Worker_End_Time_Hours_Scheduled__c": {
          name: 'Worker_End_Time_Hours_Scheduled__c',
          type: 'string'
        },
        "Worker_End_Time_Minutes_Scheduled__c": {
          name: 'Worker_End_Time_Minutes_Scheduled__c',
          type: 'string'
        },
        "Worker_Finish_Date_Time_Actual__c": {
          name: 'Worker_Finish_Date_Time_Actual__c',
          type: 'Date'
        },
        "Worker_Finish_Time_Hour_Actual__c": {
          name: 'Worker_Finish_Time_Hour_Actual__c',
          type: 'string'
        },
        "Worker_Finish_Time_Minutes_Actual__c": {
          name: 'Worker_Finish_Time_Minutes_Actual__c',
          type: 'string'
        },
        "Worker_InProgress_Start_DateTime_Actual__c": {
          name: 'Worker_InProgress_Start_DateTime_Actual__c',
          type: 'Date'
        },
        "Worker_In_Progress_Start_Hour_Actual__c": {
          name: 'Worker_In_Progress_Start_Hour_Actual__c',
          type: 'string'
        },
        "Worker_In_Progress_Start_Minute_Actual__c": {
          name: 'Worker_In_Progress_Start_Minute_Actual__c',
          type: 'string'
        },
        "Work_Order__c": {
          name: 'Work_Order__c',
          type: 'string'
        },
        "Job_Order__c": {
          name: 'Job_Order__c',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        Job: {
          name: 'Job',
          type: 'Job',
          model: 'Job',
          relationType: 'belongsTo',
                  keyFrom: 'Job__c',
          keyTo: 'sfdcId'
        },
        Account: {
          name: 'Account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Partner__c',
          keyTo: 'sfdcId'
        },
        Case: {
          name: 'Case',
          type: 'Case',
          model: 'Case',
          relationType: 'belongsTo',
                  keyFrom: 'ICC_Case__c',
          keyTo: 'sfdcId'
        },
        PMSCase: {
          name: 'PMSCase',
          type: 'Case',
          model: 'Case',
          relationType: 'belongsTo',
                  keyFrom: 'PMS_Case__c',
          keyTo: 'sfdcId'
        },
        JobOrder: {
          name: 'JobOrder',
          type: 'WorkOrder',
          model: 'WorkOrder',
          relationType: 'belongsTo',
                  keyFrom: 'Job_Order__c',
          keyTo: 'sfdcId'
        },
        WorkOrder: {
          name: 'WorkOrder',
          type: 'WorkOrder',
          model: 'WorkOrder',
          relationType: 'belongsTo',
                  keyFrom: 'Work_Order__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
