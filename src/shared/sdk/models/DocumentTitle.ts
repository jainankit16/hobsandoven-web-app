/* tslint:disable */
import {
  DocumentCategory
} from '../index';

declare var Object: any;
export interface DocumentTitleInterface {
  "title": string;
  "isActive"?: boolean;
  "documentCategoryId"?: number;
  "id"?: number;
  documentCategory?: DocumentCategory;
}

export class DocumentTitle implements DocumentTitleInterface {
  "title": string;
  "isActive": boolean;
  "documentCategoryId": number;
  "id": number;
  documentCategory: DocumentCategory;
  constructor(data?: DocumentTitleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DocumentTitle`.
   */
  public static getModelName() {
    return "DocumentTitle";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DocumentTitle for dynamic purposes.
  **/
  public static factory(data: DocumentTitleInterface): DocumentTitle{
    return new DocumentTitle(data);
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
      name: 'DocumentTitle',
      plural: 'DocumentTitles',
      path: 'DocumentTitles',
      idName: 'id',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "isActive": {
          name: 'isActive',
          type: 'boolean',
          default: true
        },
        "documentCategoryId": {
          name: 'documentCategoryId',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        documentCategory: {
          name: 'documentCategory',
          type: 'DocumentCategory',
          model: 'DocumentCategory',
          relationType: 'belongsTo',
                  keyFrom: 'documentCategoryId',
          keyTo: 'id'
        },
      }
    }
  }
}
