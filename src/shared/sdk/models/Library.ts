/* tslint:disable */

declare var Object: any;
export interface LibraryInterface {
  "sfdcId": string;
  "Name"?: string;
  "OwnerId"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "Description__c"?: string;
  "Project_Category__c"?: string;
  "Version__c"?: number;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Library implements LibraryInterface {
  "sfdcId": string;
  "Name": string;
  "OwnerId": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "Description__c": string;
  "Project_Category__c": string;
  "Version__c": number;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: LibraryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Library`.
   */
  public static getModelName() {
    return "Library";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Library for dynamic purposes.
  **/
  public static factory(data: LibraryInterface): Library{
    return new Library(data);
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
      name: 'Library',
      plural: 'Libraries',
      path: 'Libraries',
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
        "Description__c": {
          name: 'Description__c',
          type: 'string'
        },
        "Project_Category__c": {
          name: 'Project_Category__c',
          type: 'string'
        },
        "Version__c": {
          name: 'Version__c',
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
      }
    }
  }
}
