/* tslint:disable */

declare var Object: any;
export interface TaskGroupInterface {
  "sfdcId": string;
  "Name"?: string;
  "OwnerId"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "Field_Order__c"?: number;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class TaskGroup implements TaskGroupInterface {
  "sfdcId": string;
  "Name": string;
  "OwnerId": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "Field_Order__c": number;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: TaskGroupInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TaskGroup`.
   */
  public static getModelName() {
    return "TaskGroup";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TaskGroup for dynamic purposes.
  **/
  public static factory(data: TaskGroupInterface): TaskGroup{
    return new TaskGroup(data);
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
      name: 'TaskGroup',
      plural: 'TaskGroups',
      path: 'TaskGroups',
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
        "OwnerId": {
          name: 'OwnerId',
          type: 'string'
        },
        "LastModifiedById": {
          name: 'LastModifiedById',
          type: 'string'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
          type: 'string'
        },
        "CreatedById": {
          name: 'CreatedById',
          type: 'string'
        },
        "Field_Order__c": {
          name: 'Field_Order__c',
          type: 'number'
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
