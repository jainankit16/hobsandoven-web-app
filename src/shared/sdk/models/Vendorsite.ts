/* tslint:disable */
import {
  Account,
  GeoMetro,
  GeoPoint
} from '../index';

declare var Object: any;
export interface VendorsiteInterface {
  "sfdcId"?: string;
  "Vendor__c"?: string;
  "City__c"?: string;
  "Contact_Email__c"?: string;
  "Contact_Phone__c"?: string;
  "Country__c"?: string;
  "CreatedById"?: string;
  "GEO_Metro__c"?: string;
  "Vendorsite_ID__c"?: string;
  "Vendorsite_Key_Contact__c"?: string;
  "LastModifiedById"?: string;
  "Name"?: string;
  "State__c"?: string;
  "Street__c"?: string;
  "Zip_Postal_Code__c"?: string;
  "Vendorsite_Email_Iron__c"?: string;
  "Primary__c"?: boolean;
  "geolocation__c"?: GeoPoint;
  "geolocation__Latitude__s"?: number;
  "geolocation__Longitude__s"?: number;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  Account?: Account;
  GeoMetro?: GeoMetro;
}

export class Vendorsite implements VendorsiteInterface {
  "sfdcId": string;
  "Vendor__c": string;
  "City__c": string;
  "Contact_Email__c": string;
  "Contact_Phone__c": string;
  "Country__c": string;
  "CreatedById": string;
  "GEO_Metro__c": string;
  "Vendorsite_ID__c": string;
  "Vendorsite_Key_Contact__c": string;
  "LastModifiedById": string;
  "Name": string;
  "State__c": string;
  "Street__c": string;
  "Zip_Postal_Code__c": string;
  "Vendorsite_Email_Iron__c": string;
  "Primary__c": boolean;
  "geolocation__c": GeoPoint;
  "geolocation__Latitude__s": number;
  "geolocation__Longitude__s": number;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  Account: Account;
  GeoMetro: GeoMetro;
  constructor(data?: VendorsiteInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Vendorsite`.
   */
  public static getModelName() {
    return "Vendorsite";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Vendorsite for dynamic purposes.
  **/
  public static factory(data: VendorsiteInterface): Vendorsite{
    return new Vendorsite(data);
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
      name: 'Vendorsite',
      plural: 'Vendorsites',
      path: 'Vendorsites',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Vendor__c": {
          name: 'Vendor__c',
          type: 'string'
        },
        "City__c": {
          name: 'City__c',
          type: 'string'
        },
        "Contact_Email__c": {
          name: 'Contact_Email__c',
          type: 'string'
        },
        "Contact_Phone__c": {
          name: 'Contact_Phone__c',
          type: 'string'
        },
        "Country__c": {
          name: 'Country__c',
          type: 'string'
        },
        "CreatedById": {
          name: 'CreatedById',
          type: 'string'
        },
        "GEO_Metro__c": {
          name: 'GEO_Metro__c',
          type: 'string'
        },
        "Vendorsite_ID__c": {
          name: 'Vendorsite_ID__c',
          type: 'string'
        },
        "Vendorsite_Key_Contact__c": {
          name: 'Vendorsite_Key_Contact__c',
          type: 'string'
        },
        "LastModifiedById": {
          name: 'LastModifiedById',
          type: 'string'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "State__c": {
          name: 'State__c',
          type: 'string'
        },
        "Street__c": {
          name: 'Street__c',
          type: 'string'
        },
        "Zip_Postal_Code__c": {
          name: 'Zip_Postal_Code__c',
          type: 'string'
        },
        "Vendorsite_Email_Iron__c": {
          name: 'Vendorsite_Email_Iron__c',
          type: 'string'
        },
        "Primary__c": {
          name: 'Primary__c',
          type: 'boolean'
        },
        "geolocation__c": {
          name: 'geolocation__c',
          type: 'GeoPoint'
        },
        "geolocation__Latitude__s": {
          name: 'geolocation__Latitude__s',
          type: 'number'
        },
        "geolocation__Longitude__s": {
          name: 'geolocation__Longitude__s',
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
        Account: {
          name: 'Account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Vendor__c',
          keyTo: 'sfdcId'
        },
        GeoMetro: {
          name: 'GeoMetro',
          type: 'GeoMetro',
          model: 'GeoMetro',
          relationType: 'belongsTo',
                  keyFrom: 'GEO_Metro__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
