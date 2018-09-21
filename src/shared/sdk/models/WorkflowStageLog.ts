/* tslint:disable */
import {
  WorkflowStage
} from '../index';

declare var Object: any;
export interface WorkflowStageLogInterface {
  "model"?: string;
  "modelId"?: string;
  "note"?: string;
  "dateStarted"?: Date;
  "dateCompleted"?: Date;
  "startedById"?: number;
  "completedById"?: number;
  "id"?: number;
  "workflowStageId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  workflowStage?: WorkflowStage;
}

export class WorkflowStageLog implements WorkflowStageLogInterface {
  "model": string;
  "modelId": string;
  "note": string;
  "dateStarted": Date;
  "dateCompleted": Date;
  "startedById": number;
  "completedById": number;
  "id": number;
  "workflowStageId": number;
  "createdAt": Date;
  "updatedAt": Date;
  workflowStage: WorkflowStage;
  constructor(data?: WorkflowStageLogInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `WorkflowStageLog`.
   */
  public static getModelName() {
    return "WorkflowStageLog";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of WorkflowStageLog for dynamic purposes.
  **/
  public static factory(data: WorkflowStageLogInterface): WorkflowStageLog{
    return new WorkflowStageLog(data);
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
      name: 'WorkflowStageLog',
      plural: 'WorkflowStageLogs',
      path: 'WorkflowStageLogs',
      idName: 'id',
      properties: {
        "model": {
          name: 'model',
          type: 'string'
        },
        "modelId": {
          name: 'modelId',
          type: 'string'
        },
        "note": {
          name: 'note',
          type: 'string'
        },
        "dateStarted": {
          name: 'dateStarted',
          type: 'Date'
        },
        "dateCompleted": {
          name: 'dateCompleted',
          type: 'Date'
        },
        "startedById": {
          name: 'startedById',
          type: 'number'
        },
        "completedById": {
          name: 'completedById',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "workflowStageId": {
          name: 'workflowStageId',
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
        workflowStage: {
          name: 'workflowStage',
          type: 'WorkflowStage',
          model: 'WorkflowStage',
          relationType: 'belongsTo',
                  keyFrom: 'workflowStageId',
          keyTo: 'id'
        },
      }
    }
  }
}
