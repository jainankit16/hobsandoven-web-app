/* tslint:disable */
import {
  Product,
  WorkOrder,
  TalentType,
  Account,
  PricelistItem,
  Jobsite,
  RecordType
} from '../index';

declare var Object: any;
export interface JobOrderItemInterface {
  "sfdcId"?: string;
  "Order_Quantity__c"?: number;
  "Total_Price_Customer_Pre_Tax_Auto__c"?: number;
  "SKU__c"?: string;
  "Job_Order__c"?: string;
  "Order_Quantity_FTE_Hours__c"?: number;
  "Talent_Type__c"?: string;
  "List_Price_Customer__c"?: number;
  "List_Price_Vendor__c"?: number;
  "Vendor__c"?: string;
  "Customer_Pricelist_Auto__c"?: string;
  "Vendor_Pricelist_Auto__c"?: string;
  "JobSite__c"?: string;
  "RecordTypeId"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  Product?: Product;
  WorkOrder?: WorkOrder;
  TalentType?: TalentType;
  vendor?: Account;
  CustomerPricelistItem?: PricelistItem;
  VendorPricelistItem?: PricelistItem;
  jobsite?: Jobsite;
  RecordType?: RecordType;
}

export class JobOrderItem implements JobOrderItemInterface {
  "sfdcId": string;
  "Order_Quantity__c": number;
  "Total_Price_Customer_Pre_Tax_Auto__c": number;
  "SKU__c": string;
  "Job_Order__c": string;
  "Order_Quantity_FTE_Hours__c": number;
  "Talent_Type__c": string;
  "List_Price_Customer__c": number;
  "List_Price_Vendor__c": number;
  "Vendor__c": string;
  "Customer_Pricelist_Auto__c": string;
  "Vendor_Pricelist_Auto__c": string;
  "JobSite__c": string;
  "RecordTypeId": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  Product: Product;
  WorkOrder: WorkOrder;
  TalentType: TalentType;
  vendor: Account;
  CustomerPricelistItem: PricelistItem;
  VendorPricelistItem: PricelistItem;
  jobsite: Jobsite;
  RecordType: RecordType;
  constructor(data?: JobOrderItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `JobOrderItem`.
   */
  public static getModelName() {
    return "JobOrderItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of JobOrderItem for dynamic purposes.
  **/
  public static factory(data: JobOrderItemInterface): JobOrderItem{
    return new JobOrderItem(data);
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
      name: 'JobOrderItem',
      plural: 'JobOrderItems',
      path: 'JobOrderItems',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Order_Quantity__c": {
          name: 'Order_Quantity__c',
          type: 'number'
        },
        "Total_Price_Customer_Pre_Tax_Auto__c": {
          name: 'Total_Price_Customer_Pre_Tax_Auto__c',
          type: 'number'
        },
        "SKU__c": {
          name: 'SKU__c',
          type: 'string'
        },
        "Job_Order__c": {
          name: 'Job_Order__c',
          type: 'string'
        },
        "Order_Quantity_FTE_Hours__c": {
          name: 'Order_Quantity_FTE_Hours__c',
          type: 'number'
        },
        "Talent_Type__c": {
          name: 'Talent_Type__c',
          type: 'string'
        },
        "List_Price_Customer__c": {
          name: 'List_Price_Customer__c',
          type: 'number'
        },
        "List_Price_Vendor__c": {
          name: 'List_Price_Vendor__c',
          type: 'number'
        },
        "Vendor__c": {
          name: 'Vendor__c',
          type: 'string'
        },
        "Customer_Pricelist_Auto__c": {
          name: 'Customer_Pricelist_Auto__c',
          type: 'string'
        },
        "Vendor_Pricelist_Auto__c": {
          name: 'Vendor_Pricelist_Auto__c',
          type: 'string'
        },
        "JobSite__c": {
          name: 'JobSite__c',
          type: 'string'
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
        Product: {
          name: 'Product',
          type: 'Product',
          model: 'Product',
          relationType: 'belongsTo',
                  keyFrom: 'SKU__c',
          keyTo: 'sfdcId'
        },
        WorkOrder: {
          name: 'WorkOrder',
          type: 'WorkOrder',
          model: 'WorkOrder',
          relationType: 'belongsTo',
                  keyFrom: 'Job_Order__c',
          keyTo: 'sfdcId'
        },
        TalentType: {
          name: 'TalentType',
          type: 'TalentType',
          model: 'TalentType',
          relationType: 'belongsTo',
                  keyFrom: 'Talent_Type__c',
          keyTo: 'sfdcId'
        },
        vendor: {
          name: 'vendor',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Vendor__c',
          keyTo: 'sfdcId'
        },
        CustomerPricelistItem: {
          name: 'CustomerPricelistItem',
          type: 'PricelistItem',
          model: 'PricelistItem',
          relationType: 'belongsTo',
                  keyFrom: 'Customer_Pricelist_Auto__c',
          keyTo: 'sfdcId'
        },
        VendorPricelistItem: {
          name: 'VendorPricelistItem',
          type: 'PricelistItem',
          model: 'PricelistItem',
          relationType: 'belongsTo',
                  keyFrom: 'Vendor_Pricelist_Auto__c',
          keyTo: 'sfdcId'
        },
        jobsite: {
          name: 'jobsite',
          type: 'Jobsite',
          model: 'Jobsite',
          relationType: 'belongsTo',
                  keyFrom: 'JobSite__c',
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
      }
    }
  }
}
