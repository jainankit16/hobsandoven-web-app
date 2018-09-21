/* tslint:disable */
import {
  WorkOrder
} from '../index';

declare var Object: any;
export interface PurchaseOrderItemInterface {
  "sfdcId"?: string;
  "Additional_Hours_T_M__c"?: number;
  "Additional_Hours_T_M_Price__c"?: number;
  "Available_SLAs__c"?: string;
  "Customer_Tier__c"?: string;
  "Discount__c"?: number;
  "Final_Total_Before_Discount_Tax__c"?: number;
  "FTE_Hours__c"?: number;
  "Grand_Total_for_Roll_up__c"?: number;
  "Admin_Price__c"?: number;
  "LineItemNumber"?: number;
  "List_Price__c"?: number;
  "PPE__c"?: string;
  "Iron_Price_List__c"?: string;
  "Product_Code__c"?: string;
  "ProductId__c"?: string;
  "Quantity_Parts__c"?: number;
  "Quantity_Service__c"?: number;
  "Refresh_Price__c"?: boolean;
  "Sku__c"?: string;
  "SLA__c"?: string;
  "Sub_Total_Auto__c"?: number;
  "Tier_Discount__c"?: string;
  "Tier_Discount_Calc__c"?: number;
  "Total_Price_Auto__c"?: number;
  "VAT_GST_percent__c"?: number;
  "VAT_GST__c"?: string;
  "VAT_Tax__c"?: number;
  "VAT__c"?: number;
  "X3PS_Agency__c"?: string;
  "WorkOrder"?: string;
  "Work_Order_Type__c"?: string;
  "id"?: number;
  workorder?: WorkOrder;
}

export class PurchaseOrderItem implements PurchaseOrderItemInterface {
  "sfdcId": string;
  "Additional_Hours_T_M__c": number;
  "Additional_Hours_T_M_Price__c": number;
  "Available_SLAs__c": string;
  "Customer_Tier__c": string;
  "Discount__c": number;
  "Final_Total_Before_Discount_Tax__c": number;
  "FTE_Hours__c": number;
  "Grand_Total_for_Roll_up__c": number;
  "Admin_Price__c": number;
  "LineItemNumber": number;
  "List_Price__c": number;
  "PPE__c": string;
  "Iron_Price_List__c": string;
  "Product_Code__c": string;
  "ProductId__c": string;
  "Quantity_Parts__c": number;
  "Quantity_Service__c": number;
  "Refresh_Price__c": boolean;
  "Sku__c": string;
  "SLA__c": string;
  "Sub_Total_Auto__c": number;
  "Tier_Discount__c": string;
  "Tier_Discount_Calc__c": number;
  "Total_Price_Auto__c": number;
  "VAT_GST_percent__c": number;
  "VAT_GST__c": string;
  "VAT_Tax__c": number;
  "VAT__c": number;
  "X3PS_Agency__c": string;
  "WorkOrder": string;
  "Work_Order_Type__c": string;
  "id": number;
  workorder: WorkOrder;
  constructor(data?: PurchaseOrderItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PurchaseOrderItem`.
   */
  public static getModelName() {
    return "PurchaseOrderItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PurchaseOrderItem for dynamic purposes.
  **/
  public static factory(data: PurchaseOrderItemInterface): PurchaseOrderItem{
    return new PurchaseOrderItem(data);
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
      name: 'PurchaseOrderItem',
      plural: 'PurchaseOrderItems',
      path: 'PurchaseOrderItems',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Additional_Hours_T_M__c": {
          name: 'Additional_Hours_T_M__c',
          type: 'number'
        },
        "Additional_Hours_T_M_Price__c": {
          name: 'Additional_Hours_T_M_Price__c',
          type: 'number'
        },
        "Available_SLAs__c": {
          name: 'Available_SLAs__c',
          type: 'string'
        },
        "Customer_Tier__c": {
          name: 'Customer_Tier__c',
          type: 'string'
        },
        "Discount__c": {
          name: 'Discount__c',
          type: 'number'
        },
        "Final_Total_Before_Discount_Tax__c": {
          name: 'Final_Total_Before_Discount_Tax__c',
          type: 'number'
        },
        "FTE_Hours__c": {
          name: 'FTE_Hours__c',
          type: 'number'
        },
        "Grand_Total_for_Roll_up__c": {
          name: 'Grand_Total_for_Roll_up__c',
          type: 'number'
        },
        "Admin_Price__c": {
          name: 'Admin_Price__c',
          type: 'number'
        },
        "LineItemNumber": {
          name: 'LineItemNumber',
          type: 'number'
        },
        "List_Price__c": {
          name: 'List_Price__c',
          type: 'number'
        },
        "PPE__c": {
          name: 'PPE__c',
          type: 'string'
        },
        "Iron_Price_List__c": {
          name: 'Iron_Price_List__c',
          type: 'string'
        },
        "Product_Code__c": {
          name: 'Product_Code__c',
          type: 'string'
        },
        "ProductId__c": {
          name: 'ProductId__c',
          type: 'string'
        },
        "Quantity_Parts__c": {
          name: 'Quantity_Parts__c',
          type: 'number'
        },
        "Quantity_Service__c": {
          name: 'Quantity_Service__c',
          type: 'number'
        },
        "Refresh_Price__c": {
          name: 'Refresh_Price__c',
          type: 'boolean'
        },
        "Sku__c": {
          name: 'Sku__c',
          type: 'string'
        },
        "SLA__c": {
          name: 'SLA__c',
          type: 'string'
        },
        "Sub_Total_Auto__c": {
          name: 'Sub_Total_Auto__c',
          type: 'number'
        },
        "Tier_Discount__c": {
          name: 'Tier_Discount__c',
          type: 'string'
        },
        "Tier_Discount_Calc__c": {
          name: 'Tier_Discount_Calc__c',
          type: 'number'
        },
        "Total_Price_Auto__c": {
          name: 'Total_Price_Auto__c',
          type: 'number'
        },
        "VAT_GST_percent__c": {
          name: 'VAT_GST_percent__c',
          type: 'number'
        },
        "VAT_GST__c": {
          name: 'VAT_GST__c',
          type: 'string'
        },
        "VAT_Tax__c": {
          name: 'VAT_Tax__c',
          type: 'number'
        },
        "VAT__c": {
          name: 'VAT__c',
          type: 'number'
        },
        "X3PS_Agency__c": {
          name: 'X3PS_Agency__c',
          type: 'string'
        },
        "WorkOrder": {
          name: 'WorkOrder',
          type: 'string'
        },
        "Work_Order_Type__c": {
          name: 'Work_Order_Type__c',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        workorder: {
          name: 'workorder',
          type: 'WorkOrder',
          model: 'WorkOrder',
          relationType: 'belongsTo',
                  keyFrom: 'WorkOrder',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
