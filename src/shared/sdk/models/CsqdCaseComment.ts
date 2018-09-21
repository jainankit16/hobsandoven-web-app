/* tslint:disable */
import {
  Case,
  Contact,
  Order
} from '../index';

declare var Object: any;
export interface CsqdCaseCommentInterface {
  "sfdcId"?: string;
  "Contact__c"?: string;
  "CreatedDate"?: Date;
  "Case_Comment__c"?: string;
  "Case_Comment_Body__c"?: string;
  "Case__c"?: string;
  "Order__c"?: string;
  "id"?: number;
  case?: Case;
  contact?: Contact;
  order?: Order;
}

export class CsqdCaseComment implements CsqdCaseCommentInterface {
  "sfdcId": string;
  "Contact__c": string;
  "CreatedDate": Date;
  "Case_Comment__c": string;
  "Case_Comment_Body__c": string;
  "Case__c": string;
  "Order__c": string;
  "id": number;
  case: Case;
  contact: Contact;
  order: Order;
  constructor(data?: CsqdCaseCommentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CsqdCaseComment`.
   */
  public static getModelName() {
    return "CsqdCaseComment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CsqdCaseComment for dynamic purposes.
  **/
  public static factory(data: CsqdCaseCommentInterface): CsqdCaseComment{
    return new CsqdCaseComment(data);
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
      name: 'CsqdCaseComment',
      plural: 'CsqdCaseComments',
      path: 'CsqdCaseComments',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Contact__c": {
          name: 'Contact__c',
          type: 'string'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "Case_Comment__c": {
          name: 'Case_Comment__c',
          type: 'string'
        },
        "Case_Comment_Body__c": {
          name: 'Case_Comment_Body__c',
          type: 'string'
        },
        "Case__c": {
          name: 'Case__c',
          type: 'string'
        },
        "Order__c": {
          name: 'Order__c',
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
        contact: {
          name: 'contact',
          type: 'Contact',
          model: 'Contact',
          relationType: 'belongsTo',
                  keyFrom: 'Contact__c',
          keyTo: 'sfdcId'
        },
        order: {
          name: 'order',
          type: 'Order',
          model: 'Order',
          relationType: 'belongsTo',
                  keyFrom: 'Order__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
