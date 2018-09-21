/* tslint:disable */
import {
  Project,
  Jobsite,
  Job,
  Account,
  Worker,
  Users,
  Appointment,
  Product,
  Contact,
  TalentType,
  WorkOrder,
  JobOrderItem,
  RecordType,
  Order,
  Asset
} from '../index';

declare var Object: any;
export interface CaseInterface {
  "sfdcId"?: string;
  "Partner_Case_Number__c"?: string;
  "Case_Summary__c"?: string;
  "Description"?: string;
  "X3PS_Vendor_Special_Instructions__c"?: string;
  "Project_SOP__c"?: string;
  "Jobsite__c"?: string;
  "Ship_to_Contact_Name__c"?: string;
  "Ship_To_Contact_Email_Address__c"?: string;
  "Ship_to_Contact_Phone_Number__c"?: string;
  "Customer_Service_Type__c"?: string;
  "Talent_Type__c"?: string;
  "Service_Technical_Level__c"?: string;
  "PPE_Hours__c"?: string;
  "Dispatch_SLA_Priority__c"?: string;
  "Appointment_Schedule_Information__c"?: string;
  "CustomerAppointment_Schedule_StartDate__c"?: Date;
  "Appointment_Schedule_Start_hour__c"?: string;
  "Appointment_Schedule_Start_Minute__c"?: string;
  "RecordTypeId"?: string;
  "CaseNumber"?: string;
  "Status"?: string;
  "Service_Dispatch__c"?: string;
  "Origin"?: string;
  "AccountId"?: string;
  "Iron_Case_Number__c"?: string;
  "CreatedDate"?: Date;
  "Subject"?: string;
  "Type"?: string;
  "Dispatch_Service_Resolution_Status__c"?: string;
  "Coverage_Hours__c"?: string;
  "Customersitefse_Case__c"?: boolean;
  "Project__c"?: string;
  "PartnerPortelCase__c"?: boolean;
  "Talent_Type_ref__c"?: string;
  "Job_Order_Item__c"?: string;
  "AssetId"?: string;
  "SuppliedName"?: string;
  "Job_Order__c"?: string;
  "Project_Error__c"?: boolean;
  "Dispatchable__c"?: boolean;
  "LastModifiedDate"?: Date;
  "Jobsite_Country__c"?: string;
  "Ship_to_Company_Name__c"?: string;
  "Health_Jobsite_Status__c"?: string;
  "Health_Project_status__c"?: string;
  "Health_OrderItem_Status__c"?: string;
  "Health_Vendor_Status__c"?: string;
  "Health_Customer_Pricelist_Status__c"?: string;
  "Health_Pricelist_Status__c"?: string;
  "Health_Program_Pricelist__c"?: string;
  "Health_Asset_Sku_Comparison__c"?: string;
  "Health_SDesk_Contact__c"?: string;
  "Health_TEsc_Contact__c"?: string;
  "Health_SKU_Price_Status__c"?: string;
  "Health_Dispatch_Status__c"?: string;
  "Health_SKU_Status__c"?: string;
  "Health_SO_Status__c"?: string;
  "Health_Transaction_Status__c"?: string;
  "Health_SKU_Price__c"?: boolean;
  "ParentId"?: string;
  "Dispatch_Worker_Phone__c"?: string;
  "B3_IRON_Help_Desk_Customer_Contacted__c"?: boolean;
  "Appointment_Schedule_Status_Customer__c"?: string;
  "Phone_Scheduling_1st_Attempt_Unreachable__c"?: Date;
  "Phone_Scheduling_2nd_Attempt_Unreachable__c"?: Date;
  "Phone_Scheduling_3rd_Attempt_Unreachable__c"?: Date;
  "Field_Service_Schedule_ETA_Date_Time__c"?: Date;
  "B1A_IRON_Help_Desk_Cust_Phone_Recd__c"?: boolean;
  "B2A_IRON_Help_Desk_Cust_Email_Recd__c"?: boolean;
  "B2_IRON_Help_Desk_Contact_Mode__c"?: string;
  "Field_Service_Schedule_ETA_Date__c"?: Date;
  "Dispatch_Worker__c"?: string;
  "CreatedById"?: string;
  "Created_by_Contact__c"?: string;
  "Appointment__c"?: string;
  "Custom_work_order_instructions__c"?: string;
  "Sales_Order_Reference__c"?: string;
  "SLA_Term_based_End_Date_Time__c"?: Date;
  "SKU__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  program?: Project;
  Jobsite?: Jobsite;
  Job?: Job;
  Account?: Account;
  case?: Case;
  worker?: Worker;
  users?: Users;
  appointment?: Appointment;
  product?: Product;
  contact?: Contact;
  talentType?: TalentType;
  workOrder?: WorkOrder;
  jobOrderItem?: JobOrderItem;
  RecordType?: RecordType;
  order?: Order;
  asset?: Asset;
}

export class Case implements CaseInterface {
  "sfdcId": string;
  "Partner_Case_Number__c": string;
  "Case_Summary__c": string;
  "Description": string;
  "X3PS_Vendor_Special_Instructions__c": string;
  "Project_SOP__c": string;
  "Jobsite__c": string;
  "Ship_to_Contact_Name__c": string;
  "Ship_To_Contact_Email_Address__c": string;
  "Ship_to_Contact_Phone_Number__c": string;
  "Customer_Service_Type__c": string;
  "Talent_Type__c": string;
  "Service_Technical_Level__c": string;
  "PPE_Hours__c": string;
  "Dispatch_SLA_Priority__c": string;
  "Appointment_Schedule_Information__c": string;
  "CustomerAppointment_Schedule_StartDate__c": Date;
  "Appointment_Schedule_Start_hour__c": string;
  "Appointment_Schedule_Start_Minute__c": string;
  "RecordTypeId": string;
  "CaseNumber": string;
  "Status": string;
  "Service_Dispatch__c": string;
  "Origin": string;
  "AccountId": string;
  "Iron_Case_Number__c": string;
  "CreatedDate": Date;
  "Subject": string;
  "Type": string;
  "Dispatch_Service_Resolution_Status__c": string;
  "Coverage_Hours__c": string;
  "Customersitefse_Case__c": boolean;
  "Project__c": string;
  "PartnerPortelCase__c": boolean;
  "Talent_Type_ref__c": string;
  "Job_Order_Item__c": string;
  "AssetId": string;
  "SuppliedName": string;
  "Job_Order__c": string;
  "Project_Error__c": boolean;
  "Dispatchable__c": boolean;
  "LastModifiedDate": Date;
  "Jobsite_Country__c": string;
  "Ship_to_Company_Name__c": string;
  "Health_Jobsite_Status__c": string;
  "Health_Project_status__c": string;
  "Health_OrderItem_Status__c": string;
  "Health_Vendor_Status__c": string;
  "Health_Customer_Pricelist_Status__c": string;
  "Health_Pricelist_Status__c": string;
  "Health_Program_Pricelist__c": string;
  "Health_Asset_Sku_Comparison__c": string;
  "Health_SDesk_Contact__c": string;
  "Health_TEsc_Contact__c": string;
  "Health_SKU_Price_Status__c": string;
  "Health_Dispatch_Status__c": string;
  "Health_SKU_Status__c": string;
  "Health_SO_Status__c": string;
  "Health_Transaction_Status__c": string;
  "Health_SKU_Price__c": boolean;
  "ParentId": string;
  "Dispatch_Worker_Phone__c": string;
  "B3_IRON_Help_Desk_Customer_Contacted__c": boolean;
  "Appointment_Schedule_Status_Customer__c": string;
  "Phone_Scheduling_1st_Attempt_Unreachable__c": Date;
  "Phone_Scheduling_2nd_Attempt_Unreachable__c": Date;
  "Phone_Scheduling_3rd_Attempt_Unreachable__c": Date;
  "Field_Service_Schedule_ETA_Date_Time__c": Date;
  "B1A_IRON_Help_Desk_Cust_Phone_Recd__c": boolean;
  "B2A_IRON_Help_Desk_Cust_Email_Recd__c": boolean;
  "B2_IRON_Help_Desk_Contact_Mode__c": string;
  "Field_Service_Schedule_ETA_Date__c": Date;
  "Dispatch_Worker__c": string;
  "CreatedById": string;
  "Created_by_Contact__c": string;
  "Appointment__c": string;
  "Custom_work_order_instructions__c": string;
  "Sales_Order_Reference__c": string;
  "SLA_Term_based_End_Date_Time__c": Date;
  "SKU__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  program: Project;
  Jobsite: Jobsite;
  Job: Job;
  Account: Account;
  case: Case;
  worker: Worker;
  users: Users;
  appointment: Appointment;
  product: Product;
  contact: Contact;
  talentType: TalentType;
  workOrder: WorkOrder;
  jobOrderItem: JobOrderItem;
  RecordType: RecordType;
  order: Order;
  asset: Asset;
  constructor(data?: CaseInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Case`.
   */
  public static getModelName() {
    return "Case";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Case for dynamic purposes.
  **/
  public static factory(data: CaseInterface): Case{
    return new Case(data);
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
      name: 'Case',
      plural: 'Cases',
      path: 'Cases',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Partner_Case_Number__c": {
          name: 'Partner_Case_Number__c',
          type: 'string'
        },
        "Case_Summary__c": {
          name: 'Case_Summary__c',
          type: 'string'
        },
        "Description": {
          name: 'Description',
          type: 'string'
        },
        "X3PS_Vendor_Special_Instructions__c": {
          name: 'X3PS_Vendor_Special_Instructions__c',
          type: 'string'
        },
        "Project_SOP__c": {
          name: 'Project_SOP__c',
          type: 'string'
        },
        "Jobsite__c": {
          name: 'Jobsite__c',
          type: 'string'
        },
        "Ship_to_Contact_Name__c": {
          name: 'Ship_to_Contact_Name__c',
          type: 'string'
        },
        "Ship_To_Contact_Email_Address__c": {
          name: 'Ship_To_Contact_Email_Address__c',
          type: 'string'
        },
        "Ship_to_Contact_Phone_Number__c": {
          name: 'Ship_to_Contact_Phone_Number__c',
          type: 'string'
        },
        "Customer_Service_Type__c": {
          name: 'Customer_Service_Type__c',
          type: 'string'
        },
        "Talent_Type__c": {
          name: 'Talent_Type__c',
          type: 'string'
        },
        "Service_Technical_Level__c": {
          name: 'Service_Technical_Level__c',
          type: 'string'
        },
        "PPE_Hours__c": {
          name: 'PPE_Hours__c',
          type: 'string'
        },
        "Dispatch_SLA_Priority__c": {
          name: 'Dispatch_SLA_Priority__c',
          type: 'string'
        },
        "Appointment_Schedule_Information__c": {
          name: 'Appointment_Schedule_Information__c',
          type: 'string'
        },
        "CustomerAppointment_Schedule_StartDate__c": {
          name: 'CustomerAppointment_Schedule_StartDate__c',
          type: 'Date'
        },
        "Appointment_Schedule_Start_hour__c": {
          name: 'Appointment_Schedule_Start_hour__c',
          type: 'string'
        },
        "Appointment_Schedule_Start_Minute__c": {
          name: 'Appointment_Schedule_Start_Minute__c',
          type: 'string'
        },
        "RecordTypeId": {
          name: 'RecordTypeId',
          type: 'string'
        },
        "CaseNumber": {
          name: 'CaseNumber',
          type: 'string'
        },
        "Status": {
          name: 'Status',
          type: 'string'
        },
        "Service_Dispatch__c": {
          name: 'Service_Dispatch__c',
          type: 'string'
        },
        "Origin": {
          name: 'Origin',
          type: 'string'
        },
        "AccountId": {
          name: 'AccountId',
          type: 'string'
        },
        "Iron_Case_Number__c": {
          name: 'Iron_Case_Number__c',
          type: 'string'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "Subject": {
          name: 'Subject',
          type: 'string'
        },
        "Type": {
          name: 'Type',
          type: 'string'
        },
        "Dispatch_Service_Resolution_Status__c": {
          name: 'Dispatch_Service_Resolution_Status__c',
          type: 'string'
        },
        "Coverage_Hours__c": {
          name: 'Coverage_Hours__c',
          type: 'string'
        },
        "Customersitefse_Case__c": {
          name: 'Customersitefse_Case__c',
          type: 'boolean'
        },
        "Project__c": {
          name: 'Project__c',
          type: 'string'
        },
        "PartnerPortelCase__c": {
          name: 'PartnerPortelCase__c',
          type: 'boolean'
        },
        "Talent_Type_ref__c": {
          name: 'Talent_Type_ref__c',
          type: 'string'
        },
        "Job_Order_Item__c": {
          name: 'Job_Order_Item__c',
          type: 'string'
        },
        "AssetId": {
          name: 'AssetId',
          type: 'string'
        },
        "SuppliedName": {
          name: 'SuppliedName',
          type: 'string'
        },
        "Job_Order__c": {
          name: 'Job_Order__c',
          type: 'string'
        },
        "Project_Error__c": {
          name: 'Project_Error__c',
          type: 'boolean'
        },
        "Dispatchable__c": {
          name: 'Dispatchable__c',
          type: 'boolean'
        },
        "LastModifiedDate": {
          name: 'LastModifiedDate',
          type: 'Date'
        },
        "Jobsite_Country__c": {
          name: 'Jobsite_Country__c',
          type: 'string'
        },
        "Ship_to_Company_Name__c": {
          name: 'Ship_to_Company_Name__c',
          type: 'string'
        },
        "Health_Jobsite_Status__c": {
          name: 'Health_Jobsite_Status__c',
          type: 'string'
        },
        "Health_Project_status__c": {
          name: 'Health_Project_status__c',
          type: 'string'
        },
        "Health_OrderItem_Status__c": {
          name: 'Health_OrderItem_Status__c',
          type: 'string'
        },
        "Health_Vendor_Status__c": {
          name: 'Health_Vendor_Status__c',
          type: 'string'
        },
        "Health_Customer_Pricelist_Status__c": {
          name: 'Health_Customer_Pricelist_Status__c',
          type: 'string'
        },
        "Health_Pricelist_Status__c": {
          name: 'Health_Pricelist_Status__c',
          type: 'string'
        },
        "Health_Program_Pricelist__c": {
          name: 'Health_Program_Pricelist__c',
          type: 'string'
        },
        "Health_Asset_Sku_Comparison__c": {
          name: 'Health_Asset_Sku_Comparison__c',
          type: 'string'
        },
        "Health_SDesk_Contact__c": {
          name: 'Health_SDesk_Contact__c',
          type: 'string'
        },
        "Health_TEsc_Contact__c": {
          name: 'Health_TEsc_Contact__c',
          type: 'string'
        },
        "Health_SKU_Price_Status__c": {
          name: 'Health_SKU_Price_Status__c',
          type: 'string'
        },
        "Health_Dispatch_Status__c": {
          name: 'Health_Dispatch_Status__c',
          type: 'string'
        },
        "Health_SKU_Status__c": {
          name: 'Health_SKU_Status__c',
          type: 'string'
        },
        "Health_SO_Status__c": {
          name: 'Health_SO_Status__c',
          type: 'string'
        },
        "Health_Transaction_Status__c": {
          name: 'Health_Transaction_Status__c',
          type: 'string'
        },
        "Health_SKU_Price__c": {
          name: 'Health_SKU_Price__c',
          type: 'boolean'
        },
        "ParentId": {
          name: 'ParentId',
          type: 'string'
        },
        "Dispatch_Worker_Phone__c": {
          name: 'Dispatch_Worker_Phone__c',
          type: 'string'
        },
        "B3_IRON_Help_Desk_Customer_Contacted__c": {
          name: 'B3_IRON_Help_Desk_Customer_Contacted__c',
          type: 'boolean'
        },
        "Appointment_Schedule_Status_Customer__c": {
          name: 'Appointment_Schedule_Status_Customer__c',
          type: 'string'
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
        "Field_Service_Schedule_ETA_Date_Time__c": {
          name: 'Field_Service_Schedule_ETA_Date_Time__c',
          type: 'Date'
        },
        "B1A_IRON_Help_Desk_Cust_Phone_Recd__c": {
          name: 'B1A_IRON_Help_Desk_Cust_Phone_Recd__c',
          type: 'boolean'
        },
        "B2A_IRON_Help_Desk_Cust_Email_Recd__c": {
          name: 'B2A_IRON_Help_Desk_Cust_Email_Recd__c',
          type: 'boolean'
        },
        "B2_IRON_Help_Desk_Contact_Mode__c": {
          name: 'B2_IRON_Help_Desk_Contact_Mode__c',
          type: 'string'
        },
        "Field_Service_Schedule_ETA_Date__c": {
          name: 'Field_Service_Schedule_ETA_Date__c',
          type: 'Date'
        },
        "Dispatch_Worker__c": {
          name: 'Dispatch_Worker__c',
          type: 'string'
        },
        "CreatedById": {
          name: 'CreatedById',
          type: 'string'
        },
        "Created_by_Contact__c": {
          name: 'Created_by_Contact__c',
          type: 'string'
        },
        "Appointment__c": {
          name: 'Appointment__c',
          type: 'string'
        },
        "Custom_work_order_instructions__c": {
          name: 'Custom_work_order_instructions__c',
          type: 'string'
        },
        "Sales_Order_Reference__c": {
          name: 'Sales_Order_Reference__c',
          type: 'string'
        },
        "SLA_Term_based_End_Date_Time__c": {
          name: 'SLA_Term_based_End_Date_Time__c',
          type: 'Date'
        },
        "SKU__c": {
          name: 'SKU__c',
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
        program: {
          name: 'program',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Project_SOP__c',
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
        Job: {
          name: 'Job',
          type: 'Job',
          model: 'Job',
          relationType: 'belongsTo',
                  keyFrom: 'Service_Dispatch__c',
          keyTo: 'sfdcId'
        },
        Account: {
          name: 'Account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'AccountId',
          keyTo: 'sfdcId'
        },
        case: {
          name: 'case',
          type: 'Case',
          model: 'Case',
          relationType: 'belongsTo',
                  keyFrom: 'ParentId',
          keyTo: 'sfdcId'
        },
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'belongsTo',
                  keyFrom: 'Dispatch_Worker__c',
          keyTo: 'sfdcId'
        },
        users: {
          name: 'users',
          type: 'Users',
          model: 'Users',
          relationType: 'belongsTo',
                  keyFrom: 'CreatedById',
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
        product: {
          name: 'product',
          type: 'Product',
          model: 'Product',
          relationType: 'belongsTo',
                  keyFrom: 'SKU__c',
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
        talentType: {
          name: 'talentType',
          type: 'TalentType',
          model: 'TalentType',
          relationType: 'belongsTo',
                  keyFrom: 'Talent_Type_ref__c',
          keyTo: 'sfdcId'
        },
        workOrder: {
          name: 'workOrder',
          type: 'WorkOrder',
          model: 'WorkOrder',
          relationType: 'belongsTo',
                  keyFrom: 'Job_Order__c',
          keyTo: 'sfdcId'
        },
        jobOrderItem: {
          name: 'jobOrderItem',
          type: 'JobOrderItem',
          model: 'JobOrderItem',
          relationType: 'belongsTo',
                  keyFrom: 'Job_Order_Item__c',
          keyTo: 'sfdcId'
        },
        RecordType: {
          name: 'RecordType',
          type: 'RecordType',
          model: 'RecordType',
          relationType: 'belongsTo',
                  keyFrom: 'RecordTypeId',
          keyTo: 'sfdcId'
        },
        order: {
          name: 'order',
          type: 'Order',
          model: 'Order',
          relationType: 'belongsTo',
                  keyFrom: 'Sales_Order_Reference__c',
          keyTo: 'sfdcId'
        },
        asset: {
          name: 'asset',
          type: 'Asset',
          model: 'Asset',
          relationType: 'belongsTo',
                  keyFrom: 'AssetId',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
