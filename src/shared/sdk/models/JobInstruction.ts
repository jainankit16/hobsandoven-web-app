/* tslint:disable */
import {
  Job
} from '../index';

declare var Object: any;
export interface JobInstructionInterface {
  "sfdcId"?: string;
  "Acceptance_Status__c"?: string;
  "CreatedDate"?: Date;
  "IsDeleted"?: boolean;
  "Job_Ins_Special_Service_Instructions__c"?: string;
  "Job_Instructions_Deliverables_Summary__c"?: string;
  "Job_Instructions_Required_Tools__c"?: string;
  "Job_Instructions_Service_Deliverables__c"?: string;
  "Job_Instructions_Service_Description__c"?: string;
  "Job_Instructions_Training_Documents__c"?: string;
  "Job_Instructions_Worker_Specific_Request__c"?: string;
  "Job__c"?: string;
  "LastModifiedDate"?: Date;
  "Name"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  Job?: Job;
}

export class JobInstruction implements JobInstructionInterface {
  "sfdcId": string;
  "Acceptance_Status__c": string;
  "CreatedDate": Date;
  "IsDeleted": boolean;
  "Job_Ins_Special_Service_Instructions__c": string;
  "Job_Instructions_Deliverables_Summary__c": string;
  "Job_Instructions_Required_Tools__c": string;
  "Job_Instructions_Service_Deliverables__c": string;
  "Job_Instructions_Service_Description__c": string;
  "Job_Instructions_Training_Documents__c": string;
  "Job_Instructions_Worker_Specific_Request__c": string;
  "Job__c": string;
  "LastModifiedDate": Date;
  "Name": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  Job: Job;
  constructor(data?: JobInstructionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `JobInstruction`.
   */
  public static getModelName() {
    return "JobInstruction";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of JobInstruction for dynamic purposes.
  **/
  public static factory(data: JobInstructionInterface): JobInstruction{
    return new JobInstruction(data);
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
      name: 'JobInstruction',
      plural: 'JobInstructions',
      path: 'JobInstructions',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Acceptance_Status__c": {
          name: 'Acceptance_Status__c',
          type: 'string'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "IsDeleted": {
          name: 'IsDeleted',
          type: 'boolean'
        },
        "Job_Ins_Special_Service_Instructions__c": {
          name: 'Job_Ins_Special_Service_Instructions__c',
          type: 'string'
        },
        "Job_Instructions_Deliverables_Summary__c": {
          name: 'Job_Instructions_Deliverables_Summary__c',
          type: 'string'
        },
        "Job_Instructions_Required_Tools__c": {
          name: 'Job_Instructions_Required_Tools__c',
          type: 'string'
        },
        "Job_Instructions_Service_Deliverables__c": {
          name: 'Job_Instructions_Service_Deliverables__c',
          type: 'string'
        },
        "Job_Instructions_Service_Description__c": {
          name: 'Job_Instructions_Service_Description__c',
          type: 'string'
        },
        "Job_Instructions_Training_Documents__c": {
          name: 'Job_Instructions_Training_Documents__c',
          type: 'string'
        },
        "Job_Instructions_Worker_Specific_Request__c": {
          name: 'Job_Instructions_Worker_Specific_Request__c',
          type: 'string'
        },
        "Job__c": {
          name: 'Job__c',
          type: 'string'
        },
        "LastModifiedDate": {
          name: 'LastModifiedDate',
          type: 'Date'
        },
        "Name": {
          name: 'Name',
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
        Job: {
          name: 'Job',
          type: 'Job',
          model: 'Job',
          relationType: 'belongsTo',
                  keyFrom: 'Job__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
