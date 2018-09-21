/* tslint:disable */
import {
  Project
} from '../index';

declare var Object: any;
export interface RecordTypeInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "Description"?: string;
  "SobjectType"?: string;
  "IsActive"?: string;
  "DeveloperName"?: string;
  "NameSpacePrefix"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  projects?: Project[];
}

export class RecordType implements RecordTypeInterface {
  "sfdcId": string;
  "Name": string;
  "Description": string;
  "SobjectType": string;
  "IsActive": string;
  "DeveloperName": string;
  "NameSpacePrefix": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  projects: Project[];
  constructor(data?: RecordTypeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RecordType`.
   */
  public static getModelName() {
    return "RecordType";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RecordType for dynamic purposes.
  **/
  public static factory(data: RecordTypeInterface): RecordType{
    return new RecordType(data);
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
      name: 'RecordType',
      plural: 'RecordTypes',
      path: 'RecordTypes',
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
        "Description": {
          name: 'Description',
          type: 'string'
        },
        "SobjectType": {
          name: 'SobjectType',
          type: 'string'
        },
        "IsActive": {
          name: 'IsActive',
          type: 'string'
        },
        "DeveloperName": {
          name: 'DeveloperName',
          type: 'string'
        },
        "NameSpacePrefix": {
          name: 'NameSpacePrefix',
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
        projects: {
          name: 'projects',
          type: 'Project[]',
          model: 'Project',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'RecordTypeId'
        },
      }
    }
  }
}
