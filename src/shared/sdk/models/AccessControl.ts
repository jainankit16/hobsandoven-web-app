/* tslint:disable */
import {
  Group,
  Milestone,
  Task
} from '../index';

declare var Object: any;
export interface AccessControlInterface {
  "sfdcId": string;
  "Name"?: string;
  "Owner"?: string;
  "LastModifiedBy"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedBy"?: string;
  "Access__c"?: string;
  "Community__c"?: string;
  "Department_Group__c"?: string;
  "PgMO_Groups__c"?: string;
  "PgMO_Milestones__c"?: string;
  "PgMO_Tasks__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  group?: Group;
  milestone?: Milestone;
  task?: Task;
}

export class AccessControl implements AccessControlInterface {
  "sfdcId": string;
  "Name": string;
  "Owner": string;
  "LastModifiedBy": string;
  "CurrencyIsoCode": string;
  "CreatedBy": string;
  "Access__c": string;
  "Community__c": string;
  "Department_Group__c": string;
  "PgMO_Groups__c": string;
  "PgMO_Milestones__c": string;
  "PgMO_Tasks__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  group: Group;
  milestone: Milestone;
  task: Task;
  constructor(data?: AccessControlInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AccessControl`.
   */
  public static getModelName() {
    return "AccessControl";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AccessControl for dynamic purposes.
  **/
  public static factory(data: AccessControlInterface): AccessControl{
    return new AccessControl(data);
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
      name: 'AccessControl',
      plural: 'AccessControls',
      path: 'AccessControls',
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
        "Access__c": {
          name: 'Access__c',
          type: 'string'
        },
        "Community__c": {
          name: 'Community__c',
          type: 'string'
        },
        "Department_Group__c": {
          name: 'Department_Group__c',
          type: 'string'
        },
        "PgMO_Groups__c": {
          name: 'PgMO_Groups__c',
          type: 'string'
        },
        "PgMO_Milestones__c": {
          name: 'PgMO_Milestones__c',
          type: 'string'
        },
        "PgMO_Tasks__c": {
          name: 'PgMO_Tasks__c',
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
        group: {
          name: 'group',
          type: 'Group',
          model: 'Group',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Groups__c',
          keyTo: 'sfdcId'
        },
        milestone: {
          name: 'milestone',
          type: 'Milestone',
          model: 'Milestone',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Milestones__c',
          keyTo: 'sfdcId'
        },
        task: {
          name: 'task',
          type: 'Task',
          model: 'Task',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Tasks__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
