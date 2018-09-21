/* tslint:disable */

declare var Object: any;
export interface MapSettingsInterface {
  "Name"?: string;
  "sfdcId"?: string;
  "Two_hours_Distance_In_Miles__c"?: number;
  "Sales_Team_FSL_Driving_Time__c"?: number;
  "Service_Team_FSL_Driving_Time__c"?: number;
  "Dummy_Account__c"?: string;
  "Dummy_Asset__c"?: string;
  "dummy_contact__c"?: string;
  "Dummy_Contract__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class MapSettings implements MapSettingsInterface {
  "Name": string;
  "sfdcId": string;
  "Two_hours_Distance_In_Miles__c": number;
  "Sales_Team_FSL_Driving_Time__c": number;
  "Service_Team_FSL_Driving_Time__c": number;
  "Dummy_Account__c": string;
  "Dummy_Asset__c": string;
  "dummy_contact__c": string;
  "Dummy_Contract__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: MapSettingsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MapSettings`.
   */
  public static getModelName() {
    return "MapSettings";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MapSettings for dynamic purposes.
  **/
  public static factory(data: MapSettingsInterface): MapSettings{
    return new MapSettings(data);
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
      name: 'MapSettings',
      plural: 'MapSettings',
      path: 'MapSettings',
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
        "Two_hours_Distance_In_Miles__c": {
          name: 'Two_hours_Distance_In_Miles__c',
          type: 'number'
        },
        "Sales_Team_FSL_Driving_Time__c": {
          name: 'Sales_Team_FSL_Driving_Time__c',
          type: 'number'
        },
        "Service_Team_FSL_Driving_Time__c": {
          name: 'Service_Team_FSL_Driving_Time__c',
          type: 'number'
        },
        "Dummy_Account__c": {
          name: 'Dummy_Account__c',
          type: 'string'
        },
        "Dummy_Asset__c": {
          name: 'Dummy_Asset__c',
          type: 'string'
        },
        "dummy_contact__c": {
          name: 'dummy_contact__c',
          type: 'string'
        },
        "Dummy_Contract__c": {
          name: 'Dummy_Contract__c',
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
