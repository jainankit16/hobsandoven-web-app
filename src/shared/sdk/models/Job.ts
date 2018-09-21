/* tslint:disable */
import {
  Account,
  Jobsite,
  Deliverable,
  Vendorsite,
  Appointment,
  Worker,
  Project,
  Case,
  TalentType,
  WorkOrder,
  RecordType,
  Workflow,
  WorkflowStatus
} from '../index';

declare var Object: any;
export interface JobInterface {
  "sfdcId"?: string;
  "Appointment_Schedule_Status_Customer__c"?: string;
  "Appointment_Schedule_Status_Customer_vms__c"?: string;
  "Appointment_Call_Notes__c"?: string;
  "Asset_Model__c"?: string;
  "Asset_Name__c"?: string;
  "Asset_Serial__c"?: string;
  "Assignment_ID__c"?: string;
  "CKSW_BASE__Account__c"?: string;
  "CKSW_BASE__Appointment_Finish__c"?: Date;
  "CKSW_BASE__Appointment_Start__c"?: Date;
  "CKSW_BASE__City__c"?: string;
  "CKSW_BASE__Comment__c"?: string;
  "CKSW_BASE__Contact__c"?: string;
  "CKSW_BASE__Country__c"?: string;
  "CKSW_BASE__Date__c"?: Date;
  "CKSW_BASE__Day_Of_Week__c"?: string;
  "CKSW_BASE__Description__c"?: string;
  "CKSW_BASE__Due_Date__c"?: Date;
  "CKSW_BASE__Duration_Type__c"?: string;
  "CKSW_BASE__Duration__c"?: number;
  "CKSW_BASE__Early_Start__c"?: Date;
  "CKSW_BASE__Finish__c"?: Date;
  "CKSW_BASE__In_Jeopardy_Reason__c"?: string;
  "CKSW_BASE__In_Jeopardy__c"?: boolean;
  "CKSW_BASE__Incomplete_reason__c"?: string;
  "CKSW_BASE__Location__c"?: string;
  "CKSW_BASE__Other_Incomplete_Reason__c"?: string;
  "CKSW_BASE__Priority__c"?: number;
  "CKSW_BASE__State__c"?: string;
  "CKSW_BASE__Status__c"?: string;
  "CKSW_BASE__Street__c"?: string;
  "CKSW_BASE__Zip__c"?: string;
  "Case_Number__c"?: string;
  "Contact_Email__c"?: string;
  "CreatedDate"?: Date;
  "Customer_Appointment_Start_HRS_Scheduled__c"?: string;
  "Customer_Appointment_Start_Scheduled__c"?: Date;
  "Customer_Apptmnt_Start_Minutes_Scheduled__c"?: string;
  "Customer_Contact_Email__c"?: string;
  "Customer_Contact_Phone__c"?: string;
  "Customer_Service_Type_From_Program__c"?: string;
  "Deliverables__c"?: string;
  "Deliverable_Status__c"?: string;
  "Dispatch_Service_Resolution_Status__c"?: string;
  "Dispatch_Worker_Name_Text__c"?: string;
  "Dispatch_Worker_Name__c"?: string;
  "Dispatch_Worker_Phone__c"?: string;
  "Does_this_Job_require_New_Equip_Hardware__c"?: string;
  "Does_this_Job_require_Service_Parts__c"?: string;
  "Equipment_Delivery_Date_ETA__c"?: Date;
  "Equipment_Delivery_Time_ETA_Hours__c"?: string;
  "Equipment_Delivery_Time_ETA_Minutes__c"?: string;
  "Equipment_Local_Pickup_Required__c"?: string;
  "Equipment_Tracking__c"?: string;
  "FE_Requested_Arrival_Date_Time__c"?: Date;
  "Field_Service_Schedule_ETA_Date_Time__c"?: Date;
  "Field_Service_Schedule_ETA_Date__c"?: Date;
  "IRON_Case_Created_Date_Partner__c"?: Date;
  "IRON_Case_Notes_Vendor_via_VFMS_Email__c"?: string;
  "Iron_Case__c"?: string;
  "Iron_Job_num__c"?: string;
  "Job_Status_Internal__c"?: string;
  "Jobsite_Contact_SDesk_Name_phone_email__c"?: string;
  "Jobsite_Contact_Technical_Escalation__c"?: string;
  "Jobsite_Name__c"?: string;
  "Jobsite__c"?: string;
  "Location_Name__c"?: string;
  "Location_Type__c"?: string;
  "Max_Hours_Units__c"?: number;
  "Partner_Case_Number__c"?: string;
  "Phone_Scheduling_1st_Attempt_Unreachable__c"?: Date;
  "Phone_Scheduling_2nd_Attempt_Unreachable__c"?: Date;
  "Phone_Scheduling_3rd_Attempt_Unreachable__c"?: Date;
  "SOW_Equipment__c"?: string;
  "SOW_Helpdesk__c"?: string;
  "SOW_Payment_Terms__c"?: string;
  "SOW_Tools__c"?: string;
  "SOW_Work_Order__c"?: string;
  "Service_Dispatch_SLA_Priority_FrmProgram__c"?: string;
  "Service_Parts_Local_Pickup_Required__c"?: string;
  "SoW_Desc_Vendor_concat__c"?: string;
  "SoW_Description_For_Vendor_Extended_1__c"?: string;
  "SoW_Description_For_Vendor_Extended_2__c"?: string;
  "SoW_Description_For_Vendor_Extended_3__c"?: string;
  "Special_Instruction_from_PMS_Case_Auto__c"?: string;
  "Technical_Level__c"?: string;
  "Worker_Arrival_Date_Customer_Requested__c"?: Date;
  "Worker_Arrival_Hours_Customer_Requested__c"?: string;
  "Worker_Arrival_Minute_Customer_Requested__c"?: string;
  "Worker_Arrival_Time_Hours_Scheduled__c"?: string;
  "Worker_Arrival_Time_Minutes_Scheduled__c"?: string;
  "csum__c"?: string;
  "Vendor__c"?: string;
  "Vendorsite__c"?: string;
  "Name"?: string;
  "Project_SOP__c"?: string;
  "Project__c"?: string;
  "stageTracker"?: string;
  "progressTracker"?: string;
  "Appointment__c"?: string;
  "Created_by_CSD__C"?: boolean;
  "Pricing_Type__c"?: string;
  "RecordTypeId"?: string;
  "Talent_Type_ref__c"?: string;
  "Worker_Arrival_Date_Scheduled__c"?: Date;
  "Worker_End_Date_Scheduled__c"?: Date;
  "Worker_Departure_Date_Time_Actual__c"?: Date;
  "Worker_Arrival_Date_Time_Actual__c"?: Date;
  "Worker_InProgress_Start_DateTime_Actual__c"?: Date;
  "Worker_Finish_Date_Time_Actual__c"?: Date;
  "Specific_Schedule_Time__c"?: Date;
  "Work_Order__c"?: string;
  "Case__c"?: string;
  "Health_Vendor_Status__c"?: string;
  "Health_Project_Status__c"?: string;
  "Health_Case_Status__c"?: string;
  "Health_Jobsite_Status__c"?: string;
  "Health_Worker_Status__c"?: string;
  "Health_List_Price_Status__c"?: string;
  "Health_FMS_Submission_Status__c"?: string;
  "Health_Completion_Status__c"?: string;
  "Custom_work_order_instructions__c"?: string;
  "isCancelled"?: boolean;
  "FileCounter"?: number;
  "FolderLastModifiedOn"?: Date;
  "statusTracker"?: string;
  "acknowledge_instruction"?: boolean;
  "pre_visit_checklist"?: boolean;
  "Rack__c"?: string;
  "Rack_Kit_Top_of_Switch__c"?: string;
  "Rack_Serial__c"?: string;
  "Rack_Side__c"?: string;
  "Rack_Sub_Position__c"?: string;
  "Rack_Sub_Position_Slot__c"?: string;
  "Suite__c"?: string;
  "Row__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "workflowId"?: number;
  "workflowStatusId"?: number;
  vendor?: Account;
  partner?: Account;
  jobsite?: Jobsite;
  deliverable?: Deliverable;
  vendorsite?: Vendorsite;
  appointment?: Appointment;
  worker?: Worker;
  program?: Project;
  project?: Project;
  case?: Case;
  talentType?: TalentType;
  workOrder?: WorkOrder;
  RecordType?: RecordType;
  workflow?: Workflow;
  workflowStatus?: WorkflowStatus;
}

export class Job implements JobInterface {
  "sfdcId": string;
  "Appointment_Schedule_Status_Customer__c": string;
  "Appointment_Schedule_Status_Customer_vms__c": string;
  "Appointment_Call_Notes__c": string;
  "Asset_Model__c": string;
  "Asset_Name__c": string;
  "Asset_Serial__c": string;
  "Assignment_ID__c": string;
  "CKSW_BASE__Account__c": string;
  "CKSW_BASE__Appointment_Finish__c": Date;
  "CKSW_BASE__Appointment_Start__c": Date;
  "CKSW_BASE__City__c": string;
  "CKSW_BASE__Comment__c": string;
  "CKSW_BASE__Contact__c": string;
  "CKSW_BASE__Country__c": string;
  "CKSW_BASE__Date__c": Date;
  "CKSW_BASE__Day_Of_Week__c": string;
  "CKSW_BASE__Description__c": string;
  "CKSW_BASE__Due_Date__c": Date;
  "CKSW_BASE__Duration_Type__c": string;
  "CKSW_BASE__Duration__c": number;
  "CKSW_BASE__Early_Start__c": Date;
  "CKSW_BASE__Finish__c": Date;
  "CKSW_BASE__In_Jeopardy_Reason__c": string;
  "CKSW_BASE__In_Jeopardy__c": boolean;
  "CKSW_BASE__Incomplete_reason__c": string;
  "CKSW_BASE__Location__c": string;
  "CKSW_BASE__Other_Incomplete_Reason__c": string;
  "CKSW_BASE__Priority__c": number;
  "CKSW_BASE__State__c": string;
  "CKSW_BASE__Status__c": string;
  "CKSW_BASE__Street__c": string;
  "CKSW_BASE__Zip__c": string;
  "Case_Number__c": string;
  "Contact_Email__c": string;
  "CreatedDate": Date;
  "Customer_Appointment_Start_HRS_Scheduled__c": string;
  "Customer_Appointment_Start_Scheduled__c": Date;
  "Customer_Apptmnt_Start_Minutes_Scheduled__c": string;
  "Customer_Contact_Email__c": string;
  "Customer_Contact_Phone__c": string;
  "Customer_Service_Type_From_Program__c": string;
  "Deliverables__c": string;
  "Deliverable_Status__c": string;
  "Dispatch_Service_Resolution_Status__c": string;
  "Dispatch_Worker_Name_Text__c": string;
  "Dispatch_Worker_Name__c": string;
  "Dispatch_Worker_Phone__c": string;
  "Does_this_Job_require_New_Equip_Hardware__c": string;
  "Does_this_Job_require_Service_Parts__c": string;
  "Equipment_Delivery_Date_ETA__c": Date;
  "Equipment_Delivery_Time_ETA_Hours__c": string;
  "Equipment_Delivery_Time_ETA_Minutes__c": string;
  "Equipment_Local_Pickup_Required__c": string;
  "Equipment_Tracking__c": string;
  "FE_Requested_Arrival_Date_Time__c": Date;
  "Field_Service_Schedule_ETA_Date_Time__c": Date;
  "Field_Service_Schedule_ETA_Date__c": Date;
  "IRON_Case_Created_Date_Partner__c": Date;
  "IRON_Case_Notes_Vendor_via_VFMS_Email__c": string;
  "Iron_Case__c": string;
  "Iron_Job_num__c": string;
  "Job_Status_Internal__c": string;
  "Jobsite_Contact_SDesk_Name_phone_email__c": string;
  "Jobsite_Contact_Technical_Escalation__c": string;
  "Jobsite_Name__c": string;
  "Jobsite__c": string;
  "Location_Name__c": string;
  "Location_Type__c": string;
  "Max_Hours_Units__c": number;
  "Partner_Case_Number__c": string;
  "Phone_Scheduling_1st_Attempt_Unreachable__c": Date;
  "Phone_Scheduling_2nd_Attempt_Unreachable__c": Date;
  "Phone_Scheduling_3rd_Attempt_Unreachable__c": Date;
  "SOW_Equipment__c": string;
  "SOW_Helpdesk__c": string;
  "SOW_Payment_Terms__c": string;
  "SOW_Tools__c": string;
  "SOW_Work_Order__c": string;
  "Service_Dispatch_SLA_Priority_FrmProgram__c": string;
  "Service_Parts_Local_Pickup_Required__c": string;
  "SoW_Desc_Vendor_concat__c": string;
  "SoW_Description_For_Vendor_Extended_1__c": string;
  "SoW_Description_For_Vendor_Extended_2__c": string;
  "SoW_Description_For_Vendor_Extended_3__c": string;
  "Special_Instruction_from_PMS_Case_Auto__c": string;
  "Technical_Level__c": string;
  "Worker_Arrival_Date_Customer_Requested__c": Date;
  "Worker_Arrival_Hours_Customer_Requested__c": string;
  "Worker_Arrival_Minute_Customer_Requested__c": string;
  "Worker_Arrival_Time_Hours_Scheduled__c": string;
  "Worker_Arrival_Time_Minutes_Scheduled__c": string;
  "csum__c": string;
  "Vendor__c": string;
  "Vendorsite__c": string;
  "Name": string;
  "Project_SOP__c": string;
  "Project__c": string;
  "stageTracker": string;
  "progressTracker": string;
  "Appointment__c": string;
  "Created_by_CSD__C": boolean;
  "Pricing_Type__c": string;
  "RecordTypeId": string;
  "Talent_Type_ref__c": string;
  "Worker_Arrival_Date_Scheduled__c": Date;
  "Worker_End_Date_Scheduled__c": Date;
  "Worker_Departure_Date_Time_Actual__c": Date;
  "Worker_Arrival_Date_Time_Actual__c": Date;
  "Worker_InProgress_Start_DateTime_Actual__c": Date;
  "Worker_Finish_Date_Time_Actual__c": Date;
  "Specific_Schedule_Time__c": Date;
  "Work_Order__c": string;
  "Case__c": string;
  "Health_Vendor_Status__c": string;
  "Health_Project_Status__c": string;
  "Health_Case_Status__c": string;
  "Health_Jobsite_Status__c": string;
  "Health_Worker_Status__c": string;
  "Health_List_Price_Status__c": string;
  "Health_FMS_Submission_Status__c": string;
  "Health_Completion_Status__c": string;
  "Custom_work_order_instructions__c": string;
  "isCancelled": boolean;
  "FileCounter": number;
  "FolderLastModifiedOn": Date;
  "statusTracker": string;
  "acknowledge_instruction": boolean;
  "pre_visit_checklist": boolean;
  "Rack__c": string;
  "Rack_Kit_Top_of_Switch__c": string;
  "Rack_Serial__c": string;
  "Rack_Side__c": string;
  "Rack_Sub_Position__c": string;
  "Rack_Sub_Position_Slot__c": string;
  "Suite__c": string;
  "Row__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "workflowId": number;
  "workflowStatusId": number;
  vendor: Account;
  partner: Account;
  jobsite: Jobsite;
  deliverable: Deliverable;
  vendorsite: Vendorsite;
  appointment: Appointment;
  worker: Worker;
  program: Project;
  project: Project;
  case: Case;
  talentType: TalentType;
  workOrder: WorkOrder;
  RecordType: RecordType;
  workflow: Workflow;
  workflowStatus: WorkflowStatus;
  constructor(data?: JobInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Job`.
   */
  public static getModelName() {
    return "Job";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Job for dynamic purposes.
  **/
  public static factory(data: JobInterface): Job{
    return new Job(data);
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
      name: 'Job',
      plural: 'Jobs',
      path: 'Jobs',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Appointment_Schedule_Status_Customer__c": {
          name: 'Appointment_Schedule_Status_Customer__c',
          type: 'string'
        },
        "Appointment_Schedule_Status_Customer_vms__c": {
          name: 'Appointment_Schedule_Status_Customer_vms__c',
          type: 'string'
        },
        "Appointment_Call_Notes__c": {
          name: 'Appointment_Call_Notes__c',
          type: 'string'
        },
        "Asset_Model__c": {
          name: 'Asset_Model__c',
          type: 'string'
        },
        "Asset_Name__c": {
          name: 'Asset_Name__c',
          type: 'string'
        },
        "Asset_Serial__c": {
          name: 'Asset_Serial__c',
          type: 'string'
        },
        "Assignment_ID__c": {
          name: 'Assignment_ID__c',
          type: 'string'
        },
        "CKSW_BASE__Account__c": {
          name: 'CKSW_BASE__Account__c',
          type: 'string'
        },
        "CKSW_BASE__Appointment_Finish__c": {
          name: 'CKSW_BASE__Appointment_Finish__c',
          type: 'Date'
        },
        "CKSW_BASE__Appointment_Start__c": {
          name: 'CKSW_BASE__Appointment_Start__c',
          type: 'Date'
        },
        "CKSW_BASE__City__c": {
          name: 'CKSW_BASE__City__c',
          type: 'string'
        },
        "CKSW_BASE__Comment__c": {
          name: 'CKSW_BASE__Comment__c',
          type: 'string'
        },
        "CKSW_BASE__Contact__c": {
          name: 'CKSW_BASE__Contact__c',
          type: 'string'
        },
        "CKSW_BASE__Country__c": {
          name: 'CKSW_BASE__Country__c',
          type: 'string'
        },
        "CKSW_BASE__Date__c": {
          name: 'CKSW_BASE__Date__c',
          type: 'Date'
        },
        "CKSW_BASE__Day_Of_Week__c": {
          name: 'CKSW_BASE__Day_Of_Week__c',
          type: 'string'
        },
        "CKSW_BASE__Description__c": {
          name: 'CKSW_BASE__Description__c',
          type: 'string'
        },
        "CKSW_BASE__Due_Date__c": {
          name: 'CKSW_BASE__Due_Date__c',
          type: 'Date'
        },
        "CKSW_BASE__Duration_Type__c": {
          name: 'CKSW_BASE__Duration_Type__c',
          type: 'string'
        },
        "CKSW_BASE__Duration__c": {
          name: 'CKSW_BASE__Duration__c',
          type: 'number'
        },
        "CKSW_BASE__Early_Start__c": {
          name: 'CKSW_BASE__Early_Start__c',
          type: 'Date'
        },
        "CKSW_BASE__Finish__c": {
          name: 'CKSW_BASE__Finish__c',
          type: 'Date'
        },
        "CKSW_BASE__In_Jeopardy_Reason__c": {
          name: 'CKSW_BASE__In_Jeopardy_Reason__c',
          type: 'string'
        },
        "CKSW_BASE__In_Jeopardy__c": {
          name: 'CKSW_BASE__In_Jeopardy__c',
          type: 'boolean'
        },
        "CKSW_BASE__Incomplete_reason__c": {
          name: 'CKSW_BASE__Incomplete_reason__c',
          type: 'string'
        },
        "CKSW_BASE__Location__c": {
          name: 'CKSW_BASE__Location__c',
          type: 'string'
        },
        "CKSW_BASE__Other_Incomplete_Reason__c": {
          name: 'CKSW_BASE__Other_Incomplete_Reason__c',
          type: 'string'
        },
        "CKSW_BASE__Priority__c": {
          name: 'CKSW_BASE__Priority__c',
          type: 'number'
        },
        "CKSW_BASE__State__c": {
          name: 'CKSW_BASE__State__c',
          type: 'string'
        },
        "CKSW_BASE__Status__c": {
          name: 'CKSW_BASE__Status__c',
          type: 'string'
        },
        "CKSW_BASE__Street__c": {
          name: 'CKSW_BASE__Street__c',
          type: 'string'
        },
        "CKSW_BASE__Zip__c": {
          name: 'CKSW_BASE__Zip__c',
          type: 'string'
        },
        "Case_Number__c": {
          name: 'Case_Number__c',
          type: 'string'
        },
        "Contact_Email__c": {
          name: 'Contact_Email__c',
          type: 'string'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "Customer_Appointment_Start_HRS_Scheduled__c": {
          name: 'Customer_Appointment_Start_HRS_Scheduled__c',
          type: 'string'
        },
        "Customer_Appointment_Start_Scheduled__c": {
          name: 'Customer_Appointment_Start_Scheduled__c',
          type: 'Date'
        },
        "Customer_Apptmnt_Start_Minutes_Scheduled__c": {
          name: 'Customer_Apptmnt_Start_Minutes_Scheduled__c',
          type: 'string'
        },
        "Customer_Contact_Email__c": {
          name: 'Customer_Contact_Email__c',
          type: 'string'
        },
        "Customer_Contact_Phone__c": {
          name: 'Customer_Contact_Phone__c',
          type: 'string'
        },
        "Customer_Service_Type_From_Program__c": {
          name: 'Customer_Service_Type_From_Program__c',
          type: 'string'
        },
        "Deliverables__c": {
          name: 'Deliverables__c',
          type: 'string'
        },
        "Deliverable_Status__c": {
          name: 'Deliverable_Status__c',
          type: 'string'
        },
        "Dispatch_Service_Resolution_Status__c": {
          name: 'Dispatch_Service_Resolution_Status__c',
          type: 'string'
        },
        "Dispatch_Worker_Name_Text__c": {
          name: 'Dispatch_Worker_Name_Text__c',
          type: 'string'
        },
        "Dispatch_Worker_Name__c": {
          name: 'Dispatch_Worker_Name__c',
          type: 'string'
        },
        "Dispatch_Worker_Phone__c": {
          name: 'Dispatch_Worker_Phone__c',
          type: 'string'
        },
        "Does_this_Job_require_New_Equip_Hardware__c": {
          name: 'Does_this_Job_require_New_Equip_Hardware__c',
          type: 'string'
        },
        "Does_this_Job_require_Service_Parts__c": {
          name: 'Does_this_Job_require_Service_Parts__c',
          type: 'string'
        },
        "Equipment_Delivery_Date_ETA__c": {
          name: 'Equipment_Delivery_Date_ETA__c',
          type: 'Date'
        },
        "Equipment_Delivery_Time_ETA_Hours__c": {
          name: 'Equipment_Delivery_Time_ETA_Hours__c',
          type: 'string'
        },
        "Equipment_Delivery_Time_ETA_Minutes__c": {
          name: 'Equipment_Delivery_Time_ETA_Minutes__c',
          type: 'string'
        },
        "Equipment_Local_Pickup_Required__c": {
          name: 'Equipment_Local_Pickup_Required__c',
          type: 'string'
        },
        "Equipment_Tracking__c": {
          name: 'Equipment_Tracking__c',
          type: 'string'
        },
        "FE_Requested_Arrival_Date_Time__c": {
          name: 'FE_Requested_Arrival_Date_Time__c',
          type: 'Date'
        },
        "Field_Service_Schedule_ETA_Date_Time__c": {
          name: 'Field_Service_Schedule_ETA_Date_Time__c',
          type: 'Date'
        },
        "Field_Service_Schedule_ETA_Date__c": {
          name: 'Field_Service_Schedule_ETA_Date__c',
          type: 'Date'
        },
        "IRON_Case_Created_Date_Partner__c": {
          name: 'IRON_Case_Created_Date_Partner__c',
          type: 'Date'
        },
        "IRON_Case_Notes_Vendor_via_VFMS_Email__c": {
          name: 'IRON_Case_Notes_Vendor_via_VFMS_Email__c',
          type: 'string'
        },
        "Iron_Case__c": {
          name: 'Iron_Case__c',
          type: 'string'
        },
        "Iron_Job_num__c": {
          name: 'Iron_Job_num__c',
          type: 'string'
        },
        "Job_Status_Internal__c": {
          name: 'Job_Status_Internal__c',
          type: 'string'
        },
        "Jobsite_Contact_SDesk_Name_phone_email__c": {
          name: 'Jobsite_Contact_SDesk_Name_phone_email__c',
          type: 'string'
        },
        "Jobsite_Contact_Technical_Escalation__c": {
          name: 'Jobsite_Contact_Technical_Escalation__c',
          type: 'string'
        },
        "Jobsite_Name__c": {
          name: 'Jobsite_Name__c',
          type: 'string'
        },
        "Jobsite__c": {
          name: 'Jobsite__c',
          type: 'string'
        },
        "Location_Name__c": {
          name: 'Location_Name__c',
          type: 'string'
        },
        "Location_Type__c": {
          name: 'Location_Type__c',
          type: 'string'
        },
        "Max_Hours_Units__c": {
          name: 'Max_Hours_Units__c',
          type: 'number'
        },
        "Partner_Case_Number__c": {
          name: 'Partner_Case_Number__c',
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
        "SOW_Equipment__c": {
          name: 'SOW_Equipment__c',
          type: 'string'
        },
        "SOW_Helpdesk__c": {
          name: 'SOW_Helpdesk__c',
          type: 'string'
        },
        "SOW_Payment_Terms__c": {
          name: 'SOW_Payment_Terms__c',
          type: 'string'
        },
        "SOW_Tools__c": {
          name: 'SOW_Tools__c',
          type: 'string'
        },
        "SOW_Work_Order__c": {
          name: 'SOW_Work_Order__c',
          type: 'string'
        },
        "Service_Dispatch_SLA_Priority_FrmProgram__c": {
          name: 'Service_Dispatch_SLA_Priority_FrmProgram__c',
          type: 'string'
        },
        "Service_Parts_Local_Pickup_Required__c": {
          name: 'Service_Parts_Local_Pickup_Required__c',
          type: 'string'
        },
        "SoW_Desc_Vendor_concat__c": {
          name: 'SoW_Desc_Vendor_concat__c',
          type: 'string'
        },
        "SoW_Description_For_Vendor_Extended_1__c": {
          name: 'SoW_Description_For_Vendor_Extended_1__c',
          type: 'string'
        },
        "SoW_Description_For_Vendor_Extended_2__c": {
          name: 'SoW_Description_For_Vendor_Extended_2__c',
          type: 'string'
        },
        "SoW_Description_For_Vendor_Extended_3__c": {
          name: 'SoW_Description_For_Vendor_Extended_3__c',
          type: 'string'
        },
        "Special_Instruction_from_PMS_Case_Auto__c": {
          name: 'Special_Instruction_from_PMS_Case_Auto__c',
          type: 'string'
        },
        "Technical_Level__c": {
          name: 'Technical_Level__c',
          type: 'string'
        },
        "Worker_Arrival_Date_Customer_Requested__c": {
          name: 'Worker_Arrival_Date_Customer_Requested__c',
          type: 'Date'
        },
        "Worker_Arrival_Hours_Customer_Requested__c": {
          name: 'Worker_Arrival_Hours_Customer_Requested__c',
          type: 'string'
        },
        "Worker_Arrival_Minute_Customer_Requested__c": {
          name: 'Worker_Arrival_Minute_Customer_Requested__c',
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
        "csum__c": {
          name: 'csum__c',
          type: 'string'
        },
        "Vendor__c": {
          name: 'Vendor__c',
          type: 'string'
        },
        "Vendorsite__c": {
          name: 'Vendorsite__c',
          type: 'string'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Project_SOP__c": {
          name: 'Project_SOP__c',
          type: 'string'
        },
        "Project__c": {
          name: 'Project__c',
          type: 'string'
        },
        "stageTracker": {
          name: 'stageTracker',
          type: 'string'
        },
        "progressTracker": {
          name: 'progressTracker',
          type: 'string'
        },
        "Appointment__c": {
          name: 'Appointment__c',
          type: 'string'
        },
        "Created_by_CSD__C": {
          name: 'Created_by_CSD__C',
          type: 'boolean'
        },
        "Pricing_Type__c": {
          name: 'Pricing_Type__c',
          type: 'string'
        },
        "RecordTypeId": {
          name: 'RecordTypeId',
          type: 'string'
        },
        "Talent_Type_ref__c": {
          name: 'Talent_Type_ref__c',
          type: 'string'
        },
        "Worker_Arrival_Date_Scheduled__c": {
          name: 'Worker_Arrival_Date_Scheduled__c',
          type: 'Date'
        },
        "Worker_End_Date_Scheduled__c": {
          name: 'Worker_End_Date_Scheduled__c',
          type: 'Date'
        },
        "Worker_Departure_Date_Time_Actual__c": {
          name: 'Worker_Departure_Date_Time_Actual__c',
          type: 'Date'
        },
        "Worker_Arrival_Date_Time_Actual__c": {
          name: 'Worker_Arrival_Date_Time_Actual__c',
          type: 'Date'
        },
        "Worker_InProgress_Start_DateTime_Actual__c": {
          name: 'Worker_InProgress_Start_DateTime_Actual__c',
          type: 'Date'
        },
        "Worker_Finish_Date_Time_Actual__c": {
          name: 'Worker_Finish_Date_Time_Actual__c',
          type: 'Date'
        },
        "Specific_Schedule_Time__c": {
          name: 'Specific_Schedule_Time__c',
          type: 'Date'
        },
        "Work_Order__c": {
          name: 'Work_Order__c',
          type: 'string'
        },
        "Case__c": {
          name: 'Case__c',
          type: 'string'
        },
        "Health_Vendor_Status__c": {
          name: 'Health_Vendor_Status__c',
          type: 'string'
        },
        "Health_Project_Status__c": {
          name: 'Health_Project_Status__c',
          type: 'string'
        },
        "Health_Case_Status__c": {
          name: 'Health_Case_Status__c',
          type: 'string'
        },
        "Health_Jobsite_Status__c": {
          name: 'Health_Jobsite_Status__c',
          type: 'string'
        },
        "Health_Worker_Status__c": {
          name: 'Health_Worker_Status__c',
          type: 'string'
        },
        "Health_List_Price_Status__c": {
          name: 'Health_List_Price_Status__c',
          type: 'string'
        },
        "Health_FMS_Submission_Status__c": {
          name: 'Health_FMS_Submission_Status__c',
          type: 'string'
        },
        "Health_Completion_Status__c": {
          name: 'Health_Completion_Status__c',
          type: 'string'
        },
        "Custom_work_order_instructions__c": {
          name: 'Custom_work_order_instructions__c',
          type: 'string'
        },
        "isCancelled": {
          name: 'isCancelled',
          type: 'boolean',
          default: false
        },
        "FileCounter": {
          name: 'FileCounter',
          type: 'number'
        },
        "FolderLastModifiedOn": {
          name: 'FolderLastModifiedOn',
          type: 'Date'
        },
        "statusTracker": {
          name: 'statusTracker',
          type: 'string'
        },
        "acknowledge_instruction": {
          name: 'acknowledge_instruction',
          type: 'boolean'
        },
        "pre_visit_checklist": {
          name: 'pre_visit_checklist',
          type: 'boolean'
        },
        "Rack__c": {
          name: 'Rack__c',
          type: 'string'
        },
        "Rack_Kit_Top_of_Switch__c": {
          name: 'Rack_Kit_Top_of_Switch__c',
          type: 'string'
        },
        "Rack_Serial__c": {
          name: 'Rack_Serial__c',
          type: 'string'
        },
        "Rack_Side__c": {
          name: 'Rack_Side__c',
          type: 'string'
        },
        "Rack_Sub_Position__c": {
          name: 'Rack_Sub_Position__c',
          type: 'string'
        },
        "Rack_Sub_Position_Slot__c": {
          name: 'Rack_Sub_Position_Slot__c',
          type: 'string'
        },
        "Suite__c": {
          name: 'Suite__c',
          type: 'string'
        },
        "Row__c": {
          name: 'Row__c',
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
        "workflowId": {
          name: 'workflowId',
          type: 'number'
        },
        "workflowStatusId": {
          name: 'workflowStatusId',
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
        partner: {
          name: 'partner',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'CKSW_BASE__Account__c',
          keyTo: 'sfdcId'
        },
        jobsite: {
          name: 'jobsite',
          type: 'Jobsite',
          model: 'Jobsite',
          relationType: 'belongsTo',
                  keyFrom: 'Jobsite__c',
          keyTo: 'sfdcId'
        },
        deliverable: {
          name: 'deliverable',
          type: 'Deliverable',
          model: 'Deliverable',
          relationType: 'belongsTo',
                  keyFrom: 'Deliverables__c',
          keyTo: 'sfdcId'
        },
        vendorsite: {
          name: 'vendorsite',
          type: 'Vendorsite',
          model: 'Vendorsite',
          relationType: 'belongsTo',
                  keyFrom: 'Vendorsite__c',
          keyTo: 'sfdcId'
        },
        appointment: {
          name: 'appointment',
          type: 'Appointment',
          model: 'Appointment',
          relationType: 'belongsTo',
                  keyFrom: 'Case__c',
          keyTo: 'ICC_Case__c'
        },
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'belongsTo',
                  keyFrom: 'Dispatch_Worker_Name__c',
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
                  keyFrom: 'Case__c',
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
                  keyFrom: 'Work_Order__c',
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
        workflow: {
          name: 'workflow',
          type: 'Workflow',
          model: 'Workflow',
          relationType: 'belongsTo',
                  keyFrom: 'workflowId',
          keyTo: 'id'
        },
        workflowStatus: {
          name: 'workflowStatus',
          type: 'WorkflowStatus',
          model: 'WorkflowStatus',
          relationType: 'belongsTo',
                  keyFrom: 'workflowStatusId',
          keyTo: 'id'
        },
      }
    }
  }
}
