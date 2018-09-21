/* tslint:disable */
import {
  Users
} from '../index';

declare var Object: any;
export interface ChannelInterface {
  "sfdcId": string;
  "RecordTypeId"?: string;
  "Name"?: string;
  "OwnerId"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "Community__c"?: string;
  "Available_to_Communities__c"?: string;
  "Accessibility_Type__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  owner?: Users;
}

export class Channel implements ChannelInterface {
  "sfdcId": string;
  "RecordTypeId": string;
  "Name": string;
  "OwnerId": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "Community__c": string;
  "Available_to_Communities__c": string;
  "Accessibility_Type__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  owner: Users;
  constructor(data?: ChannelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Channel`.
   */
  public static getModelName() {
    return "Channel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Channel for dynamic purposes.
  **/
  public static factory(data: ChannelInterface): Channel{
    return new Channel(data);
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
      name: 'Channel',
      plural: 'Channels',
      path: 'Channels',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "RecordTypeId": {
          name: 'RecordTypeId',
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
        "Community__c": {
          name: 'Community__c',
          type: 'string'
        },
        "Available_to_Communities__c": {
          name: 'Available_to_Communities__c',
          type: 'string'
        },
        "Accessibility_Type__c": {
          name: 'Accessibility_Type__c',
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
      }
    }
  }
}
