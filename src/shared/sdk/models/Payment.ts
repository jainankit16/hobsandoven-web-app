/* tslint:disable */
import {
  Invoice,
  PurchaseOrder
} from '../index';

declare var Object: any;
export interface PaymentInterface {
  "sfdcId": string;
  "Amount__c"?: number;
  "CurrencyIsoCode"?: string;
  "Invoice__c"?: string;
  "Method_of_Payment__c"?: string;
  "Payment_Date__c"?: Date;
  "Payment_Status__c"?: string;
  "Promissory_Note_Number__c"?: string;
  "Remittance_Number__c"?: string;
  "Sales_Order__c"?: string;
  "CreatedById"?: string;
  "CreatedDate"?: Date;
  "Name"?: string;
  "LastModifiedById"?: string;
  "LastModifiedDate"?: Date;
  "Purchase_Order__c"?: string;
  "Vendor_Purchase_Receipt_Number__c"?: string;
  "id"?: number;
  invoice?: Invoice;
  purchaseOrder?: PurchaseOrder;
}

export class Payment implements PaymentInterface {
  "sfdcId": string;
  "Amount__c": number;
  "CurrencyIsoCode": string;
  "Invoice__c": string;
  "Method_of_Payment__c": string;
  "Payment_Date__c": Date;
  "Payment_Status__c": string;
  "Promissory_Note_Number__c": string;
  "Remittance_Number__c": string;
  "Sales_Order__c": string;
  "CreatedById": string;
  "CreatedDate": Date;
  "Name": string;
  "LastModifiedById": string;
  "LastModifiedDate": Date;
  "Purchase_Order__c": string;
  "Vendor_Purchase_Receipt_Number__c": string;
  "id": number;
  invoice: Invoice;
  purchaseOrder: PurchaseOrder;
  constructor(data?: PaymentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Payment`.
   */
  public static getModelName() {
    return "Payment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Payment for dynamic purposes.
  **/
  public static factory(data: PaymentInterface): Payment{
    return new Payment(data);
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
      name: 'Payment',
      plural: 'Payments',
      path: 'Payments',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Amount__c": {
          name: 'Amount__c',
          type: 'number'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
          type: 'string'
        },
        "Invoice__c": {
          name: 'Invoice__c',
          type: 'string'
        },
        "Method_of_Payment__c": {
          name: 'Method_of_Payment__c',
          type: 'string'
        },
        "Payment_Date__c": {
          name: 'Payment_Date__c',
          type: 'Date'
        },
        "Payment_Status__c": {
          name: 'Payment_Status__c',
          type: 'string'
        },
        "Promissory_Note_Number__c": {
          name: 'Promissory_Note_Number__c',
          type: 'string'
        },
        "Remittance_Number__c": {
          name: 'Remittance_Number__c',
          type: 'string'
        },
        "Sales_Order__c": {
          name: 'Sales_Order__c',
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
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "LastModifiedById": {
          name: 'LastModifiedById',
          type: 'string'
        },
        "LastModifiedDate": {
          name: 'LastModifiedDate',
          type: 'Date'
        },
        "Purchase_Order__c": {
          name: 'Purchase_Order__c',
          type: 'string'
        },
        "Vendor_Purchase_Receipt_Number__c": {
          name: 'Vendor_Purchase_Receipt_Number__c',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        invoice: {
          name: 'invoice',
          type: 'Invoice',
          model: 'Invoice',
          relationType: 'belongsTo',
                  keyFrom: 'Invoice__c',
          keyTo: 'sfdcId'
        },
        purchaseOrder: {
          name: 'purchaseOrder',
          type: 'PurchaseOrder',
          model: 'PurchaseOrder',
          relationType: 'belongsTo',
                  keyFrom: 'Purchase_Order__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
