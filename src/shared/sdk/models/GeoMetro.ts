/* tslint:disable */
import {
  CountryCode,
  MetroVirtualVendorPool,
  GeoPoint
} from '../index';

declare var Object: any;
export interface GeoMetroInterface {
  "sfdcId"?: string;
  "City__c": string;
  "Country__c"?: string;
  "Country_Code__c"?: string;
  "GEO_Country__c"?: string;
  "GEO_Description__c"?: string;
  "Region__c"?: string;
  "Postal_Zip_Code__c"?: string;
  "State_Province__c"?: string;
  "Street__c"?: string;
  "Name"?: string;
  "Geo_Location__c"?: GeoPoint;
  "Geo_Location__Longitude__s"?: number;
  "Geo_Location__Latitude__s"?: number;
  "GEO_Metro_Hyphen__c"?: string;
  "Name_of_State_Province__c"?: string;
  "VMS_Enabled__c"?: boolean;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  countrycode?: CountryCode;
  metrovirtualpools?: MetroVirtualVendorPool[];
}

export class GeoMetro implements GeoMetroInterface {
  "sfdcId": string;
  "City__c": string;
  "Country__c": string;
  "Country_Code__c": string;
  "GEO_Country__c": string;
  "GEO_Description__c": string;
  "Region__c": string;
  "Postal_Zip_Code__c": string;
  "State_Province__c": string;
  "Street__c": string;
  "Name": string;
  "Geo_Location__c": GeoPoint;
  "Geo_Location__Longitude__s": number;
  "Geo_Location__Latitude__s": number;
  "GEO_Metro_Hyphen__c": string;
  "Name_of_State_Province__c": string;
  "VMS_Enabled__c": boolean;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  countrycode: CountryCode;
  metrovirtualpools: MetroVirtualVendorPool[];
  constructor(data?: GeoMetroInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `GeoMetro`.
   */
  public static getModelName() {
    return "GeoMetro";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of GeoMetro for dynamic purposes.
  **/
  public static factory(data: GeoMetroInterface): GeoMetro{
    return new GeoMetro(data);
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
      name: 'GeoMetro',
      plural: 'GeoMetros',
      path: 'GeoMetros',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "City__c": {
          name: 'City__c',
          type: 'string'
        },
        "Country__c": {
          name: 'Country__c',
          type: 'string'
        },
        "Country_Code__c": {
          name: 'Country_Code__c',
          type: 'string'
        },
        "GEO_Country__c": {
          name: 'GEO_Country__c',
          type: 'string'
        },
        "GEO_Description__c": {
          name: 'GEO_Description__c',
          type: 'string'
        },
        "Region__c": {
          name: 'Region__c',
          type: 'string'
        },
        "Postal_Zip_Code__c": {
          name: 'Postal_Zip_Code__c',
          type: 'string'
        },
        "State_Province__c": {
          name: 'State_Province__c',
          type: 'string'
        },
        "Street__c": {
          name: 'Street__c',
          type: 'string'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Geo_Location__c": {
          name: 'Geo_Location__c',
          type: 'GeoPoint'
        },
        "Geo_Location__Longitude__s": {
          name: 'Geo_Location__Longitude__s',
          type: 'number'
        },
        "Geo_Location__Latitude__s": {
          name: 'Geo_Location__Latitude__s',
          type: 'number'
        },
        "GEO_Metro_Hyphen__c": {
          name: 'GEO_Metro_Hyphen__c',
          type: 'string'
        },
        "Name_of_State_Province__c": {
          name: 'Name_of_State_Province__c',
          type: 'string'
        },
        "VMS_Enabled__c": {
          name: 'VMS_Enabled__c',
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
        countrycode: {
          name: 'countrycode',
          type: 'CountryCode',
          model: 'CountryCode',
          relationType: 'belongsTo',
                  keyFrom: 'Country_Code__c',
          keyTo: 'sfdcId'
        },
        metrovirtualpools: {
          name: 'metrovirtualpools',
          type: 'MetroVirtualVendorPool[]',
          model: 'MetroVirtualVendorPool',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'GEO_Metro__c'
        },
      }
    }
  }
}
