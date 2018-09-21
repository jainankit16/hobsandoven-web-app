/* tslint:disable */
import {
  Group,
  Program
} from '../index';

declare var Object: any;
export interface ProgramGroupInterface {
  "sfdcId": string;
  "Name"?: string;
  "Owner"?: string;
  "LastModifiedBy"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedBy"?: string;
  "Community__c"?: string;
  "PgMO_Groups__c"?: string;
  "PgMO_Programs__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  group?: Group;
  program?: Program;
}

export class ProgramGroup implements ProgramGroupInterface {
  "sfdcId": string;
  "Name": string;
  "Owner": string;
  "LastModifiedBy": string;
  "CurrencyIsoCode": string;
  "CreatedBy": string;
  "Community__c": string;
  "PgMO_Groups__c": string;
  "PgMO_Programs__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  group: Group;
  program: Program;
  constructor(data?: ProgramGroupInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProgramGroup`.
   */
  public static getModelName() {
    return "ProgramGroup";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProgramGroup for dynamic purposes.
  **/
  public static factory(data: ProgramGroupInterface): ProgramGroup{
    return new ProgramGroup(data);
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
      name: 'ProgramGroup',
      plural: 'ProgramGroups',
      path: 'ProgramGroups',
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
        "PgMO_Groups__c": {
          name: 'PgMO_Groups__c',
          type: 'string'
        },
        "PgMO_Programs__c": {
          name: 'PgMO_Programs__c',
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
