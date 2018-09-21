/* tslint:disable */
import {
  Jobsite,
  Project
} from '../index';

declare var Object: any;
export interface JobsiteProjectsInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "Jobsite__c"?: string;
  "Project__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  Jobsite?: Jobsite;
  Project?: Project;
}

export class JobsiteProjects implements JobsiteProjectsInterface {
  "sfdcId": string;
  "Name": string;
  "Jobsite__c": string;
  "Project__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  Jobsite: Jobsite;
  Project: Project;
  constructor(data?: JobsiteProjectsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `JobsiteProjects`.
   */
  public static getModelName() {
    return "JobsiteProjects";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of JobsiteProjects for dynamic purposes.
  **/
  public static factory(data: JobsiteProjectsInterface): JobsiteProjects{
    return new JobsiteProjects(data);
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
      name: 'JobsiteProjects',
      plural: 'JobsiteProjects',
      path: 'JobsiteProjects',
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
        "Jobsite__c": {
          name: 'Jobsite__c',
          type: 'string'
        },
        "Project__c": {
          name: 'Project__c',
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
        Jobsite: {
          name: 'Jobsite',
          type: 'Jobsite',
          model: 'Jobsite',
          relationType: 'belongsTo',
                  keyFrom: 'Jobsite__c',
          keyTo: 'sfdcId'
        },
        Project: {
          name: 'Project',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Project__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
