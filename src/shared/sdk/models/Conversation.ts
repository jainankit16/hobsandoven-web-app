/* tslint:disable */
import {
  Users,
  Worker
} from '../index';

declare var Object: any;
export interface ConversationInterface {
  "sfdcId": string;
  "Name"?: string;
  "OwnerId"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "Followers__c"?: number;
  "Initated_By_Member__c"?: string;
  "Likes__c"?: number;
  "Message__c"?: string;
  "Original_Post__c"?: boolean;
  "Parent_Conversation__c"?: string;
  "Parent_Reply_Conversation__c"?: string;
  "Priority__c"?: string;
  "Reply__c"?: boolean;
  "Title__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  owner?: Users;
  worker?: Worker;
  parentId?: Conversation;
  ReplyId?: Conversation;
}

export class Conversation implements ConversationInterface {
  "sfdcId": string;
  "Name": string;
  "OwnerId": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "Followers__c": number;
  "Initated_By_Member__c": string;
  "Likes__c": number;
  "Message__c": string;
  "Original_Post__c": boolean;
  "Parent_Conversation__c": string;
  "Parent_Reply_Conversation__c": string;
  "Priority__c": string;
  "Reply__c": boolean;
  "Title__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  owner: Users;
  worker: Worker;
  parentId: Conversation;
  ReplyId: Conversation;
  constructor(data?: ConversationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Conversation`.
   */
  public static getModelName() {
    return "Conversation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Conversation for dynamic purposes.
  **/
  public static factory(data: ConversationInterface): Conversation{
    return new Conversation(data);
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
      name: 'Conversation',
      plural: 'Conversations',
      path: 'Conversations',
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
        "OwnerId": {
          name: 'OwnerId',
          type: 'string'
        },
        "LastModifiedById": {
          name: 'LastModifiedById',
          type: 'string'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
          type: 'string'
        },
        "CreatedById": {
          name: 'CreatedById',
          type: 'string'
        },
        "Followers__c": {
          name: 'Followers__c',
          type: 'number'
        },
        "Initated_By_Member__c": {
          name: 'Initated_By_Member__c',
          type: 'string'
        },
        "Likes__c": {
          name: 'Likes__c',
          type: 'number'
        },
        "Message__c": {
          name: 'Message__c',
          type: 'string'
        },
        "Original_Post__c": {
          name: 'Original_Post__c',
          type: 'boolean'
        },
        "Parent_Conversation__c": {
          name: 'Parent_Conversation__c',
          type: 'string'
        },
        "Parent_Reply_Conversation__c": {
          name: 'Parent_Reply_Conversation__c',
          type: 'string'
        },
        "Priority__c": {
          name: 'Priority__c',
          type: 'string'
        },
        "Reply__c": {
          name: 'Reply__c',
          type: 'boolean'
        },
        "Title__c": {
          name: 'Title__c',
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
        owner: {
          name: 'owner',
          type: 'Users',
          model: 'Users',
          relationType: 'belongsTo',
                  keyFrom: 'OwnerId',
          keyTo: 'sfdcId'
        },
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'belongsTo',
                  keyFrom: 'Initated_By_Member__c',
          keyTo: 'sfdcId'
        },
        parentId: {
          name: 'parentId',
          type: 'Conversation',
          model: 'Conversation',
          relationType: 'belongsTo',
                  keyFrom: 'Parent_Conversation__c',
          keyTo: 'sfdcId'
        },
        ReplyId: {
          name: 'ReplyId',
          type: 'Conversation',
          model: 'Conversation',
          relationType: 'belongsTo',
                  keyFrom: 'Parent_Reply_Conversation__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
