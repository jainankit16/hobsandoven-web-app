/* tslint:disable */
import {
  Case,
  Job,
  WorkOrder
} from '../index';

declare var Object: any;
export interface CsqdActivityInterface {
  "sfdcId"?: string;
  "Case__c"?: string;
  "Field__c"?: string;
  "FROM_Value__c"?: string;
  "CreatedDate"?: Date;
  "CreatedById"?: string;
  "To_Value__c"?: string;
  "Job__c"?: string;
  "Work_Order__c"?: string;
  "id"?: number;
  case?: Case;
  job?: Job;
  workOrder?: WorkOrder;
}

export class CsqdActivity implements CsqdActivityInterface {
  "sfdcId": string;
  "Case__c": string;
  "Field__c": string;
  "FROM_Value__c": string;
  "CreatedDate": Date;
  "CreatedById": string;
  "To_Value__c": string;
  "Job__c": string;
  "Work_Order__c": string;
  "id": number;
  case: Case;
  job: Job;
  workOrder: WorkOrder;
  constructor(data?: CsqdActivityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CsqdActivity`.
   */
  public static getModelName() {
    return "CsqdActivity";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CsqdActivity for dynamic purposes.
  **/
  public static factory(data: CsqdActivityInterface): CsqdActivity{
    return new CsqdActivity(data);
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
      name: 'CsqdActivity',
      plural: 'CsqdActivities',
      path: 'CsqdActivities',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Case__c": {
          name: 'Case__c',
          type: 'string'
        },
        "Field__c": {
          name: 'Field__c',
          type: 'string'
        },
        "FROM_Value__c": {
          name: 'FROM_Value__c',
          type: 'string'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "CreatedById": {
          name: 'CreatedById',
          type: 'string'
        },
        "To_Value__c": {
          name: 'To_Value__c',
          type: 'string'
        },
        "Job__c": {
          name: 'Job__c',
          type: 'string'
        },
        "Work_Order__c": {
          name: 'Work_Order__c',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        case: {
          name: 'case',
          type: 'Case',
          model: 'Case',
          relationType: 'belongsTo',
                  keyFrom: 'Case__c',
          keyTo: 'sfdcId'
        },
        job: {
          name: 'job',
          type: 'Job',
          model: 'Job',
          relationType: 'belongsTo',
                  keyFrom: 'Job__c',
          keyTo: 'sfdcId'
        },
        workOrder: {
          name: 'workOrder',
          type: 'WorkOrder',
          model: 'WorkOrder',
          relationType: 'belongsTo',
                  keyFrom: 'Work_Order__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
