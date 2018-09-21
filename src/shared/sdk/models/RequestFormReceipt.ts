/* tslint:disable */
import {
  Jobsite,
  Project,
  TalentType,
  Case,
  WorkOrder,
  RequestFormReceiptLine,
  Asset
} from '../index';

declare var Object: any;
export interface RequestFormReceiptInterface {
  "sfdcId"?: string;
  "X3PL_Parts_Dispatch_Special_Instructions__c"?: string;
  "X3PL_Parts_Not_Required__c"?: boolean;
  "X3PS_Do_Not_Dispatch_FE__c"?: boolean;
  "Account_ID__c"?: string;
  "Account_Name__c"?: string;
  "Appointment_Call_or_Delay_Notes__c"?: string;
  "Appointment_Service_Visit_Type__c"?: string;
  "Appointment_Type__c"?: string;
  "Asset__c"?: string;
  "Asset_Idntification__c"?: string;
  "Asset_Physical_Location__c"?: string;
  "Asset_Serial_Number__c"?: string;
  "Asset_Software_Revision__c"?: string;
  "Asset_Tag_Number__c"?: string;
  "Asset_Text__c"?: string;
  "B2B_Number_of_Files_Received__c"?: number;
  "B2B_Number_of_Messages_Received__c"?: number;
  "B2B_Order_Complete__c"?: boolean;
  "B2B_Submission__c"?: boolean;
  "Case__c"?: string;
  "Case_Summary__c"?: string;
  "Contact__c"?: string;
  "Customer_Appointment_Date_Time_Schedule__c"?: Date;
  "Customer_Appointment_Schedule_Start_Date__c"?: Date;
  "Customer_Appointment_Schedule_Start_Hour__c"?: string;
  "Customer_Appointment_Schedule_Start_Mi__c"?: string;
  "Custom_work_order_instructions__c"?: string;
  "Description__c"?: string;
  "ICCCase__c"?: string;
  "Jobsite__c"?: string;
  "Jobsite_City__c"?: string;
  "Jobsite_Company_End_User_or_Ship_To__c"?: string;
  "Jobsite_Contact_Email_End_User_or_Sh__c"?: string;
  "Jobsite_Contact_Name_End_User_or_Shi__c"?: string;
  "Jobsite_Contact_Phone_End_User__c"?: string;
  "Jobsite_Country__c"?: string;
  "Jobsite_Postal_Code__c"?: string;
  "Jobsite_State__c"?: string;
  "Jobsite_Street__c"?: string;
  "Maintenance_Event_Duration_PPM_Hours__c"?: string;
  "Model_Number__c"?: string;
  "Name"?: string;
  "Partner_Case_Error_Description__c"?: string;
  "Partner_Case_Number__c"?: string;
  "Partner_Site_ID__c"?: string;
  "Parts_Arrival_Date_Time_Requested__c"?: Date;
  "Parts_Delivery_Confirmation_Date_Time__c"?: Date;
  "Parts_Delivery_Date_Time_Scheduled_ETA__c"?: Date;
  "Parts_Requested_Arrival_Date__c"?: Date;
  "Parts_Requested_Arrival_DateTime__c"?: Date;
  "Parts_Requested_Arrival_Time_Hour__c"?: string;
  "Parts_Requested_Arrival_Time_Mi__c"?: string;
  "Parts_Ship_Confirmation_Date_Time_Shippd__c"?: Date;
  "Phone_Scheduling_1st_Attempt_Unreachable__c"?: Date;
  "Phone_Scheduling_2nd_Attempt_Unreachable__c"?: Date;
  "Phone_Scheduling_3rd_Attempt_Unreachable__c"?: Date;
  "Program__c"?: string;
  "Service_Category_Type__c"?: string;
  "Service_Contract_Type__c"?: string;
  "Service_Coverage_Type__c"?: string;
  "Service_Dispatch_Priority__c"?: string;
  "Service_Engineer_Expertise_Level__c"?: string;
  "Service_Engineer_Talent_Type__c"?: string;
  "Serviceo_Case_Number__c"?: string;
  "Service_Type__c"?: string;
  "Special_Instruction_for_Service_Engineer__c"?: string;
  "Worker_Arrival_Date_Time_Actual__c"?: Date;
  "Worker_Arrival_Date_Time_Scheduled_ETA__c"?: Date;
  "Worker_Arrival_DateTime_Cust_Request__c"?: Date;
  "Worker_Arrival_DateTime_Cust_Requested__c"?: Date;
  "Work_Order__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  jobsite?: Jobsite;
  project?: Project;
  talentType?: TalentType;
  iccCase?: Case;
  case?: Case;
  workOrder?: WorkOrder;
  items?: RequestFormReceiptLine[];
  asset?: Asset;
}

export class RequestFormReceipt implements RequestFormReceiptInterface {
  "sfdcId": string;
  "X3PL_Parts_Dispatch_Special_Instructions__c": string;
  "X3PL_Parts_Not_Required__c": boolean;
  "X3PS_Do_Not_Dispatch_FE__c": boolean;
  "Account_ID__c": string;
  "Account_Name__c": string;
  "Appointment_Call_or_Delay_Notes__c": string;
  "Appointment_Service_Visit_Type__c": string;
  "Appointment_Type__c": string;
  "Asset__c": string;
  "Asset_Idntification__c": string;
  "Asset_Physical_Location__c": string;
  "Asset_Serial_Number__c": string;
  "Asset_Software_Revision__c": string;
  "Asset_Tag_Number__c": string;
  "Asset_Text__c": string;
  "B2B_Number_of_Files_Received__c": number;
  "B2B_Number_of_Messages_Received__c": number;
  "B2B_Order_Complete__c": boolean;
  "B2B_Submission__c": boolean;
  "Case__c": string;
  "Case_Summary__c": string;
  "Contact__c": string;
  "Customer_Appointment_Date_Time_Schedule__c": Date;
  "Customer_Appointment_Schedule_Start_Date__c": Date;
  "Customer_Appointment_Schedule_Start_Hour__c": string;
  "Customer_Appointment_Schedule_Start_Mi__c": string;
  "Custom_work_order_instructions__c": string;
  "Description__c": string;
  "ICCCase__c": string;
  "Jobsite__c": string;
  "Jobsite_City__c": string;
  "Jobsite_Company_End_User_or_Ship_To__c": string;
  "Jobsite_Contact_Email_End_User_or_Sh__c": string;
  "Jobsite_Contact_Name_End_User_or_Shi__c": string;
  "Jobsite_Contact_Phone_End_User__c": string;
  "Jobsite_Country__c": string;
  "Jobsite_Postal_Code__c": string;
  "Jobsite_State__c": string;
  "Jobsite_Street__c": string;
  "Maintenance_Event_Duration_PPM_Hours__c": string;
  "Model_Number__c": string;
  "Name": string;
  "Partner_Case_Error_Description__c": string;
  "Partner_Case_Number__c": string;
  "Partner_Site_ID__c": string;
  "Parts_Arrival_Date_Time_Requested__c": Date;
  "Parts_Delivery_Confirmation_Date_Time__c": Date;
  "Parts_Delivery_Date_Time_Scheduled_ETA__c": Date;
  "Parts_Requested_Arrival_Date__c": Date;
  "Parts_Requested_Arrival_DateTime__c": Date;
  "Parts_Requested_Arrival_Time_Hour__c": string;
  "Parts_Requested_Arrival_Time_Mi__c": string;
  "Parts_Ship_Confirmation_Date_Time_Shippd__c": Date;
  "Phone_Scheduling_1st_Attempt_Unreachable__c": Date;
  "Phone_Scheduling_2nd_Attempt_Unreachable__c": Date;
  "Phone_Scheduling_3rd_Attempt_Unreachable__c": Date;
  "Program__c": string;
  "Service_Category_Type__c": string;
  "Service_Contract_Type__c": string;
  "Service_Coverage_Type__c": string;
  "Service_Dispatch_Priority__c": string;
  "Service_Engineer_Expertise_Level__c": string;
  "Service_Engineer_Talent_Type__c": string;
  "Serviceo_Case_Number__c": string;
  "Service_Type__c": string;
  "Special_Instruction_for_Service_Engineer__c": string;
  "Worker_Arrival_Date_Time_Actual__c": Date;
  "Worker_Arrival_Date_Time_Scheduled_ETA__c": Date;
  "Worker_Arrival_DateTime_Cust_Request__c": Date;
  "Worker_Arrival_DateTime_Cust_Requested__c": Date;
  "Work_Order__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  jobsite: Jobsite;
  project: Project;
  talentType: TalentType;
  iccCase: Case;
  case: Case;
  workOrder: WorkOrder;
  items: RequestFormReceiptLine[];
  asset: Asset;
  constructor(data?: RequestFormReceiptInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RequestFormReceipt`.
   */
  public static getModelName() {
    return "RequestFormReceipt";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RequestFormReceipt for dynamic purposes.
  **/
  public static factory(data: RequestFormReceiptInterface): RequestFormReceipt{
    return new RequestFormReceipt(data);
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
      name: 'RequestFormReceipt',
      plural: 'RequestFormReceipts',
      path: 'RequestFormReceipts',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "X3PL_Parts_Dispatch_Special_Instructions__c": {
          name: 'X3PL_Parts_Dispatch_Special_Instructions__c',
          type: 'string'
        },
        "X3PL_Parts_Not_Required__c": {
          name: 'X3PL_Parts_Not_Required__c',
          type: 'boolean',
          default: false
        },
        "X3PS_Do_Not_Dispatch_FE__c": {
          name: 'X3PS_Do_Not_Dispatch_FE__c',
          type: 'boolean',
          default: false
        },
        "Account_ID__c": {
          name: 'Account_ID__c',
          type: 'string'
        },
        "Account_Name__c": {
          name: 'Account_Name__c',
          type: 'string'
        },
        "Appointment_Call_or_Delay_Notes__c": {
          name: 'Appointment_Call_or_Delay_Notes__c',
          type: 'string'
        },
        "Appointment_Service_Visit_Type__c": {
          name: 'Appointment_Service_Visit_Type__c',
          type: 'string'
        },
        "Appointment_Type__c": {
          name: 'Appointment_Type__c',
          type: 'string'
        },
        "Asset__c": {
          name: 'Asset__c',
          type: 'string'
        },
        "Asset_Idntification__c": {
          name: 'Asset_Idntification__c',
          type: 'string'
        },
        "Asset_Physical_Location__c": {
          name: 'Asset_Physical_Location__c',
          type: 'string'
        },
        "Asset_Serial_Number__c": {
          name: 'Asset_Serial_Number__c',
          type: 'string'
        },
        "Asset_Software_Revision__c": {
          name: 'Asset_Software_Revision__c',
          type: 'string'
        },
        "Asset_Tag_Number__c": {
          name: 'Asset_Tag_Number__c',
          type: 'string'
        },
        "Asset_Text__c": {
          name: 'Asset_Text__c',
          type: 'string'
        },
        "B2B_Number_of_Files_Received__c": {
          name: 'B2B_Number_of_Files_Received__c',
          type: 'number',
          default: 0
        },
        "B2B_Number_of_Messages_Received__c": {
          name: 'B2B_Number_of_Messages_Received__c',
          type: 'number',
          default: 0
        },
        "B2B_Order_Complete__c": {
          name: 'B2B_Order_Complete__c',
          type: 'boolean',
          default: false
        },
        "B2B_Submission__c": {
          name: 'B2B_Submission__c',
          type: 'boolean',
          default: false
        },
        "Case__c": {
          name: 'Case__c',
          type: 'string'
        },
        "Case_Summary__c": {
          name: 'Case_Summary__c',
          type: 'string'
        },
        "Contact__c": {
          name: 'Contact__c',
          type: 'string'
        },
        "Customer_Appointment_Date_Time_Schedule__c": {
          name: 'Customer_Appointment_Date_Time_Schedule__c',
          type: 'Date'
        },
        "Customer_Appointment_Schedule_Start_Date__c": {
          name: 'Customer_Appointment_Schedule_Start_Date__c',
          type: 'Date'
        },
        "Customer_Appointment_Schedule_Start_Hour__c": {
          name: 'Customer_Appointment_Schedule_Start_Hour__c',
          type: 'string'
        },
        "Customer_Appointment_Schedule_Start_Mi__c": {
          name: 'Customer_Appointment_Schedule_Start_Mi__c',
          type: 'string'
        },
        "Custom_work_order_instructions__c": {
          name: 'Custom_work_order_instructions__c',
          type: 'string'
        },
        "Description__c": {
          name: 'Description__c',
          type: 'string'
        },
        "ICCCase__c": {
          name: 'ICCCase__c',
          type: 'string'
        },
        "Jobsite__c": {
          name: 'Jobsite__c',
          type: 'string'
        },
        "Jobsite_City__c": {
          name: 'Jobsite_City__c',
          type: 'string'
        },
        "Jobsite_Company_End_User_or_Ship_To__c": {
          name: 'Jobsite_Company_End_User_or_Ship_To__c',
          type: 'string'
        },
        "Jobsite_Contact_Email_End_User_or_Sh__c": {
          name: 'Jobsite_Contact_Email_End_User_or_Sh__c',
          type: 'string'
        },
        "Jobsite_Contact_Name_End_User_or_Shi__c": {
          name: 'Jobsite_Contact_Name_End_User_or_Shi__c',
          type: 'string'
        },
        "Jobsite_Contact_Phone_End_User__c": {
          name: 'Jobsite_Contact_Phone_End_User__c',
          type: 'string'
        },
        "Jobsite_Country__c": {
          name: 'Jobsite_Country__c',
          type: 'string'
        },
        "Jobsite_Postal_Code__c": {
          name: 'Jobsite_Postal_Code__c',
          type: 'string'
        },
        "Jobsite_State__c": {
          name: 'Jobsite_State__c',
          type: 'string'
        },
        "Jobsite_Street__c": {
          name: 'Jobsite_Street__c',
          type: 'string'
        },
        "Maintenance_Event_Duration_PPM_Hours__c": {
          name: 'Maintenance_Event_Duration_PPM_Hours__c',
          type: 'string'
        },
        "Model_Number__c": {
          name: 'Model_Number__c',
          type: 'string'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Partner_Case_Error_Description__c": {
          name: 'Partner_Case_Error_Description__c',
          type: 'string'
        },
        "Partner_Case_Number__c": {
          name: 'Partner_Case_Number__c',
          type: 'string'
        },
        "Partner_Site_ID__c": {
          name: 'Partner_Site_ID__c',
          type: 'string'
        },
        "Parts_Arrival_Date_Time_Requested__c": {
          name: 'Parts_Arrival_Date_Time_Requested__c',
          type: 'Date'
        },
        "Parts_Delivery_Confirmation_Date_Time__c": {
          name: 'Parts_Delivery_Confirmation_Date_Time__c',
          type: 'Date'
        },
        "Parts_Delivery_Date_Time_Scheduled_ETA__c": {
          name: 'Parts_Delivery_Date_Time_Scheduled_ETA__c',
          type: 'Date'
        },
        "Parts_Requested_Arrival_Date__c": {
          name: 'Parts_Requested_Arrival_Date__c',
          type: 'Date'
        },
        "Parts_Requested_Arrival_DateTime__c": {
          name: 'Parts_Requested_Arrival_DateTime__c',
          type: 'Date'
        },
        "Parts_Requested_Arrival_Time_Hour__c": {
          name: 'Parts_Requested_Arrival_Time_Hour__c',
          type: 'string'
        },
        "Parts_Requested_Arrival_Time_Mi__c": {
          name: 'Parts_Requested_Arrival_Time_Mi__c',
          type: 'string'
        },
        "Parts_Ship_Confirmation_Date_Time_Shippd__c": {
          name: 'Parts_Ship_Confirmation_Date_Time_Shippd__c',
          type: 'Date'
        },
        "Phone_Scheduling_1st_Attempt_Unreachable__c": {
          name: 'Phone_Scheduling_1st_Attempt_Unreachable__c',
          type: 'Date'
        },
        "Phone_Scheduling_2nd_Attempt_Unreachable__c": {
          name: 'Phone_Scheduling_2nd_Attempt_Unreachable__c',
          type: 'Date'
        },
        "Phone_Scheduling_3rd_Attempt_Unreachable__c": {
          name: 'Phone_Scheduling_3rd_Attempt_Unreachable__c',
          type: 'Date'
        },
        "Program__c": {
          name: 'Program__c',
          type: 'string'
        },
        "Service_Category_Type__c": {
          name: 'Service_Category_Type__c',
          type: 'string'
        },
        "Service_Contract_Type__c": {
          name: 'Service_Contract_Type__c',
          type: 'string'
        },
        "Service_Coverage_Type__c": {
          name: 'Service_Coverage_Type__c',
          type: 'string'
        },
        "Service_Dispatch_Priority__c": {
          name: 'Service_Dispatch_Priority__c',
          type: 'string'
        },
        "Service_Engineer_Expertise_Level__c": {
          name: 'Service_Engineer_Expertise_Level__c',
          type: 'string'
        },
        "Service_Engineer_Talent_Type__c": {
          name: 'Service_Engineer_Talent_Type__c',
          type: 'string'
        },
        "Serviceo_Case_Number__c": {
          name: 'Serviceo_Case_Number__c',
          type: 'string'
        },
        "Service_Type__c": {
          name: 'Service_Type__c',
          type: 'string'
        },
        "Special_Instruction_for_Service_Engineer__c": {
          name: 'Special_Instruction_for_Service_Engineer__c',
          type: 'string'
        },
        "Worker_Arrival_Date_Time_Actual__c": {
          name: 'Worker_Arrival_Date_Time_Actual__c',
          type: 'Date'
        },
        "Worker_Arrival_Date_Time_Scheduled_ETA__c": {
          name: 'Worker_Arrival_Date_Time_Scheduled_ETA__c',
          type: 'Date'
        },
        "Worker_Arrival_DateTime_Cust_Request__c": {
          name: 'Worker_Arrival_DateTime_Cust_Request__c',
          type: 'Date'
        },
        "Worker_Arrival_DateTime_Cust_Requested__c": {
          name: 'Worker_Arrival_DateTime_Cust_Requested__c',
          type: 'Date'
        },
        "Work_Order__c": {
          name: 'Work_Order__c',
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
                  keyFrom: 'Program__c',
          keyTo: 'sfdcId'
        },
        talentType: {
          name: 'talentType',
          type: 'TalentType',
          model: 'TalentType',
          relationType: 'belongsTo',
                  keyFrom: 'Service_Engineer_Talent_Type__c',
          keyTo: 'sfdcId'
        },
        iccCase: {
          name: 'iccCase',
          type: 'Case',
          model: 'Case',
          relationType: 'belongsTo',
                  keyFrom: 'ICCCase__c',
          keyTo: 'sfdcId'
        },
        case: {
          name: 'case',
          type: 'Case',
          model: 'Case',
          relationType: 'belongsTo',
                  keyFrom: 'Case__c',
          keyTo: 'sfdcId'
        },
        workOrder: {
          name: 'workOrder',
          type: 'WorkOrder',
          model: 'WorkOrder',
          relationType: 'belongsTo',
                  keyFrom: 'Work_Order__c',
          keyTo: 'sfdcId'
        },
        items: {
          name: 'items',
          type: 'RequestFormReceiptLine[]',
          model: 'RequestFormReceiptLine',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'Request_Form_Receipt__c'
        },
        asset: {
          name: 'asset',
          type: 'Asset',
          model: 'Asset',
          relationType: 'belongsTo',
                  keyFrom: 'Asset__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
