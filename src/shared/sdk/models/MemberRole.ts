/* tslint:disable */
import {
  Project,
  Group,
  Worker,
  Program
} from '../index';

declare var Object: any;
export interface MemberRoleInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "LastModifiedBy"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedBy"?: string;
  "Community__c"?: string;
  "Member__c"?: string;
  "PgMO_Group__c"?: string;
  "PgMO_Programs__c"?: string;
  "Project__c"?: string;
  "Role__c"?: string;
  "id"?: number;
  "PgMO_Groups__c"?: string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  project?: Project;
  group?: Group;
  worker?: Worker;
  program?: Program;
}

export class MemberRole implements MemberRoleInterface {
  "sfdcId": string;
  "Name": string;
  "LastModifiedBy": string;
  "CurrencyIsoCode": string;
  "CreatedBy": string;
  "Community__c": string;
  "Member__c": string;
  "PgMO_Group__c": string;
  "PgMO_Programs__c": string;
  "Project__c": string;
  "Role__c": string;
  "id": number;
  "PgMO_Groups__c": string;
  "createdAt": Date;
  "updatedAt": Date;
  project: Project;
  group: Group;
  worker: Worker;
  program: Program;
  constructor(data?: MemberRoleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MemberRole`.
   */
  public static getModelName() {
    return "MemberRole";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MemberRole for dynamic purposes.
  **/
  public static factory(data: MemberRoleInterface): MemberRole{
    return new MemberRole(data);
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
      name: 'MemberRole',
      plural: 'MemberRoles',
      path: 'MemberRoles',
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
        "Member__c": {
          name: 'Member__c',
          type: 'string'
        },
        "PgMO_Group__c": {
          name: 'PgMO_Group__c',
          type: 'string'
        },
        "PgMO_Programs__c": {
          name: 'PgMO_Programs__c',
          type: 'string'
        },
        "Project__c": {
          name: 'Project__c',
          type: 'string'
        },
        "Role__c": {
          name: 'Role__c',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "PgMO_Groups__c": {
          name: 'PgMO_Groups__c',
          type: 'string'
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
        project: {
          name: 'project',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Project__c',
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
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'belongsTo',
                  keyFrom: 'Member__c',
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
      }
    }
  }
}
