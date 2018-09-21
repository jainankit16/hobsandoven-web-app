/* tslint:disable */

declare var Object: any;
export interface CountryCodeInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "Country__c": string;
  "Region__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class CountryCode implements CountryCodeInterface {
  "sfdcId": string;
  "Name": string;
  "Country__c": string;
  "Region__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: CountryCodeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CountryCode`.
   */
  public static getModelName() {
    return "CountryCode";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CountryCode for dynamic purposes.
  **/
  public static factory(data: CountryCodeInterface): CountryCode{
    return new CountryCode(data);
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
      name: 'CountryCode',
      plural: 'CountryCodes',
      path: 'CountryCodes',
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
        "Country__c": {
          name: 'Country__c',
          type: 'string'
        },
        "Region__c": {
          name: 'Region__c',
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
      }
    }
  }
}
