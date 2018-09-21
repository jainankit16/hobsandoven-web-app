/* tslint:disable */
import {
  Pricelist,
  Product
} from '../index';

declare var Object: any;
export interface PricelistItemInterface {
  "sfdcId"?: string;
  "X4HR_Service_Area__c"?: string;
  "Additional_Countries_of_Origin__c"?: string;
  "Additional_Hours_T_M_Standard_Cost__c"?: number;
  "Additional_Hours_T_M_Standard_Price__c"?: number;
  "City__c"?: string;
  "City_Zone__c"?: string;
  "Country__c"?: string;
  "Country_Zone__c"?: string;
  "FTE_Daily_Rate_Holiday__c"?: number;
  "FTE_Daily_Rate_Overtime__c"?: number;
  "FTE_Daily_Rate_Standard__c"?: number;
  "Helpdesk_Dispatch_Fee__c"?: number;
  "HMS_Daily_Price__c"?: number;
  "Iron_Discount__c"?: number;
  "Item_Value_Defective__c"?: number;
  "Item_Value_Refurbished__c"?: number;
  "Item_Value_Used__c"?: number;
  "Item_Value_New_Sale_value_Not_std__c"?: number;
  "NBD_Service_Area__c"?: string;
  "PPE_1HR_Standard_Cost__c"?: number;
  "PPE_1HR_Standard_Price__c"?: number;
  "PPE_2HR_Standard_Cost__c"?: number;
  "PPE_2HR_Standard_Price__c"?: number;
  "PPE_3HR_Standard_Cost__c"?: number;
  "PPE_3HR_Standard_Price__c"?: number;
  "PPE_4HR_Standard_Cost__c"?: number;
  "PPE_4HR_Standard_Price__c"?: number;
  "PPE_8HR_Standard_Cost__c"?: number;
  "PPE_8HR_Standard_Price__c"?: number;
  "Province__c"?: string;
  "Service_Description__c"?: string;
  "Service_ID__c"?: string;
  "TAX_Inclusive__c"?: boolean;
  "Agency_Cost__c"?: number;
  "Zip__c"?: string;
  "IsActive"?: boolean;
  "CreatedBy"?: string;
  "CurrencyIsoCode"?: string;
  "LastModifiedBy"?: string;
  "UnitPrice"?: number;
  "Pricebook2Id"?: string;
  "Product2Id"?: string;
  "ProductCode"?: string;
  "StandardPrice"?: number;
  "UseStandardPrice"?: boolean;
  "createddate"?: Date;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  Pricelist?: Pricelist;
  Product?: Product;
}

export class PricelistItem implements PricelistItemInterface {
  "sfdcId": string;
  "X4HR_Service_Area__c": string;
  "Additional_Countries_of_Origin__c": string;
  "Additional_Hours_T_M_Standard_Cost__c": number;
  "Additional_Hours_T_M_Standard_Price__c": number;
  "City__c": string;
  "City_Zone__c": string;
  "Country__c": string;
  "Country_Zone__c": string;
  "FTE_Daily_Rate_Holiday__c": number;
  "FTE_Daily_Rate_Overtime__c": number;
  "FTE_Daily_Rate_Standard__c": number;
  "Helpdesk_Dispatch_Fee__c": number;
  "HMS_Daily_Price__c": number;
  "Iron_Discount__c": number;
  "Item_Value_Defective__c": number;
  "Item_Value_Refurbished__c": number;
  "Item_Value_Used__c": number;
  "Item_Value_New_Sale_value_Not_std__c": number;
  "NBD_Service_Area__c": string;
  "PPE_1HR_Standard_Cost__c": number;
  "PPE_1HR_Standard_Price__c": number;
  "PPE_2HR_Standard_Cost__c": number;
  "PPE_2HR_Standard_Price__c": number;
  "PPE_3HR_Standard_Cost__c": number;
  "PPE_3HR_Standard_Price__c": number;
  "PPE_4HR_Standard_Cost__c": number;
  "PPE_4HR_Standard_Price__c": number;
  "PPE_8HR_Standard_Cost__c": number;
  "PPE_8HR_Standard_Price__c": number;
  "Province__c": string;
  "Service_Description__c": string;
  "Service_ID__c": string;
  "TAX_Inclusive__c": boolean;
  "Agency_Cost__c": number;
  "Zip__c": string;
  "IsActive": boolean;
  "CreatedBy": string;
  "CurrencyIsoCode": string;
  "LastModifiedBy": string;
  "UnitPrice": number;
  "Pricebook2Id": string;
  "Product2Id": string;
  "ProductCode": string;
  "StandardPrice": number;
  "UseStandardPrice": boolean;
  "createddate": Date;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  Pricelist: Pricelist;
  Product: Product;
  constructor(data?: PricelistItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PricelistItem`.
   */
  public static getModelName() {
    return "PricelistItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PricelistItem for dynamic purposes.
  **/
  public static factory(data: PricelistItemInterface): PricelistItem{
    return new PricelistItem(data);
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
      name: 'PricelistItem',
      plural: 'PricelistItems',
      path: 'PricelistItems',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "X4HR_Service_Area__c": {
          name: 'X4HR_Service_Area__c',
          type: 'string'
        },
        "Additional_Countries_of_Origin__c": {
          name: 'Additional_Countries_of_Origin__c',
          type: 'string'
        },
        "Additional_Hours_T_M_Standard_Cost__c": {
          name: 'Additional_Hours_T_M_Standard_Cost__c',
          type: 'number'
        },
        "Additional_Hours_T_M_Standard_Price__c": {
          name: 'Additional_Hours_T_M_Standard_Price__c',
          type: 'number'
        },
        "City__c": {
          name: 'City__c',
          type: 'string'
        },
        "City_Zone__c": {
          name: 'City_Zone__c',
          type: 'string'
        },
        "Country__c": {
          name: 'Country__c',
          type: 'string'
        },
        "Country_Zone__c": {
          name: 'Country_Zone__c',
          type: 'string'
        },
        "FTE_Daily_Rate_Holiday__c": {
          name: 'FTE_Daily_Rate_Holiday__c',
          type: 'number'
        },
        "FTE_Daily_Rate_Overtime__c": {
          name: 'FTE_Daily_Rate_Overtime__c',
          type: 'number'
        },
        "FTE_Daily_Rate_Standard__c": {
          name: 'FTE_Daily_Rate_Standard__c',
          type: 'number'
        },
        "Helpdesk_Dispatch_Fee__c": {
          name: 'Helpdesk_Dispatch_Fee__c',
          type: 'number'
        },
        "HMS_Daily_Price__c": {
          name: 'HMS_Daily_Price__c',
          type: 'number'
        },
        "Iron_Discount__c": {
          name: 'Iron_Discount__c',
          type: 'number'
        },
        "Item_Value_Defective__c": {
          name: 'Item_Value_Defective__c',
          type: 'number'
        },
        "Item_Value_Refurbished__c": {
          name: 'Item_Value_Refurbished__c',
          type: 'number'
        },
        "Item_Value_Used__c": {
          name: 'Item_Value_Used__c',
          type: 'number'
        },
        "Item_Value_New_Sale_value_Not_std__c": {
          name: 'Item_Value_New_Sale_value_Not_std__c',
          type: 'number'
        },
        "NBD_Service_Area__c": {
          name: 'NBD_Service_Area__c',
          type: 'string'
        },
        "PPE_1HR_Standard_Cost__c": {
          name: 'PPE_1HR_Standard_Cost__c',
          type: 'number'
        },
        "PPE_1HR_Standard_Price__c": {
          name: 'PPE_1HR_Standard_Price__c',
          type: 'number'
        },
        "PPE_2HR_Standard_Cost__c": {
          name: 'PPE_2HR_Standard_Cost__c',
          type: 'number'
        },
        "PPE_2HR_Standard_Price__c": {
          name: 'PPE_2HR_Standard_Price__c',
          type: 'number'
        },
        "PPE_3HR_Standard_Cost__c": {
          name: 'PPE_3HR_Standard_Cost__c',
          type: 'number'
        },
        "PPE_3HR_Standard_Price__c": {
          name: 'PPE_3HR_Standard_Price__c',
          type: 'number'
        },
        "PPE_4HR_Standard_Cost__c": {
          name: 'PPE_4HR_Standard_Cost__c',
          type: 'number'
        },
        "PPE_4HR_Standard_Price__c": {
          name: 'PPE_4HR_Standard_Price__c',
          type: 'number'
        },
        "PPE_8HR_Standard_Cost__c": {
          name: 'PPE_8HR_Standard_Cost__c',
          type: 'number'
        },
        "PPE_8HR_Standard_Price__c": {
          name: 'PPE_8HR_Standard_Price__c',
          type: 'number'
        },
        "Province__c": {
          name: 'Province__c',
          type: 'string'
        },
        "Service_Description__c": {
          name: 'Service_Description__c',
          type: 'string'
        },
        "Service_ID__c": {
          name: 'Service_ID__c',
          type: 'string'
        },
        "TAX_Inclusive__c": {
          name: 'TAX_Inclusive__c',
          type: 'boolean'
        },
        "Agency_Cost__c": {
          name: 'Agency_Cost__c',
          type: 'number'
        },
        "Zip__c": {
          name: 'Zip__c',
          type: 'string'
        },
        "IsActive": {
          name: 'IsActive',
          type: 'boolean'
        },
        "CreatedBy": {
          name: 'CreatedBy',
          type: 'string'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
          type: 'string'
        },
        "LastModifiedBy": {
          name: 'LastModifiedBy',
          type: 'string'
        },
        "UnitPrice": {
          name: 'UnitPrice',
          type: 'number'
        },
        "Pricebook2Id": {
          name: 'Pricebook2Id',
          type: 'string'
        },
        "Product2Id": {
          name: 'Product2Id',
          type: 'string'
        },
        "ProductCode": {
          name: 'ProductCode',
          type: 'string'
        },
        "StandardPrice": {
          name: 'StandardPrice',
          type: 'number'
        },
        "UseStandardPrice": {
          name: 'UseStandardPrice',
          type: 'boolean'
        },
        "createddate": {
          name: 'createddate',
          type: 'Date'
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
        Pricelist: {
          name: 'Pricelist',
          type: 'Pricelist',
          model: 'Pricelist',
          relationType: 'belongsTo',
                  keyFrom: 'Pricebook2Id',
          keyTo: 'sfdcId'
        },
        Product: {
          name: 'Product',
          type: 'Product',
          model: 'Product',
          relationType: 'belongsTo',
                  keyFrom: 'Product2Id',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
