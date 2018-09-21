/* tslint:disable */
import {
  Worker,
  Group,
  Conversation
} from '../index';

declare var Object: any;
export interface ConversationParticipantInterface {
  "sfdcId": string;
  "Name"?: string;
  "OwnerId"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "PgMO_Conversation__c"?: string;
  "Addressed_to_Group__c"?: string;
  "Addressed_To_Member__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  worker?: Worker;
  group?: Group;
  conversation?: Conversation;
}

export class ConversationParticipant implements ConversationParticipantInterface {
  "sfdcId": string;
  "Name": string;
  "OwnerId": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "PgMO_Conversation__c": string;
  "Addressed_to_Group__c": string;
  "Addressed_To_Member__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  worker: Worker;
  group: Group;
  conversation: Conversation;
  constructor(data?: ConversationParticipantInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ConversationParticipant`.
   */
  public static getModelName() {
    return "ConversationParticipant";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ConversationParticipant for dynamic purposes.
  **/
  public static factory(data: ConversationParticipantInterface): ConversationParticipant{
    return new ConversationParticipant(data);
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
      name: 'ConversationParticipant',
      plural: 'ConversationParticipants',
      path: 'ConversationParticipants',
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
        "PgMO_Conversation__c": {
          name: 'PgMO_Conversation__c',
          type: 'string'
        },
        "Addressed_to_Group__c": {
          name: 'Addressed_to_Group__c',
          type: 'string'
        },
        "Addressed_To_Member__c": {
          name: 'Addressed_To_Member__c',
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
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'belongsTo',
                  keyFrom: 'Addressed_To_Member__c',
          keyTo: 'sfdcId'
        },
        group: {
          name: 'group',
          type: 'Group',
          model: 'Group',
          relationType: 'belongsTo',
                  keyFrom: 'Addressed_to_Group__c',
          keyTo: 'sfdcId'
        },
        conversation: {
          name: 'conversation',
          type: 'Conversation',
          model: 'Conversation',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Conversation__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
