/* tslint:disable */
import {
  Account,
  TalentType,
  GeoMetro,
  RecordType
} from '../index';

declare var Object: any;
export interface MetroVirtualVendorPoolInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "Metro_Pool__c"?: string;
  "City__c"?: string;
  "State__c"?: string;
  "Country__c"?: string;
  "Postal_Zip_Code__c"?: number;
  "Service_Technical_Level__c"?: string;
  "SLA__c"?: string;
  "Vendor__c": string;
  "Street__c"?: string;
  "GEO_Metro__c"?: string;
  "Talent_Type__c"?: string;
  "Vendor_Rating__c"?: number;
  "SLA_Coverage_Radius_From_Postal_Code__c"?: string;
  "Vendor_Pool_Code__c"?: string;
  "GEO_Country_DNU__c"?: string;
  "Language__c"?: string;
  "Coverage_Hours__c"?: string;
  "RecordTypeId"?: string;
  "Geo_Location_Longitude__c"?: number;
  "Geo_Location_Latitude__c"?: number;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  account?: Account;
  TalentType?: TalentType;
  GeoMetro?: GeoMetro;
  RecordType?: RecordType;
}

export class MetroVirtualVendorPool implements MetroVirtualVendorPoolInterface {
  "sfdcId": string;
  "Name": string;
  "Metro_Pool__c": string;
  "City__c": string;
  "State__c": string;
  "Country__c": string;
  "Postal_Zip_Code__c": number;
  "Service_Technical_Level__c": string;
  "SLA__c": string;
  "Vendor__c": string;
  "Street__c": string;
  "GEO_Metro__c": string;
  "Talent_Type__c": string;
  "Vendor_Rating__c": number;
  "SLA_Coverage_Radius_From_Postal_Code__c": string;
  "Vendor_Pool_Code__c": string;
  "GEO_Country_DNU__c": string;
  "Language__c": string;
  "Coverage_Hours__c": string;
  "RecordTypeId": string;
  "Geo_Location_Longitude__c": number;
  "Geo_Location_Latitude__c": number;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  account: Account;
  TalentType: TalentType;
  GeoMetro: GeoMetro;
  RecordType: RecordType;
  constructor(data?: MetroVirtualVendorPoolInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MetroVirtualVendorPool`.
   */
  public static getModelName() {
    return "MetroVirtualVendorPool";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MetroVirtualVendorPool for dynamic purposes.
  **/
  public static factory(data: MetroVirtualVendorPoolInterface): MetroVirtualVendorPool{
    return new MetroVirtualVendorPool(data);
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
      name: 'MetroVirtualVendorPool',
      plural: 'MetroVirtualVendorPools',
      path: 'MetroVirtualVendorPools',
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
        "Metro_Pool__c": {
          name: 'Metro_Pool__c',
          type: 'string'
        },
        "City__c": {
          name: 'City__c',
          type: 'string'
        },
        "State__c": {
          name: 'State__c',
          type: 'string'
        },
        "Country__c": {
          name: 'Country__c',
          type: 'string'
        },
        "Postal_Zip_Code__c": {
          name: 'Postal_Zip_Code__c',
          type: 'number'
        },
        "Service_Technical_Level__c": {
          name: 'Service_Technical_Level__c',
          type: 'string'
        },
        "SLA__c": {
          name: 'SLA__c',
          type: 'string'
        },
        "Vendor__c": {
          name: 'Vendor__c',
          type: 'string'
        },
        "Street__c": {
          name: 'Street__c',
          type: 'string'
        },
        "GEO_Metro__c": {
          name: 'GEO_Metro__c',
          type: 'string'
        },
        "Talent_Type__c": {
          name: 'Talent_Type__c',
          type: 'string'
        },
        "Vendor_Rating__c": {
          name: 'Vendor_Rating__c',
          type: 'number'
        },
        "SLA_Coverage_Radius_From_Postal_Code__c": {
          name: 'SLA_Coverage_Radius_From_Postal_Code__c',
          type: 'string'
        },
        "Vendor_Pool_Code__c": {
          name: 'Vendor_Pool_Code__c',
          type: 'string'
        },
        "GEO_Country_DNU__c": {
          name: 'GEO_Country_DNU__c',
          type: 'string'
        },
        "Language__c": {
          name: 'Language__c',
          type: 'string'
        },
        "Coverage_Hours__c": {
          name: 'Coverage_Hours__c',
          type: 'string'
        },
        "RecordTypeId": {
          name: 'RecordTypeId',
          type: 'string'
        },
        "Geo_Location_Longitude__c": {
          name: 'Geo_Location_Longitude__c',
          type: 'number'
        },
        "Geo_Location_Latitude__c": {
          name: 'Geo_Location_Latitude__c',
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
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Vendor__c',
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
        GeoMetro: {
          name: 'GeoMetro',
          type: 'GeoMetro',
          model: 'GeoMetro',
          relationType: 'belongsTo',
                  keyFrom: 'GEO_Metro__c',
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
