/* tslint:disable */
import {
  Users,
  Alert
} from '../index';

declare var Object: any;
export interface UserAlertInterface {
  "dateRead"?: Date;
  "isRead"?: boolean;
  "id"?: number;
  "userId"?: number;
  "alertId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  user?: Users;
  alert?: Alert;
}

export class UserAlert implements UserAlertInterface {
  "dateRead": Date;
  "isRead": boolean;
  "id": number;
  "userId": number;
  "alertId": number;
  "createdAt": Date;
  "updatedAt": Date;
  user: Users;
  alert: Alert;
  constructor(data?: UserAlertInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserAlert`.
   */
  public static getModelName() {
    return "UserAlert";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserAlert for dynamic purposes.
  **/
  public static factory(data: UserAlertInterface): UserAlert{
    return new UserAlert(data);
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
      name: 'UserAlert',
      plural: 'UserAlerts',
      path: 'UserAlerts',
      idName: 'id',
      properties: {
        "dateRead": {
          name: 'dateRead',
          type: 'Date'
        },
        "isRead": {
          name: 'isRead',
          type: 'boolean',
          default: false
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "userId": {
          name: 'userId',
          type: 'number'
        },
        "alertId": {
          name: 'alertId',
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
        user: {
          name: 'user',
          type: 'Users',
          model: 'Users',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        alert: {
          name: 'alert',
          type: 'Alert',
          model: 'Alert',
          relationType: 'belongsTo',
                  keyFrom: 'alertId',
          keyTo: 'id'
        },
      }
    }
  }
}
