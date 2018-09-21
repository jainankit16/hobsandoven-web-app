/* tslint:disable */

declare var Object: any;
export interface GeoSessionLogInterface {
  "Name"?: string;
  "sfdcId"?: string;
  "Login_Name__c"?: string;
  "Session_Id__c"?: string;
  "Logout_DateTime__c"?: Date;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class GeoSessionLog implements GeoSessionLogInterface {
  "Name": string;
  "sfdcId": string;
  "Login_Name__c": string;
  "Session_Id__c": string;
  "Logout_DateTime__c": Date;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: GeoSessionLogInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `GeoSessionLog`.
   */
  public static getModelName() {
    return "GeoSessionLog";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of GeoSessionLog for dynamic purposes.
  **/
  public static factory(data: GeoSessionLogInterface): GeoSessionLog{
    return new GeoSessionLog(data);
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
      name: 'GeoSessionLog',
      plural: 'GeoSessionLogs',
      path: 'GeoSessionLogs',
      idName: 'id',
      properties: {
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Login_Name__c": {
          name: 'Login_Name__c',
          type: 'string'
        },
        "Session_Id__c": {
          name: 'Session_Id__c',
          type: 'string'
        },
        "Logout_DateTime__c": {
          name: 'Logout_DateTime__c',
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
      }
    }
  }
}
