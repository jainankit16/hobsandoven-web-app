/* tslint:disable */
import {
  Project,
  Account,
  Case,
  Jobsite,
  Contact,
  Appointment,
  JobOrderItem,
  RecordType
} from '../index';

declare var Object: any;
export interface WorkOrderInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "CreatedDate"?: Date;
  "Status__c"?: string;
  "Partner__c"?: string;
  "Project_SOP__c"?: string;
  "RecordTypeId"?: string;
  "Jobsite_Project__c"?: string;
  "Work_Summary__c"?: string;
  "Job_Instructions_Required_Tools__c"?: string;
  "Job_Instructions_Training_Documents__c"?: string;
  "Job_Instructions_Service_Deliverables__c"?: string;
  "Job_Instructions_Special_Instructions__c"?: string;
  "Overall_Health__c"?: boolean;
  "Instructions__c"?: string;
  "Health_SOP_Profile_Status__c"?: string;
  "Health_Pricelist_Status__c"?: string;
  "Health_Customer_Price_Available__c"?: string;
  "Health_Vendor_Price_Available__c"?: string;
  "Health_Appointment_status__c"?: string;
  "PMS_Case__c"?: string;
  "Jobsite__c"?: string;
  "Total_Price_Customer_PreTax_Rollup__c"?: number;
  "Work_Order_Start_Date_Time__c"?: Date;
  "Total_Amount__c"?: number;
  "Work_Order_End_Date_Time__c"?: Date;
  "Partner_PO_Number__c"?: string;
  "Partner_Case_Number__c"?: string;
  "Create_PMS_PMC_Case__c"?: boolean;
  "Created_by_Contact__c"?: string;
  "JPC_Case__c"?: string;
  "Appointment__c"?: string;
  "Description__c"?: string;
  "Custom_work_order_instructions__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  JobsiteProject?: Project;
  partner?: Account;
  program?: Project;
  Case?: Case;
  Jobsite?: Jobsite;
  contact?: Contact;
  jpcCase?: Case;
  appointment?: Appointment;
  jobOrderItems?: JobOrderItem[];
  RecordType?: RecordType;
}

export class WorkOrder implements WorkOrderInterface {
  "sfdcId": string;
  "Name": string;
  "CreatedDate": Date;
  "Status__c": string;
  "Partner__c": string;
  "Project_SOP__c": string;
  "RecordTypeId": string;
  "Jobsite_Project__c": string;
  "Work_Summary__c": string;
  "Job_Instructions_Required_Tools__c": string;
  "Job_Instructions_Training_Documents__c": string;
  "Job_Instructions_Service_Deliverables__c": string;
  "Job_Instructions_Special_Instructions__c": string;
  "Overall_Health__c": boolean;
  "Instructions__c": string;
  "Health_SOP_Profile_Status__c": string;
  "Health_Pricelist_Status__c": string;
  "Health_Customer_Price_Available__c": string;
  "Health_Vendor_Price_Available__c": string;
  "Health_Appointment_status__c": string;
  "PMS_Case__c": string;
  "Jobsite__c": string;
  "Total_Price_Customer_PreTax_Rollup__c": number;
  "Work_Order_Start_Date_Time__c": Date;
  "Total_Amount__c": number;
  "Work_Order_End_Date_Time__c": Date;
  "Partner_PO_Number__c": string;
  "Partner_Case_Number__c": string;
  "Create_PMS_PMC_Case__c": boolean;
  "Created_by_Contact__c": string;
  "JPC_Case__c": string;
  "Appointment__c": string;
  "Description__c": string;
  "Custom_work_order_instructions__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  JobsiteProject: Project;
  partner: Account;
  program: Project;
  Case: Case;
  Jobsite: Jobsite;
  contact: Contact;
  jpcCase: Case;
  appointment: Appointment;
  jobOrderItems: JobOrderItem[];
  RecordType: RecordType;
  constructor(data?: WorkOrderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `WorkOrder`.
   */
  public static getModelName() {
    return "WorkOrder";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of WorkOrder for dynamic purposes.
  **/
  public static factory(data: WorkOrderInterface): WorkOrder{
    return new WorkOrder(data);
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
      name: 'WorkOrder',
      plural: 'WorkOrders',
      path: 'WorkOrders',
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
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "Status__c": {
          name: 'Status__c',
          type: 'string'
        },
        "Partner__c": {
          name: 'Partner__c',
          type: 'string'
        },
        "Project_SOP__c": {
          name: 'Project_SOP__c',
          type: 'string'
        },
        "RecordTypeId": {
          name: 'RecordTypeId',
          type: 'string'
        },
        "Jobsite_Project__c": {
          name: 'Jobsite_Project__c',
          type: 'string'
        },
        "Work_Summary__c": {
          name: 'Work_Summary__c',
          type: 'string'
        },
        "Job_Instructions_Required_Tools__c": {
          name: 'Job_Instructions_Required_Tools__c',
          type: 'string'
        },
        "Job_Instructions_Training_Documents__c": {
          name: 'Job_Instructions_Training_Documents__c',
          type: 'string'
        },
        "Job_Instructions_Service_Deliverables__c": {
          name: 'Job_Instructions_Service_Deliverables__c',
          type: 'string'
        },
        "Job_Instructions_Special_Instructions__c": {
          name: 'Job_Instructions_Special_Instructions__c',
          type: 'string'
        },
        "Overall_Health__c": {
          name: 'Overall_Health__c',
          type: 'boolean'
        },
        "Instructions__c": {
          name: 'Instructions__c',
          type: 'string'
        },
        "Health_SOP_Profile_Status__c": {
          name: 'Health_SOP_Profile_Status__c',
          type: 'string'
        },
        "Health_Pricelist_Status__c": {
          name: 'Health_Pricelist_Status__c',
          type: 'string'
        },
        "Health_Customer_Price_Available__c": {
          name: 'Health_Customer_Price_Available__c',
          type: 'string'
        },
        "Health_Vendor_Price_Available__c": {
          name: 'Health_Vendor_Price_Available__c',
          type: 'string'
        },
        "Health_Appointment_status__c": {
          name: 'Health_Appointment_status__c',
          type: 'string'
        },
        "PMS_Case__c": {
          name: 'PMS_Case__c',
          type: 'string'
        },
        "Jobsite__c": {
          name: 'Jobsite__c',
          type: 'string'
        },
        "Total_Price_Customer_PreTax_Rollup__c": {
          name: 'Total_Price_Customer_PreTax_Rollup__c',
          type: 'number'
        },
        "Work_Order_Start_Date_Time__c": {
          name: 'Work_Order_Start_Date_Time__c',
          type: 'Date'
        },
        "Total_Amount__c": {
          name: 'Total_Amount__c',
          type: 'number'
        },
        "Work_Order_End_Date_Time__c": {
          name: 'Work_Order_End_Date_Time__c',
          type: 'Date'
        },
        "Partner_PO_Number__c": {
          name: 'Partner_PO_Number__c',
          type: 'string'
        },
        "Partner_Case_Number__c": {
          name: 'Partner_Case_Number__c',
          type: 'string'
        },
        "Create_PMS_PMC_Case__c": {
          name: 'Create_PMS_PMC_Case__c',
          type: 'boolean'
        },
        "Created_by_Contact__c": {
          name: 'Created_by_Contact__c',
          type: 'string'
        },
        "JPC_Case__c": {
          name: 'JPC_Case__c',
          type: 'string'
        },
        "Appointment__c": {
          name: 'Appointment__c',
          type: 'string'
        },
        "Description__c": {
          name: 'Description__c',
          type: 'string'
        },
        "Custom_work_order_instructions__c": {
          name: 'Custom_work_order_instructions__c',
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
        JobsiteProject: {
          name: 'JobsiteProject',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Jobsite_Project__c',
          keyTo: 'sfdcId'
        },
        partner: {
          name: 'partner',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Partner__c',
          keyTo: 'sfdcId'
        },
        program: {
          name: 'program',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Project_SOP__c',
          keyTo: 'sfdcId'
        },
        Case: {
          name: 'Case',
          type: 'Case',
          model: 'Case',
          relationType: 'belongsTo',
                  keyFrom: 'PMS_Case__c',
          keyTo: 'sfdcId'
        },
        Jobsite: {
          name: 'Jobsite',
          type: 'Jobsite',
          model: 'Jobsite',
          relationType: 'belongsTo',
                  keyFrom: 'Jobsite__c',
          keyTo: 'sfdcId'
        },
        contact: {
          name: 'contact',
          type: 'Contact',
          model: 'Contact',
          relationType: 'belongsTo',
                  keyFrom: 'Created_by_Contact__c',
          keyTo: 'sfdcId'
        },
        jpcCase: {
          name: 'jpcCase',
          type: 'Case',
          model: 'Case',
          relationType: 'belongsTo',
                  keyFrom: 'JPC_Case__c',
          keyTo: 'sfdcId'
        },
        appointment: {
          name: 'appointment',
          type: 'Appointment',
          model: 'Appointment',
          relationType: 'belongsTo',
                  keyFrom: 'Appointment__c',
          keyTo: 'sfdcId'
        },
        jobOrderItems: {
          name: 'jobOrderItems',
          type: 'JobOrderItem[]',
          model: 'JobOrderItem',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'Job_Order__c'
        },
        RecordType: {
          name: 'RecordType',
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
