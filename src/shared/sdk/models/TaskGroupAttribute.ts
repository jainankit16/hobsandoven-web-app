/* tslint:disable */
import {
  TaskGroup
} from '../index';

declare var Object: any;
export interface TaskGroupAttributeInterface {
  "sfdcId": string;
  "Name"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "Field_Order__c"?: number;
  "Field__c"?: string;
  "PgMO_Task_Group__c"?: string;
  "Size__c"?: number;
  "Type__c"?: string;
  "Value__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  taskGroup?: TaskGroup;
}

export class TaskGroupAttribute implements TaskGroupAttributeInterface {
  "sfdcId": string;
  "Name": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "Field_Order__c": number;
  "Field__c": string;
  "PgMO_Task_Group__c": string;
  "Size__c": number;
  "Type__c": string;
  "Value__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  taskGroup: TaskGroup;
  constructor(data?: TaskGroupAttributeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TaskGroupAttribute`.
   */
  public static getModelName() {
    return "TaskGroupAttribute";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TaskGroupAttribute for dynamic purposes.
  **/
  public static factory(data: TaskGroupAttributeInterface): TaskGroupAttribute{
    return new TaskGroupAttribute(data);
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
      name: 'TaskGroupAttribute',
      plural: 'TaskGroupAttributes',
      path: 'TaskGroupAttributes',
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
        "Size__c": {
          name: 'Size__c',
          type: 'number'
        },
        "Type__c": {
          name: 'Type__c',
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
