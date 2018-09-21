/* tslint:disable */

declare var Object: any;
export interface GeoMessageInterface {
  "Name"?: string;
  "sfdcId"?: string;
  "Message__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class GeoMessage implements GeoMessageInterface {
  "Name": string;
  "sfdcId": string;
  "Message__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: GeoMessageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `GeoMessage`.
   */
  public static getModelName() {
    return "GeoMessage";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of GeoMessage for dynamic purposes.
  **/
  public static factory(data: GeoMessageInterface): GeoMessage{
    return new GeoMessage(data);
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
      name: 'GeoMessage',
      plural: 'GeoMessages',
      path: 'GeoMessages',
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
        "Message__c": {
          name: 'Message__c',
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
