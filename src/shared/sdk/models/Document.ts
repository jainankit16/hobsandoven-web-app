/* tslint:disable */
import {
  Users,
  DocumentCategory,
  DocumentTitle
} from '../index';

declare var Object: any;
export interface DocumentInterface {
  "uuid"?: string;
  "modelName"?: string;
  "modelId"?: number;
  "container": string;
  "description"?: string;
  "context"?: any;
  "fileMeta"?: any;
  "sfMeta"?: any;
  "isDeleted"?: boolean;
  "uploadedBy"?: string;
  "ownerId"?: number;
  "categoryId"?: number;
  "subCategoryId"?: number;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  owner?: Users;
  category?: DocumentCategory;
  subCategory?: DocumentTitle;
}

export class Document implements DocumentInterface {
  "uuid": string;
  "modelName": string;
  "modelId": number;
  "container": string;
  "description": string;
  "context": any;
  "fileMeta": any;
  "sfMeta": any;
  "isDeleted": boolean;
  "uploadedBy": string;
  "ownerId": number;
  "categoryId": number;
  "subCategoryId": number;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  owner: Users;
  category: DocumentCategory;
  subCategory: DocumentTitle;
  constructor(data?: DocumentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Document`.
   */
  public static getModelName() {
    return "Document";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Document for dynamic purposes.
  **/
  public static factory(data: DocumentInterface): Document{
    return new Document(data);
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
      name: 'Document',
      plural: 'Documents',
      path: 'Documents',
      idName: 'id',
      properties: {
        "uuid": {
          name: 'uuid',
          type: 'string'
        },
        "modelName": {
          name: 'modelName',
          type: 'string'
        },
        "modelId": {
          name: 'modelId',
          type: 'number'
        },
        "container": {
          name: 'container',
          type: 'string',
          default: 'public'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "context": {
          name: 'context',
          type: 'any'
        },
        "fileMeta": {
          name: 'fileMeta',
          type: 'any'
        },
        "sfMeta": {
          name: 'sfMeta',
          type: 'any'
        },
        "isDeleted": {
          name: 'isDeleted',
          type: 'boolean',
          default: false
        },
        "uploadedBy": {
          name: 'uploadedBy',
          type: 'string'
        },
        "ownerId": {
          name: 'ownerId',
          type: 'number'
        },
        "categoryId": {
          name: 'categoryId',
          type: 'number'
        },
        "subCategoryId": {
          name: 'subCategoryId',
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
        category: {
          name: 'category',
          type: 'DocumentCategory',
          model: 'DocumentCategory',
          relationType: 'belongsTo',
                  keyFrom: 'categoryId',
          keyTo: 'id'
        },
        subCategory: {
          name: 'subCategory',
          type: 'DocumentTitle',
          model: 'DocumentTitle',
          relationType: 'belongsTo',
                  keyFrom: 'subCategoryId',
          keyTo: 'id'
        },
      }
    }
  }
}
