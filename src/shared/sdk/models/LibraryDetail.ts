/* tslint:disable */
import {
  Group,
  LibraryHeader
} from '../index';

declare var Object: any;
export interface LibraryDetailInterface {
  "sfdcId": string;
  "Name"?: string;
  "OwnerId"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "Membership__c"?: string;
  "PgMO_Groups__c"?: string;
  "PgMO_Library_Header__c"?: string;
  "Type_of_Record__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  group?: Group;
  libraryHeader?: LibraryHeader;
}

export class LibraryDetail implements LibraryDetailInterface {
  "sfdcId": string;
  "Name": string;
  "OwnerId": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "Membership__c": string;
  "PgMO_Groups__c": string;
  "PgMO_Library_Header__c": string;
  "Type_of_Record__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  group: Group;
  libraryHeader: LibraryHeader;
  constructor(data?: LibraryDetailInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `LibraryDetail`.
   */
  public static getModelName() {
    return "LibraryDetail";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of LibraryDetail for dynamic purposes.
  **/
  public static factory(data: LibraryDetailInterface): LibraryDetail{
    return new LibraryDetail(data);
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
      name: 'LibraryDetail',
      plural: 'LibraryDetails',
      path: 'LibraryDetails',
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
        "Membership__c": {
          name: 'Membership__c',
          type: 'string'
        },
        "PgMO_Groups__c": {
          name: 'PgMO_Groups__c',
          type: 'string'
        },
        "PgMO_Library_Header__c": {
          name: 'PgMO_Library_Header__c',
          type: 'string'
        },
        "Type_of_Record__c": {
          name: 'Type_of_Record__c',
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
        group: {
          name: 'group',
          type: 'Group',
          model: 'Group',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Groups__c',
          keyTo: 'sfdcId'
        },
        libraryHeader: {
          name: 'libraryHeader',
          type: 'LibraryHeader',
          model: 'LibraryHeader',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Library_Header__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
