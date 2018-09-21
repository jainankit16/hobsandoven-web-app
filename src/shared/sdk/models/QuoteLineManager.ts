/* tslint:disable */
import {
  TalentType,
  Product,
  Jobsite,
  GeoMetro,
  Account,
  QuoteManager,
  MetroVirtualVendorPool
} from '../index';

declare var Object: any;
export interface QuoteLineManagerInterface {
  "sfdcId"?: string;
  "Service_Type__c"?: string;
  "Talent_Type__c"?: string;
  "Service_Engineer_Technical_Level__c"?: string;
  "Dispatch_SLA_Priority__c"?: string;
  "CoverageHour__c"?: string;
  "Status__c"?: string;
  "Jobsite__c"?: string;
  "Order_Quantity__c"?: number;
  "Price__c"?: number;
  "Added_To_Cart__c"?: boolean;
  "Product__c"?: string;
  "List_Price_Customer__c"?: number;
  "Name"?: string;
  "QuoteManager__c"?: string;
  "Service_Zone__c"?: string;
  "Vendor_Account__c"?: string;
  "Vendor__c"?: string;
  "Vendor_Cost__c"?: number;
  "Profit_Price__c"?: number;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  TalentType?: TalentType;
  Product?: Product;
  Jobsite?: Jobsite;
  GeoMetro?: GeoMetro;
  Account?: Account;
  QuoteManager?: QuoteManager;
  MetroVirtualVendorPool?: MetroVirtualVendorPool;
}

export class QuoteLineManager implements QuoteLineManagerInterface {
  "sfdcId": string;
  "Service_Type__c": string;
  "Talent_Type__c": string;
  "Service_Engineer_Technical_Level__c": string;
  "Dispatch_SLA_Priority__c": string;
  "CoverageHour__c": string;
  "Status__c": string;
  "Jobsite__c": string;
  "Order_Quantity__c": number;
  "Price__c": number;
  "Added_To_Cart__c": boolean;
  "Product__c": string;
  "List_Price_Customer__c": number;
  "Name": string;
  "QuoteManager__c": string;
  "Service_Zone__c": string;
  "Vendor_Account__c": string;
  "Vendor__c": string;
  "Vendor_Cost__c": number;
  "Profit_Price__c": number;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  TalentType: TalentType;
  Product: Product;
  Jobsite: Jobsite;
  GeoMetro: GeoMetro;
  Account: Account;
  QuoteManager: QuoteManager;
  MetroVirtualVendorPool: MetroVirtualVendorPool;
  constructor(data?: QuoteLineManagerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `QuoteLineManager`.
   */
  public static getModelName() {
    return "QuoteLineManager";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of QuoteLineManager for dynamic purposes.
  **/
  public static factory(data: QuoteLineManagerInterface): QuoteLineManager{
    return new QuoteLineManager(data);
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
      name: 'QuoteLineManager',
      plural: 'QuoteLineManagers',
      path: 'QuoteLineManagers',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Service_Type__c": {
          name: 'Service_Type__c',
          type: 'string'
        },
        "Talent_Type__c": {
          name: 'Talent_Type__c',
          type: 'string'
        },
        "Service_Engineer_Technical_Level__c": {
          name: 'Service_Engineer_Technical_Level__c',
          type: 'string'
        },
        "Dispatch_SLA_Priority__c": {
          name: 'Dispatch_SLA_Priority__c',
          type: 'string'
        },
        "CoverageHour__c": {
          name: 'CoverageHour__c',
          type: 'string'
        },
        "Status__c": {
          name: 'Status__c',
          type: 'string'
        },
        "Jobsite__c": {
          name: 'Jobsite__c',
          type: 'string'
        },
        "Order_Quantity__c": {
          name: 'Order_Quantity__c',
          type: 'number'
        },
        "Price__c": {
          name: 'Price__c',
          type: 'number'
        },
        "Added_To_Cart__c": {
          name: 'Added_To_Cart__c',
          type: 'boolean'
        },
        "Product__c": {
          name: 'Product__c',
          type: 'string'
        },
        "List_Price_Customer__c": {
          name: 'List_Price_Customer__c',
          type: 'number'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "QuoteManager__c": {
          name: 'QuoteManager__c',
          type: 'string'
        },
        "Service_Zone__c": {
          name: 'Service_Zone__c',
          type: 'string'
        },
        "Vendor_Account__c": {
          name: 'Vendor_Account__c',
          type: 'string'
        },
        "Vendor__c": {
          name: 'Vendor__c',
          type: 'string'
        },
        "Vendor_Cost__c": {
          name: 'Vendor_Cost__c',
          type: 'number'
        },
        "Profit_Price__c": {
          name: 'Profit_Price__c',
          type: 'number'
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
        TalentType: {
          name: 'TalentType',
          type: 'TalentType',
          model: 'TalentType',
          relationType: 'belongsTo',
                  keyFrom: 'Talent_Type__c',
          keyTo: 'sfdcId'
        },
        Product: {
          name: 'Product',
          type: 'Product',
          model: 'Product',
          relationType: 'belongsTo',
                  keyFrom: 'Product__c',
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
        GeoMetro: {
          name: 'GeoMetro',
          type: 'GeoMetro',
          model: 'GeoMetro',
          relationType: 'belongsTo',
                  keyFrom: 'Service_Zone__c',
          keyTo: 'sfdcId'
        },
        Account: {
          name: 'Account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Vendor_Account__c',
          keyTo: 'sfdcId'
        },
        QuoteManager: {
          name: 'QuoteManager',
          type: 'QuoteManager',
          model: 'QuoteManager',
          relationType: 'belongsTo',
                  keyFrom: 'QuoteManager__c',
          keyTo: 'sfdcId'
        },
        MetroVirtualVendorPool: {
          name: 'MetroVirtualVendorPool',
          type: 'MetroVirtualVendorPool',
          model: 'MetroVirtualVendorPool',
          relationType: 'belongsTo',
                  keyFrom: 'Vendor__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
