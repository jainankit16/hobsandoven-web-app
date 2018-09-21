/* tslint:disable */
import {
  NeighboringCountriesHeader
} from '../index';

declare var Object: any;
export interface NeighboringCountriesInterface {
  "Name"?: string;
  "sfdcId"?: string;
  "Niebhoring_Countries_Header__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  neighboringCountriesHeader?: NeighboringCountriesHeader;
}

export class NeighboringCountries implements NeighboringCountriesInterface {
  "Name": string;
  "sfdcId": string;
  "Niebhoring_Countries_Header__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  neighboringCountriesHeader: NeighboringCountriesHeader;
  constructor(data?: NeighboringCountriesInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `NeighboringCountries`.
   */
  public static getModelName() {
    return "NeighboringCountries";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of NeighboringCountries for dynamic purposes.
  **/
  public static factory(data: NeighboringCountriesInterface): NeighboringCountries{
    return new NeighboringCountries(data);
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
      name: 'NeighboringCountries',
      plural: 'NeighboringCountries',
      path: 'NeighboringCountries',
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
        "Niebhoring_Countries_Header__c": {
          name: 'Niebhoring_Countries_Header__c',
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
        neighboringCountriesHeader: {
          name: 'neighboringCountriesHeader',
          type: 'NeighboringCountriesHeader',
          model: 'NeighboringCountriesHeader',
          relationType: 'belongsTo',
                  keyFrom: 'Niebhoring_Countries_Header__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
