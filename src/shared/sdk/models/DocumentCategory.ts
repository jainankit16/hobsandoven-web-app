/* tslint:disable */
import {
  Department
} from '../index';

declare var Object: any;
export interface DocumentCategoryInterface {
  "title": string;
  "isDeliverable"?: boolean;
  "description"?: string;
  "modelName"?: string;
  "isActive"?: boolean;
  "slug"?: string;
  "staffRead"?: boolean;
  "staffUpload"?: boolean;
  "vendorRead"?: boolean;
  "vendorUpload"?: boolean;
  "partnerRead"?: boolean;
  "partnerUpload"?: boolean;
  "customerRead"?: boolean;
  "customerUpload"?: boolean;
  "containSenstiveData"?: boolean;
  "displayOrder"?: number;
  "allowedFileTypes"?: string;
  "departmentSfdcId"?: string;
  "departmentId"?: number;
  "id"?: number;
  department?: Department;
  department__c?: Department;
}

export class DocumentCategory implements DocumentCategoryInterface {
  "title": string;
  "isDeliverable": boolean;
  "description": string;
  "modelName": string;
  "isActive": boolean;
  "slug": string;
  "staffRead": boolean;
  "staffUpload": boolean;
  "vendorRead": boolean;
  "vendorUpload": boolean;
  "partnerRead": boolean;
  "partnerUpload": boolean;
  "customerRead": boolean;
  "customerUpload": boolean;
  "containSenstiveData": boolean;
  "displayOrder": number;
  "allowedFileTypes": string;
  "departmentSfdcId": string;
  "departmentId": number;
  "id": number;
  department: Department;
  department__c: Department;
  constructor(data?: DocumentCategoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DocumentCategory`.
   */
  public static getModelName() {
    return "DocumentCategory";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DocumentCategory for dynamic purposes.
  **/
  public static factory(data: DocumentCategoryInterface): DocumentCategory{
    return new DocumentCategory(data);
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
      name: 'DocumentCategory',
      plural: 'DocumentCategories',
      path: 'DocumentCategories',
      idName: 'id',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "isDeliverable": {
          name: 'isDeliverable',
          type: 'boolean'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "modelName": {
          name: 'modelName',
          type: 'string'
        },
        "isActive": {
          name: 'isActive',
          type: 'boolean',
          default: true
        },
        "slug": {
          name: 'slug',
          type: 'string'
        },
        "staffRead": {
          name: 'staffRead',
          type: 'boolean'
        },
        "staffUpload": {
          name: 'staffUpload',
          type: 'boolean'
        },
        "vendorRead": {
          name: 'vendorRead',
          type: 'boolean'
        },
        "vendorUpload": {
          name: 'vendorUpload',
          type: 'boolean'
        },
        "partnerRead": {
          name: 'partnerRead',
          type: 'boolean'
        },
        "partnerUpload": {
          name: 'partnerUpload',
          type: 'boolean'
        },
        "customerRead": {
          name: 'customerRead',
          type: 'boolean'
        },
        "customerUpload": {
          name: 'customerUpload',
          type: 'boolean'
        },
        "containSenstiveData": {
          name: 'containSenstiveData',
          type: 'boolean'
        },
        "displayOrder": {
          name: 'displayOrder',
          type: 'number'
        },
        "allowedFileTypes": {
          name: 'allowedFileTypes',
          type: 'string'
        },
        "departmentSfdcId": {
          name: 'departmentSfdcId',
          type: 'string'
        },
        "departmentId": {
          name: 'departmentId',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        department: {
          name: 'department',
          type: 'Department',
          model: 'Department',
          relationType: 'belongsTo',
                  keyFrom: 'departmentId',
          keyTo: 'id'
        },
        department__c: {
          name: 'department__c',
          type: 'Department',
          model: 'Department',
          relationType: 'belongsTo',
                  keyFrom: 'departmentSfdcId',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
