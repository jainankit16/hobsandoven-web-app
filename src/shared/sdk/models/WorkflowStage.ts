/* tslint:disable */
import {
  Workflow,
  WorkflowStatus
} from '../index';

declare var Object: any;
export interface WorkflowStageInterface {
  "uid"?: string;
  "titleMSP": string;
  "titleVMS"?: string;
  "titlePMS"?: string;
  "description"?: string;
  "isActive"?: boolean;
  "isVMSVisible"?: boolean;
  "isPMSVisible"?: boolean;
  "fieldUpdates"?: string;
  "isHiddenStage"?: boolean;
  "id"?: number;
  "workflowId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  workflow?: Workflow;
  statuses?: WorkflowStatus[];
  defaultStatus?: WorkflowStatus;
}

export class WorkflowStage implements WorkflowStageInterface {
  "uid": string;
  "titleMSP": string;
  "titleVMS": string;
  "titlePMS": string;
  "description": string;
  "isActive": boolean;
  "isVMSVisible": boolean;
  "isPMSVisible": boolean;
  "fieldUpdates": string;
  "isHiddenStage": boolean;
  "id": number;
  "workflowId": number;
  "createdAt": Date;
  "updatedAt": Date;
  workflow: Workflow;
  statuses: WorkflowStatus[];
  defaultStatus: WorkflowStatus;
  constructor(data?: WorkflowStageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `WorkflowStage`.
   */
  public static getModelName() {
    return "WorkflowStage";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of WorkflowStage for dynamic purposes.
  **/
  public static factory(data: WorkflowStageInterface): WorkflowStage{
    return new WorkflowStage(data);
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
      name: 'WorkflowStage',
      plural: 'WorkflowStages',
      path: 'WorkflowStages',
      idName: 'id',
      properties: {
        "uid": {
          name: 'uid',
          type: 'string'
        },
        "titleMSP": {
          name: 'titleMSP',
          type: 'string'
        },
        "titleVMS": {
          name: 'titleVMS',
          type: 'string'
        },
        "titlePMS": {
          name: 'titlePMS',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "isActive": {
          name: 'isActive',
          type: 'boolean',
          default: true
        },
        "isVMSVisible": {
          name: 'isVMSVisible',
          type: 'boolean',
          default: false
        },
        "isPMSVisible": {
          name: 'isPMSVisible',
          type: 'boolean',
          default: false
        },
        "fieldUpdates": {
          name: 'fieldUpdates',
          type: 'string'
        },
        "isHiddenStage": {
          name: 'isHiddenStage',
          type: 'boolean',
          default: false
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "workflowId": {
          name: 'workflowId',
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
        workflow: {
          name: 'workflow',
          type: 'Workflow',
          model: 'Workflow',
          relationType: 'belongsTo',
                  keyFrom: 'workflowId',
          keyTo: 'id'
        },
        statuses: {
          name: 'statuses',
          type: 'WorkflowStatus[]',
          model: 'WorkflowStatus',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'workflowStageId'
        },
        defaultStatus: {
          name: 'defaultStatus',
          type: 'WorkflowStatus',
          model: 'WorkflowStatus',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'workflowStageId'
        },
      }
    }
  }
}
