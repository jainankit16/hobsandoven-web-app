/* tslint:disable */
import {
  Worker,
  Group,
  Milestone,
  Program,
  Project2,
  Task
} from '../index';

declare var Object: any;
export interface AssignmentInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "Owner"?: string;
  "LastModifiedBy"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedBy"?: string;
  "Community__c"?: string;
  "Worker__c"?: string;
  "PgMO_Groups__c"?: string;
  "PgMO_Milestones__c"?: string;
  "PgMO_Programs__c"?: string;
  "PgMO_Projects__c"?: string;
  "PgMO_Tasks__c"?: string;
  "id"?: number;
  worker?: Worker;
  group?: Group;
  milestone?: Milestone;
  program?: Program;
  project?: Project2;
  task?: Task;
}

export class Assignment implements AssignmentInterface {
  "sfdcId": string;
  "Name": string;
  "Owner": string;
  "LastModifiedBy": string;
  "CurrencyIsoCode": string;
  "CreatedBy": string;
  "Community__c": string;
  "Worker__c": string;
  "PgMO_Groups__c": string;
  "PgMO_Milestones__c": string;
  "PgMO_Programs__c": string;
  "PgMO_Projects__c": string;
  "PgMO_Tasks__c": string;
  "id": number;
  worker: Worker;
  group: Group;
  milestone: Milestone;
  program: Program;
  project: Project2;
  task: Task;
  constructor(data?: AssignmentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Assignment`.
   */
  public static getModelName() {
    return "Assignment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Assignment for dynamic purposes.
  **/
  public static factory(data: AssignmentInterface): Assignment{
    return new Assignment(data);
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
      name: 'Assignment',
      plural: 'Assignments',
      path: 'Assignments',
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
        "Community__c": {
          name: 'Community__c',
          type: 'string'
        },
        "Worker__c": {
          name: 'Worker__c',
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
        "PgMO_Programs__c": {
          name: 'PgMO_Programs__c',
          type: 'string'
        },
        "PgMO_Projects__c": {
          name: 'PgMO_Projects__c',
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
      },
      relations: {
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'belongsTo',
                  keyFrom: 'Worker__c',
          keyTo: 'sfdcId'
        },
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
        program: {
          name: 'program',
          type: 'Program',
          model: 'Program',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Programs__c',
          keyTo: 'sfdcId'
        },
        project: {
          name: 'project',
          type: 'Project2',
          model: 'Project2',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Projects__c',
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
