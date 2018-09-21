/* tslint:disable */
import {
  WorkflowStage
} from '../index';

declare var Object: any;
export interface WorkflowInterface {
  "name": string;
  "slug"?: string;
  "uid"?: string;
  "description"?: string;
  "model"?: string;
  "isActive"?: boolean;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  stages?: WorkflowStage[];
}

export class Workflow implements WorkflowInterface {
  "name": string;
  "slug": string;
  "uid": string;
  "description": string;
  "model": string;
  "isActive": boolean;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  stages: WorkflowStage[];
  constructor(data?: WorkflowInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Workflow`.
   */
  public static getModelName() {
    return "Workflow";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Workflow for dynamic purposes.
  **/
  public static factory(data: WorkflowInterface): Workflow{
    return new Workflow(data);
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
      name: 'Workflow',
      plural: 'Workflows',
      path: 'Workflows',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "slug": {
          name: 'slug',
          type: 'string'
        },
        "uid": {
          name: 'uid',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "model": {
          name: 'model',
          type: 'string'
        },
        "isActive": {
          name: 'isActive',
          type: 'boolean',
          default: true
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
        stages: {
          name: 'stages',
          type: 'WorkflowStage[]',
          model: 'WorkflowStage',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'workflowId'
        },
      }
    }
  }
}
