/* tslint:disable */
import {
  Users
} from '../index';

declare var Object: any;
export interface DocumentShareInterface {
  "externalUsers"?: any;
  "users"?: any;
  "groups"?: any;
  "teams"?: any;
  "sharedBy"?: string;
  "contentType"?: string;
  "contentValue"?: any;
  "ownerId"?: number;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  owner?: Users;
}

export class DocumentShare implements DocumentShareInterface {
  "externalUsers": any;
  "users": any;
  "groups": any;
  "teams": any;
  "sharedBy": string;
  "contentType": string;
  "contentValue": any;
  "ownerId": number;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  owner: Users;
  constructor(data?: DocumentShareInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DocumentShare`.
   */
  public static getModelName() {
    return "DocumentShare";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DocumentShare for dynamic purposes.
  **/
  public static factory(data: DocumentShareInterface): DocumentShare{
    return new DocumentShare(data);
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
      name: 'DocumentShare',
      plural: 'DocumentShares',
      path: 'DocumentShares',
      idName: 'id',
      properties: {
        "externalUsers": {
          name: 'externalUsers',
          type: 'any'
        },
        "users": {
          name: 'users',
          type: 'any'
        },
        "groups": {
          name: 'groups',
          type: 'any'
        },
        "teams": {
          name: 'teams',
          type: 'any'
        },
        "sharedBy": {
          name: 'sharedBy',
          type: 'string'
        },
        "contentType": {
          name: 'contentType',
          type: 'string'
        },
        "contentValue": {
          name: 'contentValue',
          type: 'any'
        },
        "ownerId": {
          name: 'ownerId',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'any'
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
      }
    }
  }
}
