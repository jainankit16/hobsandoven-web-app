/* tslint:disable */

declare var Object: any;
export interface AlertInterface {
  "message": string;
  "type": string;
  "modelName"?: string;
  "modelId"?: string;
  "viewUrl"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Alert implements AlertInterface {
  "message": string;
  "type": string;
  "modelName": string;
  "modelId": string;
  "viewUrl": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: AlertInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Alert`.
   */
  public static getModelName() {
    return "Alert";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Alert for dynamic purposes.
  **/
  public static factory(data: AlertInterface): Alert{
    return new Alert(data);
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
      name: 'Alert',
      plural: 'Alerts',
      path: 'Alerts',
      idName: 'id',
      properties: {
        "message": {
          name: 'message',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "modelName": {
          name: 'modelName',
          type: 'string'
        },
        "modelId": {
          name: 'modelId',
          type: 'string'
        },
        "viewUrl": {
          name: 'viewUrl',
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
