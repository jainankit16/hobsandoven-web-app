/* tslint:disable */
import {
  Task,
  TaskGroup
} from '../index';

declare var Object: any;
export interface TaskAttributeInterface {
  "sfdcId": string;
  "Name"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "Field_Order__c"?: number;
  "Field__c"?: string;
  "PgMO_Task_Group__c"?: string;
  "PgMO_Tasks__c"?: string;
  "Value__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  task?: Task;
  taskGroup?: TaskGroup;
}

export class TaskAttribute implements TaskAttributeInterface {
  "sfdcId": string;
  "Name": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "Field_Order__c": number;
  "Field__c": string;
  "PgMO_Task_Group__c": string;
  "PgMO_Tasks__c": string;
  "Value__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  task: Task;
  taskGroup: TaskGroup;
  constructor(data?: TaskAttributeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TaskAttribute`.
   */
  public static getModelName() {
    return "TaskAttribute";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TaskAttribute for dynamic purposes.
  **/
  public static factory(data: TaskAttributeInterface): TaskAttribute{
    return new TaskAttribute(data);
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
      name: 'TaskAttribute',
      plural: 'TaskAttributes',
      path: 'TaskAttributes',
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
        "Field__c": {
          name: 'Field__c',
          type: 'string'
        },
        "PgMO_Task_Group__c": {
          name: 'PgMO_Task_Group__c',
          type: 'string'
        },
        "PgMO_Tasks__c": {
          name: 'PgMO_Tasks__c',
          type: 'string'
        },
        "Value__c": {
          name: 'Value__c',
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
        task: {
          name: 'task',
          type: 'Task',
          model: 'Task',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Tasks__c',
          keyTo: 'sfdcId'
        },
        taskGroup: {
          name: 'taskGroup',
          type: 'TaskGroup',
          model: 'TaskGroup',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Task_Group__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
