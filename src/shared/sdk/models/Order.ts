/* tslint:disable */
import {
  Account,
  Case,
  Project,
  Jobsite,
  Product,
  OrderItem
} from '../index';

declare var Object: any;
export interface OrderInterface {
  "sfdcId": string;
  "Name"?: string;
  "OrderNumber"?: string;
  "AccountId"?: string;
  "Case__c"?: string;
  "Roll_up_Total__c"?: string;
  "Status"?: string;
  "Project__c"?: string;
  "Jobsite__c"?: string;
  "SKU__c"?: string;
  "Project_Vendor__c"?: string;
  "id"?: number;
  account?: Account;
  case?: Case;
  project?: Project;
  jobsite?: Jobsite;
  product?: Product;
  vendor?: Account;
  orderItems?: OrderItem[];
}

export class Order implements OrderInterface {
  "sfdcId": string;
  "Name": string;
  "OrderNumber": string;
  "AccountId": string;
  "Case__c": string;
  "Roll_up_Total__c": string;
  "Status": string;
  "Project__c": string;
  "Jobsite__c": string;
  "SKU__c": string;
  "Project_Vendor__c": string;
  "id": number;
  account: Account;
  case: Case;
  project: Project;
  jobsite: Jobsite;
  product: Product;
  vendor: Account;
  orderItems: OrderItem[];
  constructor(data?: OrderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Order`.
   */
  public static getModelName() {
    return "Order";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Order for dynamic purposes.
  **/
  public static factory(data: OrderInterface): Order{
    return new Order(data);
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
      name: 'Order',
      plural: 'Orders',
      path: 'Orders',
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
        "OrderNumber": {
          name: 'OrderNumber',
          type: 'string'
        },
        "AccountId": {
          name: 'AccountId',
          type: 'string'
        },
        "Case__c": {
          name: 'Case__c',
          type: 'string'
        },
        "Roll_up_Total__c": {
          name: 'Roll_up_Total__c',
          type: 'string'
        },
        "Status": {
          name: 'Status',
          type: 'string'
        },
        "Project__c": {
          name: 'Project__c',
          type: 'string'
        },
        "Jobsite__c": {
          name: 'Jobsite__c',
          type: 'string'
        },
        "SKU__c": {
          name: 'SKU__c',
          type: 'string'
        },
        "Project_Vendor__c": {
          name: 'Project_Vendor__c',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'AccountId',
          keyTo: 'sfdcId'
        },
        case: {
          name: 'case',
          type: 'Case',
          model: 'Case',
          relationType: 'belongsTo',
                  keyFrom: 'Case__c',
          keyTo: 'sfdcId'
        },
        project: {
          name: 'project',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Project__c',
          keyTo: 'sfdcId'
        },
        jobsite: {
          name: 'jobsite',
          type: 'Jobsite',
          model: 'Jobsite',
          relationType: 'belongsTo',
                  keyFrom: 'Jobsite__c',
          keyTo: 'sfdcId'
        },
        product: {
          name: 'product',
          type: 'Product',
          model: 'Product',
          relationType: 'belongsTo',
                  keyFrom: 'SKU__c',
          keyTo: 'sfdcId'
        },
        vendor: {
          name: 'vendor',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Project_Vendor__c',
          keyTo: 'sfdcId'
        },
        orderItems: {
          name: 'orderItems',
          type: 'OrderItem[]',
          model: 'OrderItem',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'OrderId'
        },
      }
    }
  }
}
