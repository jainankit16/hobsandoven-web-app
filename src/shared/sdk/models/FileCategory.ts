/* tslint:disable */

declare var Object: any;
export interface FileCategoryInterface {
  "sfdcId": string;
  "Name"?: string;
  "OwnerId"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "Community__c"?: string;
  "Category__c"?: string;
  "Title__c"?: string;
  "Active__c"?: boolean;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class FileCategory implements FileCategoryInterface {
  "sfdcId": string;
  "Name": string;
  "OwnerId": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "Community__c": string;
  "Category__c": string;
  "Title__c": string;
  "Active__c": boolean;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: FileCategoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FileCategory`.
   */
  public static getModelName() {
    return "FileCategory";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FileCategory for dynamic purposes.
  **/
  public static factory(data: FileCategoryInterface): FileCategory{
    return new FileCategory(data);
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
      name: 'FileCategory',
      plural: 'FileCategories',
      path: 'FileCategories',
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
        "OwnerId": {
          name: 'OwnerId',
          type: 'string'
        },
        "LastModifiedById": {
          name: 'LastModifiedById',
          type: 'string'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
          type: 'string'
        },
        "CreatedById": {
          name: 'CreatedById',
          type: 'string'
        },
        "Community__c": {
          name: 'Community__c',
          type: 'string'
        },
        "Category__c": {
          name: 'Category__c',
          type: 'string'
        },
        "Title__c": {
          name: 'Title__c',
          type: 'string'
        },
        "Active__c": {
          name: 'Active__c',
          type: 'boolean'
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
      }
    }
  }
}
