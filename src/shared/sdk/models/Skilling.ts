/* tslint:disable */

declare var Object: any;
export interface SkillingInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "Status__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Skilling implements SkillingInterface {
  "sfdcId": string;
  "Name": string;
  "Status__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: SkillingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Skilling`.
   */
  public static getModelName() {
    return "Skilling";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Skilling for dynamic purposes.
  **/
  public static factory(data: SkillingInterface): Skilling{
    return new Skilling(data);
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
      name: 'Skilling',
      plural: 'Skillings',
      path: 'Skillings',
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
        "Status__c": {
          name: 'Status__c',
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
