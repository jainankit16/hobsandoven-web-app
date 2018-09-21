/* tslint:disable */
import {
  Account,
  Timecard,
  Payment,
  PurchaseOrder,
  RecordType,
  Order
} from '../index';

declare var Object: any;
export interface InvoiceInterface {
  "sfdcId": string;
  "Account__c"?: string;
  "Actual_VAT_Tax__c"?: number;
  "Amount__c"?: number;
  "Balance__c"?: number;
  "CurrencyIsoCode"?: string;
  "Due_Date__c"?: Date;
  "Job_Worker__c"?: string;
  "Invoice_Notes__c"?: string;
  "Iron_Purchase_Order_Reference__c"?: string;
  "Name"?: string;
  "Purchase_Order__c"?: string;
  "PO_Amount__c"?: number;
  "PO_Additional_Hours_Price__c"?: number;
  "PO_PPE_Hours__c"?: number;
  "PO_PPE_Hours_Price__c"?: number;
  "Roll_up_Discount__c"?: string;
  "Roll_up_VAT__c"?: number;
  "Roll_up_Timecard_s_IRON_Approval_Status__c"?: string;
  "SO_Additional_Hours__c"?: number;
  "SO_PPE_Hours_Price__c"?: number;
  "SO_Roll_up_Additional_Rate__c"?: number;
  "SO_Roll_up_PPE_Hours__c"?: number;
  "Sale_Order__c"?: string;
  "Sales_Order_Amount__c"?: number;
  "Timesheet_Month__c"?: string;
  "Timesheet_Year__c"?: string;
  "Timecard_Received_Final__c"?: string;
  "Timecard_Timesheet__c"?: string;
  "Total_Hours_Invoiced__c"?: number;
  "Total_Paid__c"?: number;
  "Total_Un_Invoiced_Amount__c"?: number;
  "Total_Visit_Hours__c"?: number;
  "Vendor_Timecard_Actual_In__c"?: string;
  "Vendor_Timecard_Actual_Out__c"?: string;
  "Vendor_Purchase_Receipt_Number__c"?: string;
  "Vendor_Time_Card_Notes_Tasks_Performed__c"?: string;
  "Vendor_Time_Card_Observation_Suggestion__c"?: string;
  "Vendor_Timecard_Cust_Site_Sign_off_Name__c"?: string;
  "Sales_Order_Number__c"?: string;
  "Sales_Order_Start_Date__c"?: Date;
  "Count_of_Order_Items__c"?: number;
  "SO_PPE_Hours__c"?: number;
  "Vendor_Time_Card_Total_Hours_All_Visits__c"?: number;
  "Roll_up_helpdesk_Price__c"?: number;
  "Sales_Order_End_Date__c"?: Date;
  "SO_Already_Invoiced_Hours__c"?: number;
  "Job_Status__c"?: string;
  "SO_Already_Invoiced_Amount__c"?: number;
  "CreatedDate"?: Date;
  "Vendor_Timecard_Details_Roll_up_Auto__c"?: string;
  "RecordTypeId"?: string;
  "Roll_up_VAT_Tax__c"?: number;
  "Vendor_Timecard_Details_Roll_up__c"?: string;
  "Last_Approved_Timecard_Amount__c"?: number;
  "SO_Last_Approved_Timecard_Hours_Std__c"?: number;
  "SO_Last_Approved_Timecard_Hours_OT__c"?: number;
  "SO_Last_Approved_Timecard_Hours_Weekend__c"?: number;
  "SO_Roll_up_Unit_Rate__c"?: number;
  "Worker_on_the_Job__c"?: string;
  "Iron_PMS_Case_Number__c"?: string;
  "Partner_Case_Number__c"?: string;
  "Jobsite_Name__c"?: string;
  "id"?: number;
  vendor?: Account;
  timecard?: Timecard;
  payments?: Payment[];
  purchaseOrder?: PurchaseOrder;
  recordType?: RecordType;
  saleOrder?: Order;
}

export class Invoice implements InvoiceInterface {
  "sfdcId": string;
  "Account__c": string;
  "Actual_VAT_Tax__c": number;
  "Amount__c": number;
  "Balance__c": number;
  "CurrencyIsoCode": string;
  "Due_Date__c": Date;
  "Job_Worker__c": string;
  "Invoice_Notes__c": string;
  "Iron_Purchase_Order_Reference__c": string;
  "Name": string;
  "Purchase_Order__c": string;
  "PO_Amount__c": number;
  "PO_Additional_Hours_Price__c": number;
  "PO_PPE_Hours__c": number;
  "PO_PPE_Hours_Price__c": number;
  "Roll_up_Discount__c": string;
  "Roll_up_VAT__c": number;
  "Roll_up_Timecard_s_IRON_Approval_Status__c": string;
  "SO_Additional_Hours__c": number;
  "SO_PPE_Hours_Price__c": number;
  "SO_Roll_up_Additional_Rate__c": number;
  "SO_Roll_up_PPE_Hours__c": number;
  "Sale_Order__c": string;
  "Sales_Order_Amount__c": number;
  "Timesheet_Month__c": string;
  "Timesheet_Year__c": string;
  "Timecard_Received_Final__c": string;
  "Timecard_Timesheet__c": string;
  "Total_Hours_Invoiced__c": number;
  "Total_Paid__c": number;
  "Total_Un_Invoiced_Amount__c": number;
  "Total_Visit_Hours__c": number;
  "Vendor_Timecard_Actual_In__c": string;
  "Vendor_Timecard_Actual_Out__c": string;
  "Vendor_Purchase_Receipt_Number__c": string;
  "Vendor_Time_Card_Notes_Tasks_Performed__c": string;
  "Vendor_Time_Card_Observation_Suggestion__c": string;
  "Vendor_Timecard_Cust_Site_Sign_off_Name__c": string;
  "Sales_Order_Number__c": string;
  "Sales_Order_Start_Date__c": Date;
  "Count_of_Order_Items__c": number;
  "SO_PPE_Hours__c": number;
  "Vendor_Time_Card_Total_Hours_All_Visits__c": number;
  "Roll_up_helpdesk_Price__c": number;
  "Sales_Order_End_Date__c": Date;
  "SO_Already_Invoiced_Hours__c": number;
  "Job_Status__c": string;
  "SO_Already_Invoiced_Amount__c": number;
  "CreatedDate": Date;
  "Vendor_Timecard_Details_Roll_up_Auto__c": string;
  "RecordTypeId": string;
  "Roll_up_VAT_Tax__c": number;
  "Vendor_Timecard_Details_Roll_up__c": string;
  "Last_Approved_Timecard_Amount__c": number;
  "SO_Last_Approved_Timecard_Hours_Std__c": number;
  "SO_Last_Approved_Timecard_Hours_OT__c": number;
  "SO_Last_Approved_Timecard_Hours_Weekend__c": number;
  "SO_Roll_up_Unit_Rate__c": number;
  "Worker_on_the_Job__c": string;
  "Iron_PMS_Case_Number__c": string;
  "Partner_Case_Number__c": string;
  "Jobsite_Name__c": string;
  "id": number;
  vendor: Account;
  timecard: Timecard;
  payments: Payment[];
  purchaseOrder: PurchaseOrder;
  recordType: RecordType;
  saleOrder: Order;
  constructor(data?: InvoiceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Invoice`.
   */
  public static getModelName() {
    return "Invoice";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Invoice for dynamic purposes.
  **/
  public static factory(data: InvoiceInterface): Invoice{
    return new Invoice(data);
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
      name: 'Invoice',
      plural: 'Invoices',
      path: 'Invoices',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Account__c": {
          name: 'Account__c',
          type: 'string'
        },
        "Actual_VAT_Tax__c": {
          name: 'Actual_VAT_Tax__c',
          type: 'number'
        },
        "Amount__c": {
          name: 'Amount__c',
          type: 'number'
        },
        "Balance__c": {
          name: 'Balance__c',
          type: 'number'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
          type: 'string'
        },
        "Due_Date__c": {
          name: 'Due_Date__c',
          type: 'Date'
        },
        "Job_Worker__c": {
          name: 'Job_Worker__c',
          type: 'string'
        },
        "Invoice_Notes__c": {
          name: 'Invoice_Notes__c',
          type: 'string'
        },
        "Iron_Purchase_Order_Reference__c": {
          name: 'Iron_Purchase_Order_Reference__c',
          type: 'string'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Purchase_Order__c": {
          name: 'Purchase_Order__c',
          type: 'string'
        },
        "PO_Amount__c": {
          name: 'PO_Amount__c',
          type: 'number'
        },
        "PO_Additional_Hours_Price__c": {
          name: 'PO_Additional_Hours_Price__c',
          type: 'number'
        },
        "PO_PPE_Hours__c": {
          name: 'PO_PPE_Hours__c',
          type: 'number'
        },
        "PO_PPE_Hours_Price__c": {
          name: 'PO_PPE_Hours_Price__c',
          type: 'number'
        },
        "Roll_up_Discount__c": {
          name: 'Roll_up_Discount__c',
          type: 'string'
        },
        "Roll_up_VAT__c": {
          name: 'Roll_up_VAT__c',
          type: 'number'
        },
        "Roll_up_Timecard_s_IRON_Approval_Status__c": {
          name: 'Roll_up_Timecard_s_IRON_Approval_Status__c',
          type: 'string'
        },
        "SO_Additional_Hours__c": {
          name: 'SO_Additional_Hours__c',
          type: 'number'
        },
        "SO_PPE_Hours_Price__c": {
          name: 'SO_PPE_Hours_Price__c',
          type: 'number'
        },
        "SO_Roll_up_Additional_Rate__c": {
          name: 'SO_Roll_up_Additional_Rate__c',
          type: 'number'
        },
        "SO_Roll_up_PPE_Hours__c": {
          name: 'SO_Roll_up_PPE_Hours__c',
          type: 'number'
        },
        "Sale_Order__c": {
          name: 'Sale_Order__c',
          type: 'string'
        },
        "Sales_Order_Amount__c": {
          name: 'Sales_Order_Amount__c',
          type: 'number'
        },
        "Timesheet_Month__c": {
          name: 'Timesheet_Month__c',
          type: 'string'
        },
        "Timesheet_Year__c": {
          name: 'Timesheet_Year__c',
          type: 'string'
        },
        "Timecard_Received_Final__c": {
          name: 'Timecard_Received_Final__c',
          type: 'string'
        },
        "Timecard_Timesheet__c": {
          name: 'Timecard_Timesheet__c',
          type: 'string'
        },
        "Total_Hours_Invoiced__c": {
          name: 'Total_Hours_Invoiced__c',
          type: 'number'
        },
        "Total_Paid__c": {
          name: 'Total_Paid__c',
          type: 'number'
        },
        "Total_Un_Invoiced_Amount__c": {
          name: 'Total_Un_Invoiced_Amount__c',
          type: 'number'
        },
        "Total_Visit_Hours__c": {
          name: 'Total_Visit_Hours__c',
          type: 'number'
        },
        "Vendor_Timecard_Actual_In__c": {
          name: 'Vendor_Timecard_Actual_In__c',
          type: 'string'
        },
        "Vendor_Timecard_Actual_Out__c": {
          name: 'Vendor_Timecard_Actual_Out__c',
          type: 'string'
        },
        "Vendor_Purchase_Receipt_Number__c": {
          name: 'Vendor_Purchase_Receipt_Number__c',
          type: 'string'
        },
        "Vendor_Time_Card_Notes_Tasks_Performed__c": {
          name: 'Vendor_Time_Card_Notes_Tasks_Performed__c',
          type: 'string'
        },
        "Vendor_Time_Card_Observation_Suggestion__c": {
          name: 'Vendor_Time_Card_Observation_Suggestion__c',
          type: 'string'
        },
        "Vendor_Timecard_Cust_Site_Sign_off_Name__c": {
          name: 'Vendor_Timecard_Cust_Site_Sign_off_Name__c',
          type: 'string'
        },
        "Sales_Order_Number__c": {
          name: 'Sales_Order_Number__c',
          type: 'string'
        },
        "Sales_Order_Start_Date__c": {
          name: 'Sales_Order_Start_Date__c',
          type: 'Date'
        },
        "Count_of_Order_Items__c": {
          name: 'Count_of_Order_Items__c',
          type: 'number'
        },
        "SO_PPE_Hours__c": {
          name: 'SO_PPE_Hours__c',
          type: 'number'
        },
        "Vendor_Time_Card_Total_Hours_All_Visits__c": {
          name: 'Vendor_Time_Card_Total_Hours_All_Visits__c',
          type: 'number'
        },
        "Roll_up_helpdesk_Price__c": {
          name: 'Roll_up_helpdesk_Price__c',
          type: 'number'
        },
        "Sales_Order_End_Date__c": {
          name: 'Sales_Order_End_Date__c',
          type: 'Date'
        },
        "SO_Already_Invoiced_Hours__c": {
          name: 'SO_Already_Invoiced_Hours__c',
          type: 'number'
        },
        "Job_Status__c": {
          name: 'Job_Status__c',
          type: 'string'
        },
        "SO_Already_Invoiced_Amount__c": {
          name: 'SO_Already_Invoiced_Amount__c',
          type: 'number'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "Vendor_Timecard_Details_Roll_up_Auto__c": {
          name: 'Vendor_Timecard_Details_Roll_up_Auto__c',
          type: 'string'
        },
        "RecordTypeId": {
          name: 'RecordTypeId',
          type: 'string'
        },
        "Roll_up_VAT_Tax__c": {
          name: 'Roll_up_VAT_Tax__c',
          type: 'number'
        },
        "Vendor_Timecard_Details_Roll_up__c": {
          name: 'Vendor_Timecard_Details_Roll_up__c',
          type: 'string'
        },
        "Last_Approved_Timecard_Amount__c": {
          name: 'Last_Approved_Timecard_Amount__c',
          type: 'number'
        },
        "SO_Last_Approved_Timecard_Hours_Std__c": {
          name: 'SO_Last_Approved_Timecard_Hours_Std__c',
          type: 'number'
        },
        "SO_Last_Approved_Timecard_Hours_OT__c": {
          name: 'SO_Last_Approved_Timecard_Hours_OT__c',
          type: 'number'
        },
        "SO_Last_Approved_Timecard_Hours_Weekend__c": {
          name: 'SO_Last_Approved_Timecard_Hours_Weekend__c',
          type: 'number'
        },
        "SO_Roll_up_Unit_Rate__c": {
          name: 'SO_Roll_up_Unit_Rate__c',
          type: 'number'
        },
        "Worker_on_the_Job__c": {
          name: 'Worker_on_the_Job__c',
          type: 'string'
        },
        "Iron_PMS_Case_Number__c": {
          name: 'Iron_PMS_Case_Number__c',
          type: 'string'
        },
        "Partner_Case_Number__c": {
          name: 'Partner_Case_Number__c',
          type: 'string'
        },
        "Jobsite_Name__c": {
          name: 'Jobsite_Name__c',
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
                  keyFrom: 'Account__c',
          keyTo: 'sfdcId'
        },
        timecard: {
          name: 'timecard',
          type: 'Timecard',
          model: 'Timecard',
          relationType: 'belongsTo',
                  keyFrom: 'Timecard_Timesheet__c',
          keyTo: 'sfdcId'
        },
        payments: {
          name: 'payments',
          type: 'Payment[]',
          model: 'Payment',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'Invoice__c'
        },
        purchaseOrder: {
          name: 'purchaseOrder',
          type: 'PurchaseOrder',
          model: 'PurchaseOrder',
          relationType: 'belongsTo',
                  keyFrom: 'Purchase_Order__c',
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
        saleOrder: {
          name: 'saleOrder',
          type: 'Order',
          model: 'Order',
          relationType: 'belongsTo',
                  keyFrom: 'Sale_Order__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
