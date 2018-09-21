/* tslint:disable */
import {
  WorkflowStage,
  WorkflowStatus
} from '../index';

declare var Object: any;
export interface WorkflowTransitionInterface {
  "uid"?: string;
  "type": string;
  "btnTitle"?: string;
  "btnCss"?: string;
  "isActive"?: boolean;
  "isMSPVisible"?: boolean;
  "isVMSVisible"?: boolean;
  "elevatedAccess"?: boolean;
  "triggerAction"?: string;
  "visibilityCondition"?: string;
  "id"?: number;
  "workflowStageId"?: number;
  "workflowStatusId"?: number;
  workflowStage?: WorkflowStage;
  workflowStatus?: WorkflowStatus;
  nextStatus?: WorkflowStatus;
}

export class WorkflowTransition implements WorkflowTransitionInterface {
  "uid": string;
  "type": string;
  "btnTitle": string;
  "btnCss": string;
  "isActive": boolean;
  "isMSPVisible": boolean;
  "isVMSVisible": boolean;
  "elevatedAccess": boolean;
  "triggerAction": string;
  "visibilityCondition": string;
  "id": number;
  "workflowStageId": number;
  "workflowStatusId": number;
  workflowStage: WorkflowStage;
  workflowStatus: WorkflowStatus;
  nextStatus: WorkflowStatus;
  constructor(data?: WorkflowTransitionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `WorkflowTransition`.
   */
  public static getModelName() {
    return "WorkflowTransition";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of WorkflowTransition for dynamic purposes.
  **/
  public static factory(data: WorkflowTransitionInterface): WorkflowTransition{
    return new WorkflowTransition(data);
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
      name: 'WorkflowTransition',
      plural: 'WorkflowTransitions',
      path: 'WorkflowTransitions',
      idName: 'id',
      properties: {
        "uid": {
          name: 'uid',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "btnTitle": {
          name: 'btnTitle',
          type: 'string'
        },
        "btnCss": {
          name: 'btnCss',
          type: 'string'
        },
        "isActive": {
          name: 'isActive',
          type: 'boolean',
          default: true
        },
        "isMSPVisible": {
          name: 'isMSPVisible',
          type: 'boolean',
          default: false
        },
        "isVMSVisible": {
          name: 'isVMSVisible',
          type: 'boolean',
          default: false
        },
        "elevatedAccess": {
          name: 'elevatedAccess',
          type: 'boolean',
          default: false
        },
        "triggerAction": {
          name: 'triggerAction',
          type: 'string'
        },
        "visibilityCondition": {
          name: 'visibilityCondition',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "workflowStageId": {
          name: 'workflowStageId',
          type: 'number'
        },
        "workflowStatusId": {
          name: 'workflowStatusId',
          type: 'number'
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
        workflowStatus: {
          name: 'workflowStatus',
          type: 'WorkflowStatus',
          model: 'WorkflowStatus',
          relationType: 'belongsTo',
                  keyFrom: 'workflowStatusId',
          keyTo: 'id'
        },
        nextStatus: {
          name: 'nextStatus',
          type: 'WorkflowStatus',
          model: 'WorkflowStatus',
          relationType: 'belongsTo',
                  keyFrom: 'nextStatusId',
          keyTo: 'id'
        },
      }
    }
  }
}
