/* tslint:disable */

declare var Object: any;
export interface TimezoneInterface {
  "name"?: string;
  "sfdcId"?: number;
  "value"?: string;
  "id"?: number;
}

export class Timezone implements TimezoneInterface {
  "name": string;
  "sfdcId": number;
  "value": string;
  "id": number;
  constructor(data?: TimezoneInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Timezone`.
   */
  public static getModelName() {
    return "Timezone";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Timezone for dynamic purposes.
  **/
  public static factory(data: TimezoneInterface): Timezone{
    return new Timezone(data);
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
      name: 'Timezone',
      plural: 'Timezones',
      path: 'Timezones',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "sfdcId": {
          name: 'sfdcId',
          type: 'number'
        },
        "value": {
          name: 'value',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
