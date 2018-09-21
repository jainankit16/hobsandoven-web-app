/* tslint:disable */
import {
  WorkflowStage,
  WorkflowTransition
} from '../index';

declare var Object: any;
export interface WorkflowStatusInterface {
  "uid"?: string;
  "titleMSP": string;
  "titleVMS"?: string;
  "titlePMS"?: string;
  "isActive"?: boolean;
  "changeAlertMSP"?: string;
  "changeAlertVMS"?: string;
  "changeAlertPMS"?: string;
  "changeNotificationMSP"?: string;
  "changeNotificationVMS"?: string;
  "changeNotificationPMS"?: string;
  "unlockNextStage"?: boolean;
  "lockCurrentStage"?: boolean;
  "nextStageId"?: number;
  "putOnHold"?: boolean;
  "addDelay"?: boolean;
  "expectPartnerResponse"?: boolean;
  "expectVendorResponse"?: boolean;
  "triggerClose"?: boolean;
  "triggerCancel"?: boolean;
  "fieldUpdates"?: string;
  "triggerCode"?: string;
  "id"?: number;
  "workflowStageId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  workflowStage?: WorkflowStage;
  nextStage?: WorkflowStage;
  transitions?: WorkflowTransition[];
}

export class WorkflowStatus implements WorkflowStatusInterface {
  "uid": string;
  "titleMSP": string;
  "titleVMS": string;
  "titlePMS": string;
  "isActive": boolean;
  "changeAlertMSP": string;
  "changeAlertVMS": string;
  "changeAlertPMS": string;
  "changeNotificationMSP": string;
  "changeNotificationVMS": string;
  "changeNotificationPMS": string;
  "unlockNextStage": boolean;
  "lockCurrentStage": boolean;
  "nextStageId": number;
  "putOnHold": boolean;
  "addDelay": boolean;
  "expectPartnerResponse": boolean;
  "expectVendorResponse": boolean;
  "triggerClose": boolean;
  "triggerCancel": boolean;
  "fieldUpdates": string;
  "triggerCode": string;
  "id": number;
  "workflowStageId": number;
  "createdAt": Date;
  "updatedAt": Date;
  workflowStage: WorkflowStage;
  nextStage: WorkflowStage;
  transitions: WorkflowTransition[];
  constructor(data?: WorkflowStatusInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `WorkflowStatus`.
   */
  public static getModelName() {
    return "WorkflowStatus";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of WorkflowStatus for dynamic purposes.
  **/
  public static factory(data: WorkflowStatusInterface): WorkflowStatus{
    return new WorkflowStatus(data);
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
      name: 'WorkflowStatus',
      plural: 'WorkflowStatuses',
      path: 'WorkflowStatuses',
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
        "isActive": {
          name: 'isActive',
          type: 'boolean',
          default: true
        },
        "changeAlertMSP": {
          name: 'changeAlertMSP',
          type: 'string'
        },
        "changeAlertVMS": {
          name: 'changeAlertVMS',
          type: 'string'
        },
        "changeAlertPMS": {
          name: 'changeAlertPMS',
          type: 'string'
        },
        "changeNotificationMSP": {
          name: 'changeNotificationMSP',
          type: 'string'
        },
        "changeNotificationVMS": {
          name: 'changeNotificationVMS',
          type: 'string'
        },
        "changeNotificationPMS": {
          name: 'changeNotificationPMS',
          type: 'string'
        },
        "unlockNextStage": {
          name: 'unlockNextStage',
          type: 'boolean',
          default: false
        },
        "lockCurrentStage": {
          name: 'lockCurrentStage',
          type: 'boolean',
          default: false
        },
        "nextStageId": {
          name: 'nextStageId',
          type: 'number'
        },
        "putOnHold": {
          name: 'putOnHold',
          type: 'boolean',
          default: false
        },
        "addDelay": {
          name: 'addDelay',
          type: 'boolean',
          default: false
        },
        "expectPartnerResponse": {
          name: 'expectPartnerResponse',
          type: 'boolean',
          default: false
        },
        "expectVendorResponse": {
          name: 'expectVendorResponse',
          type: 'boolean',
          default: false
        },
        "triggerClose": {
          name: 'triggerClose',
          type: 'boolean',
          default: false
        },
        "triggerCancel": {
          name: 'triggerCancel',
          type: 'boolean',
          default: false
        },
        "fieldUpdates": {
          name: 'fieldUpdates',
          type: 'string'
        },
        "triggerCode": {
          name: 'triggerCode',
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
        nextStage: {
          name: 'nextStage',
          type: 'WorkflowStage',
          model: 'WorkflowStage',
          relationType: 'belongsTo',
                  keyFrom: 'nextStageId',
          keyTo: 'id'
        },
        transitions: {
          name: 'transitions',
          type: 'WorkflowTransition[]',
          model: 'WorkflowTransition',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'workflowStatusId'
        },
      }
    }
  }
}
