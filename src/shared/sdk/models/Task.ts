/* tslint:disable */
import {
  Case,
  Job,
  Milestone,
  Project2,
  PurchaseOrder
} from '../index';

declare var Object: any;
export interface TaskInterface {
  "sfdcId": string;
  "Name"?: string;
  "Owner"?: string;
  "LastModifiedBy"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedBy"?: string;
  "Complete__c"?: number;
  "Case__c"?: string;
  "Description__c"?: string;
  "Due_Date__c"?: Date;
  "Duration__c"?: number;
  "Duration_Type__c"?: string;
  "Escalation_Status__c"?: string;
  "Job__c"?: string;
  "PgMO_Milestones__c"?: string;
  "PgMO_Parent_Task__c"?: string;
  "PgMO_Projects__c"?: string;
  "Priority__c"?: string;
  "Risk_Status__c"?: string;
  "Sequence_Number__c"?: number;
  "Start_Date__c"?: Date;
  "Task_No__c"?: string;
  "Task_Status__c"?: string;
  "Work_Order__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  case?: Case;
  job?: Job;
  milestone?: Milestone;
  task?: Task;
  project?: Project2;
  workorder?: PurchaseOrder;
}

export class Task implements TaskInterface {
  "sfdcId": string;
  "Name": string;
  "Owner": string;
  "LastModifiedBy": string;
  "CurrencyIsoCode": string;
  "CreatedBy": string;
  "Complete__c": number;
  "Case__c": string;
  "Description__c": string;
  "Due_Date__c": Date;
  "Duration__c": number;
  "Duration_Type__c": string;
  "Escalation_Status__c": string;
  "Job__c": string;
  "PgMO_Milestones__c": string;
  "PgMO_Parent_Task__c": string;
  "PgMO_Projects__c": string;
  "Priority__c": string;
  "Risk_Status__c": string;
  "Sequence_Number__c": number;
  "Start_Date__c": Date;
  "Task_No__c": string;
  "Task_Status__c": string;
  "Work_Order__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  case: Case;
  job: Job;
  milestone: Milestone;
  task: Task;
  project: Project2;
  workorder: PurchaseOrder;
  constructor(data?: TaskInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Task`.
   */
  public static getModelName() {
    return "Task";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Task for dynamic purposes.
  **/
  public static factory(data: TaskInterface): Task{
    return new Task(data);
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
      name: 'Task',
      plural: 'Tasks',
      path: 'Tasks',
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
        "Complete__c": {
          name: 'Complete__c',
          type: 'number'
        },
        "Case__c": {
          name: 'Case__c',
          type: 'string'
        },
        "Description__c": {
          name: 'Description__c',
          type: 'string'
        },
        "Due_Date__c": {
          name: 'Due_Date__c',
          type: 'Date'
        },
        "Duration__c": {
          name: 'Duration__c',
          type: 'number'
        },
        "Duration_Type__c": {
          name: 'Duration_Type__c',
          type: 'string'
        },
        "Escalation_Status__c": {
          name: 'Escalation_Status__c',
          type: 'string'
        },
        "Job__c": {
          name: 'Job__c',
          type: 'string'
        },
        "PgMO_Milestones__c": {
          name: 'PgMO_Milestones__c',
          type: 'string'
        },
        "PgMO_Parent_Task__c": {
          name: 'PgMO_Parent_Task__c',
          type: 'string'
        },
        "PgMO_Projects__c": {
          name: 'PgMO_Projects__c',
          type: 'string'
        },
        "Priority__c": {
          name: 'Priority__c',
          type: 'string'
        },
        "Risk_Status__c": {
          name: 'Risk_Status__c',
          type: 'string'
        },
        "Sequence_Number__c": {
          name: 'Sequence_Number__c',
          type: 'number'
        },
        "Start_Date__c": {
          name: 'Start_Date__c',
          type: 'Date'
        },
        "Task_No__c": {
          name: 'Task_No__c',
          type: 'string'
        },
        "Task_Status__c": {
          name: 'Task_Status__c',
          type: 'string'
        },
        "Work_Order__c": {
          name: 'Work_Order__c',
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
        case: {
          name: 'case',
          type: 'Case',
          model: 'Case',
          relationType: 'belongsTo',
                  keyFrom: 'Case__c',
          keyTo: 'sfdcId'
        },
        job: {
          name: 'job',
          type: 'Job',
          model: 'Job',
          relationType: 'belongsTo',
                  keyFrom: 'Job__c',
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
                  keyFrom: 'PgMO_Parent_Task__c',
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
        workorder: {
          name: 'workorder',
          type: 'PurchaseOrder',
          model: 'PurchaseOrder',
          relationType: 'belongsTo',
                  keyFrom: 'Work_Order__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
