/* tslint:disable */
import {
  Users
} from '../index';

declare var Object: any;
export interface WorkerShiftInterface {
  "Name"?: string;
  "sfdcId"?: string;
  "RecordType"?: string;
  "Owner"?: string;
  "LastModifiedBy"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedBy"?: string;
  "Description__c"?: string;
  "End_AM_PM__c"?: string;
  "End_Time__c"?: string;
  "End_Time_zone__c"?: string;
  "Start_AM_PM__c"?: string;
  "Start_Time__c"?: string;
  "Start_Time_zone__c"?: string;
  "Worker_Shift_Code__c"?: string;
  "Worker_Shift_Type__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  owner?: Users;
}

export class WorkerShift implements WorkerShiftInterface {
  "Name": string;
  "sfdcId": string;
  "RecordType": string;
  "Owner": string;
  "LastModifiedBy": string;
  "CurrencyIsoCode": string;
  "CreatedBy": string;
  "Description__c": string;
  "End_AM_PM__c": string;
  "End_Time__c": string;
  "End_Time_zone__c": string;
  "Start_AM_PM__c": string;
  "Start_Time__c": string;
  "Start_Time_zone__c": string;
  "Worker_Shift_Code__c": string;
  "Worker_Shift_Type__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  owner: Users;
  constructor(data?: WorkerShiftInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `WorkerShift`.
   */
  public static getModelName() {
    return "WorkerShift";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of WorkerShift for dynamic purposes.
  **/
  public static factory(data: WorkerShiftInterface): WorkerShift{
    return new WorkerShift(data);
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
      name: 'WorkerShift',
      plural: 'WorkerShifts',
      path: 'WorkerShifts',
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
        "RecordType": {
          name: 'RecordType',
          type: 'string'
        },
        "Owner": {
          name: 'Owner',
          type: 'string'
        },
        "LastModifiedBy": {
          name: 'LastModifiedBy',
          type: 'string'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
          type: 'string'
        },
        "CreatedBy": {
          name: 'CreatedBy',
          type: 'string'
        },
        "Description__c": {
          name: 'Description__c',
          type: 'string'
        },
        "End_AM_PM__c": {
          name: 'End_AM_PM__c',
          type: 'string'
        },
        "End_Time__c": {
          name: 'End_Time__c',
          type: 'string'
        },
        "End_Time_zone__c": {
          name: 'End_Time_zone__c',
          type: 'string'
        },
        "Start_AM_PM__c": {
          name: 'Start_AM_PM__c',
          type: 'string'
        },
        "Start_Time__c": {
          name: 'Start_Time__c',
          type: 'string'
        },
        "Start_Time_zone__c": {
          name: 'Start_Time_zone__c',
          type: 'string'
        },
        "Worker_Shift_Code__c": {
          name: 'Worker_Shift_Code__c',
          type: 'string'
        },
        "Worker_Shift_Type__c": {
          name: 'Worker_Shift_Type__c',
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
        owner: {
          name: 'owner',
          type: 'Users',
          model: 'Users',
          relationType: 'belongsTo',
                  keyFrom: 'CreatedBy',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
