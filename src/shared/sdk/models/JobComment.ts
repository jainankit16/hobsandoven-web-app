/* tslint:disable */
import {
  Job,
  Users
} from '../index';

declare var Object: any;
export interface JobCommentInterface {
  "sfdcId"?: string;
  "Comment_Date__c"?: Date;
  "Comment_By__c"?: string;
  "Comment__c": string;
  "CreatedById"?: string;
  "CreatedDate"?: Date;
  "IsDeleted"?: boolean;
  "LastModifiedById"?: string;
  "LastModifiedDate"?: Date;
  "Name"?: string;
  "Service_Dispatch__c"?: string;
  "SystemModstamp"?: Date;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "ownerId"?: number;
  job?: Job;
  owner?: Users;
}

export class JobComment implements JobCommentInterface {
  "sfdcId": string;
  "Comment_Date__c": Date;
  "Comment_By__c": string;
  "Comment__c": string;
  "CreatedById": string;
  "CreatedDate": Date;
  "IsDeleted": boolean;
  "LastModifiedById": string;
  "LastModifiedDate": Date;
  "Name": string;
  "Service_Dispatch__c": string;
  "SystemModstamp": Date;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "ownerId": number;
  job: Job;
  owner: Users;
  constructor(data?: JobCommentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `JobComment`.
   */
  public static getModelName() {
    return "JobComment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of JobComment for dynamic purposes.
  **/
  public static factory(data: JobCommentInterface): JobComment{
    return new JobComment(data);
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
      name: 'JobComment',
      plural: 'JobComments',
      path: 'JobComments',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Comment_Date__c": {
          name: 'Comment_Date__c',
          type: 'Date',
          default: new Date(0)
        },
        "Comment_By__c": {
          name: 'Comment_By__c',
          type: 'string'
        },
        "Comment__c": {
          name: 'Comment__c',
          type: 'string'
        },
        "CreatedById": {
          name: 'CreatedById',
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
        "LastModifiedById": {
          name: 'LastModifiedById',
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
        "Service_Dispatch__c": {
          name: 'Service_Dispatch__c',
          type: 'string'
        },
        "SystemModstamp": {
          name: 'SystemModstamp',
          type: 'Date'
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
        "ownerId": {
          name: 'ownerId',
          type: 'number'
        },
      },
      relations: {
        job: {
          name: 'job',
          type: 'Job',
          model: 'Job',
          relationType: 'belongsTo',
                  keyFrom: 'Service_Dispatch__c',
          keyTo: 'sfdcId'
        },
        owner: {
          name: 'owner',
          type: 'Users',
          model: 'Users',
          relationType: 'belongsTo',
                  keyFrom: 'ownerId',
          keyTo: 'id'
        },
      }
    }
  }
}
