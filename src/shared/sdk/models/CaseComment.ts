/* tslint:disable */
import {
  Case,
  Users
} from '../index';

declare var Object: any;
export interface CaseCommentInterface {
  "sfdcId"?: string;
  "ParentId"?: string;
  "IsPublished"?: boolean;
  "CommentBody"?: string;
  "CreatedDate"?: Date;
  "CreatedById"?: string;
  "LastModifiedDate"?: Date;
  "id"?: number;
  Case?: Case;
  user?: Users;
}

export class CaseComment implements CaseCommentInterface {
  "sfdcId": string;
  "ParentId": string;
  "IsPublished": boolean;
  "CommentBody": string;
  "CreatedDate": Date;
  "CreatedById": string;
  "LastModifiedDate": Date;
  "id": number;
  Case: Case;
  user: Users;
  constructor(data?: CaseCommentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CaseComment`.
   */
  public static getModelName() {
    return "CaseComment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CaseComment for dynamic purposes.
  **/
  public static factory(data: CaseCommentInterface): CaseComment{
    return new CaseComment(data);
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
      name: 'CaseComment',
      plural: 'CaseComments',
      path: 'CaseComments',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "ParentId": {
          name: 'ParentId',
          type: 'string'
        },
        "IsPublished": {
          name: 'IsPublished',
          type: 'boolean'
        },
        "CommentBody": {
          name: 'CommentBody',
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
        "LastModifiedDate": {
          name: 'LastModifiedDate',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        Case: {
          name: 'Case',
          type: 'Case',
          model: 'Case',
          relationType: 'belongsTo',
                  keyFrom: 'ParentId',
          keyTo: 'sfdcId'
        },
        user: {
          name: 'user',
          type: 'Users',
          model: 'Users',
          relationType: 'belongsTo',
                  keyFrom: 'CreatedById',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
