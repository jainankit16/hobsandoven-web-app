/* tslint:disable */
import {
  Program,
  Project2
} from '../index';

declare var Object: any;
export interface MilestoneInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "Owner"?: string;
  "LastModifiedBy"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedBy"?: string;
  "RecordType"?: string;
  "Complete__c"?: number;
  "Description__c"?: string;
  "Due_Date__c"?: Date;
  "Duration__c"?: number;
  "Duration_Type__c"?: string;
  "Milestone_No__c"?: string;
  "PgMO_Programs__c"?: string;
  "PgMO_Projects__c"?: string;
  "Sequence_Number__c"?: number;
  "Start_Date__c"?: Date;
  "Status__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  program?: Program;
  project?: Project2;
}

export class Milestone implements MilestoneInterface {
  "sfdcId": string;
  "Name": string;
  "Owner": string;
  "LastModifiedBy": string;
  "CurrencyIsoCode": string;
  "CreatedBy": string;
  "RecordType": string;
  "Complete__c": number;
  "Description__c": string;
  "Due_Date__c": Date;
  "Duration__c": number;
  "Duration_Type__c": string;
  "Milestone_No__c": string;
  "PgMO_Programs__c": string;
  "PgMO_Projects__c": string;
  "Sequence_Number__c": number;
  "Start_Date__c": Date;
  "Status__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  program: Program;
  project: Project2;
  constructor(data?: MilestoneInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Milestone`.
   */
  public static getModelName() {
    return "Milestone";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Milestone for dynamic purposes.
  **/
  public static factory(data: MilestoneInterface): Milestone{
    return new Milestone(data);
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
      name: 'Milestone',
      plural: 'Milestones',
      path: 'Milestones',
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
        "RecordType": {
          name: 'RecordType',
          type: 'string'
        },
        "Complete__c": {
          name: 'Complete__c',
          type: 'number'
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
        "Milestone_No__c": {
          name: 'Milestone_No__c',
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
        "Sequence_Number__c": {
          name: 'Sequence_Number__c',
          type: 'number'
        },
        "Start_Date__c": {
          name: 'Start_Date__c',
          type: 'Date'
        },
        "Status__c": {
          name: 'Status__c',
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
      }
    }
  }
}
