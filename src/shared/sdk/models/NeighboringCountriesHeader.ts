/* tslint:disable */

declare var Object: any;
export interface NeighboringCountriesHeaderInterface {
  "Name"?: string;
  "sfdcId"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class NeighboringCountriesHeader implements NeighboringCountriesHeaderInterface {
  "Name": string;
  "sfdcId": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: NeighboringCountriesHeaderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `NeighboringCountriesHeader`.
   */
  public static getModelName() {
    return "NeighboringCountriesHeader";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of NeighboringCountriesHeader for dynamic purposes.
  **/
  public static factory(data: NeighboringCountriesHeaderInterface): NeighboringCountriesHeader{
    return new NeighboringCountriesHeader(data);
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
      name: 'NeighboringCountriesHeader',
      plural: 'NeighboringCountriesHeaders',
      path: 'NeighboringCountriesHeaders',
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
