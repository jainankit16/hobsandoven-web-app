/* tslint:disable */
import {
  PricelistItem,
  Product
} from '../index';

declare var Object: any;
export interface PricelistInterface {
  "sfdcId"?: string;
  "CreatedDate"?: Date;
  "IsActive"?: boolean;
  "Description"?: string;
  "IsStandard"?: boolean;
  "Name"?: string;
  "Type__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "Product2Id"?: string;
  PricelistItems?: PricelistItem[];
  Product?: Product;
}

export class Pricelist implements PricelistInterface {
  "sfdcId": string;
  "CreatedDate": Date;
  "IsActive": boolean;
  "Description": string;
  "IsStandard": boolean;
  "Name": string;
  "Type__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "Product2Id": string;
  PricelistItems: PricelistItem[];
  Product: Product;
  constructor(data?: PricelistInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Pricelist`.
   */
  public static getModelName() {
    return "Pricelist";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Pricelist for dynamic purposes.
  **/
  public static factory(data: PricelistInterface): Pricelist{
    return new Pricelist(data);
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
      name: 'Pricelist',
      plural: 'Pricelists',
      path: 'Pricelists',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "IsActive": {
          name: 'IsActive',
          type: 'boolean'
        },
        "Description": {
          name: 'Description',
          type: 'string'
        },
        "IsStandard": {
          name: 'IsStandard',
          type: 'boolean'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Type__c": {
          name: 'Type__c',
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
        "Product2Id": {
          name: 'Product2Id',
          type: 'string'
        },
      },
      relations: {
        PricelistItems: {
          name: 'PricelistItems',
          type: 'PricelistItem[]',
          model: 'PricelistItem',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'Pricebook2Id'
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
