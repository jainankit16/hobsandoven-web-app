/* tslint:disable */
import {
  Project,
  Worker
} from '../index';

declare var Object: any;
export interface ProjectWorkerInterface {
  "sfdcId"?: string;
  "Project__c"?: string;
  "Worker__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  project?: Project;
  worker?: Worker;
}

export class ProjectWorker implements ProjectWorkerInterface {
  "sfdcId": string;
  "Project__c": string;
  "Worker__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  project: Project;
  worker: Worker;
  constructor(data?: ProjectWorkerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProjectWorker`.
   */
  public static getModelName() {
    return "ProjectWorker";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProjectWorker for dynamic purposes.
  **/
  public static factory(data: ProjectWorkerInterface): ProjectWorker{
    return new ProjectWorker(data);
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
      name: 'ProjectWorker',
      plural: 'ProjectWorkers',
      path: 'ProjectWorkers',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Project__c": {
          name: 'Project__c',
          type: 'string'
        },
        "Worker__c": {
          name: 'Worker__c',
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
        project: {
          name: 'project',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Project__c',
          keyTo: 'sfdcId'
        },
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'belongsTo',
                  keyFrom: 'Worker__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
