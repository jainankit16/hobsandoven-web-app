/* tslint:disable */
import {
  Users,
  Case,
  Contact,
  Order,
  RequestFormReceipt
} from '../index';

declare var Object: any;
export interface CommentInterface {
  "sfdcId"?: string;
  "Contact__c"?: string;
  "CreatedDate"?: Date;
  "Case_Comment__c"?: string;
  "Case_Comment_Body__c"?: string;
  "Case__c"?: string;
  "Order__c"?: string;
  "postByName"?: string;
  "postByType"?: string;
  "postByRole"?: string;
  "isDeleted"?: boolean;
  "modelName": string;
  "modelId": string;
  "context"?: any;
  "isPrivate"?: boolean;
  "messageType"?: string;
  "Request_Form_Receipt__c"?: string;
  "id"?: any;
  "ownerId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  owner?: Users;
  case?: Case;
  contact?: Contact;
  order?: Order;
  requestReceipt?: RequestFormReceipt;
}

export class Comment implements CommentInterface {
  "sfdcId": string;
  "Contact__c": string;
  "CreatedDate": Date;
  "Case_Comment__c": string;
  "Case_Comment_Body__c": string;
  "Case__c": string;
  "Order__c": string;
  "postByName": string;
  "postByType": string;
  "postByRole": string;
  "isDeleted": boolean;
  "modelName": string;
  "modelId": string;
  "context": any;
  "isPrivate": boolean;
  "messageType": string;
  "Request_Form_Receipt__c": string;
  "id": any;
  "ownerId": number;
  "createdAt": Date;
  "updatedAt": Date;
  owner: Users;
  case: Case;
  contact: Contact;
  order: Order;
  requestReceipt: RequestFormReceipt;
  constructor(data?: CommentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Comment`.
   */
  public static getModelName() {
    return "Comment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Comment for dynamic purposes.
  **/
  public static factory(data: CommentInterface): Comment{
    return new Comment(data);
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
      name: 'Comment',
      plural: 'Comments',
      path: 'Comments',
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
        "postByName": {
          name: 'postByName',
          type: 'string'
        },
        "postByType": {
          name: 'postByType',
          type: 'string'
        },
        "postByRole": {
          name: 'postByRole',
          type: 'string'
        },
        "isDeleted": {
          name: 'isDeleted',
          type: 'boolean',
          default: false
        },
        "modelName": {
          name: 'modelName',
          type: 'string'
        },
        "modelId": {
          name: 'modelId',
          type: 'string'
        },
        "context": {
          name: 'context',
          type: 'any'
        },
        "isPrivate": {
          name: 'isPrivate',
          type: 'boolean',
          default: false
        },
        "messageType": {
          name: 'messageType',
          type: 'string'
        },
        "Request_Form_Receipt__c": {
          name: 'Request_Form_Receipt__c',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "ownerId": {
          name: 'ownerId',
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
        owner: {
          name: 'owner',
          type: 'Users',
          model: 'Users',
          relationType: 'belongsTo',
                  keyFrom: 'ownerId',
          keyTo: 'id'
        },
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
        requestReceipt: {
          name: 'requestReceipt',
          type: 'RequestFormReceipt',
          model: 'RequestFormReceipt',
          relationType: 'belongsTo',
                  keyFrom: 'Request_Form_Receipt__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
