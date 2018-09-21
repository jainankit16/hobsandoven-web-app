/* tslint:disable */

declare var Object: any;
export interface ActivityInterface {
  "modelName": string;
  "modelId": string;
  "sfMeta"?: any;
  "context"?: any;
  "log"?: Array<any>;
  "type": string;
  "description"?: string;
  "title"?: string;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Activity implements ActivityInterface {
  "modelName": string;
  "modelId": string;
  "sfMeta": any;
  "context": any;
  "log": Array<any>;
  "type": string;
  "description": string;
  "title": string;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: ActivityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Activity`.
   */
  public static getModelName() {
    return "Activity";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Activity for dynamic purposes.
  **/
  public static factory(data: ActivityInterface): Activity{
    return new Activity(data);
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
      name: 'Activity',
      plural: 'Activities',
      path: 'Activities',
      idName: 'id',
      properties: {
        "modelName": {
          name: 'modelName',
          type: 'string'
        },
        "modelId": {
          name: 'modelId',
          type: 'string'
        },
        "sfMeta": {
          name: 'sfMeta',
          type: 'any'
        },
        "context": {
          name: 'context',
          type: 'any'
        },
        "log": {
          name: 'log',
          type: 'Array&lt;any&gt;'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "title": {
          name: 'title',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
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
