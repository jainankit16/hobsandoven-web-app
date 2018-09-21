/* tslint:disable */
import {
  Order,
  Product
} from '../index';

declare var Object: any;
export interface OrderItemInterface {
  "sfdcId": string;
  "OrderItemNumber"?: string;
  "OrderId"?: number;
  "Product2Id"?: string;
  "ListPrice"?: number;
  "id"?: number;
  order?: Order;
  product?: Product;
}

export class OrderItem implements OrderItemInterface {
  "sfdcId": string;
  "OrderItemNumber": string;
  "OrderId": number;
  "Product2Id": string;
  "ListPrice": number;
  "id": number;
  order: Order;
  product: Product;
  constructor(data?: OrderItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrderItem`.
   */
  public static getModelName() {
    return "OrderItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrderItem for dynamic purposes.
  **/
  public static factory(data: OrderItemInterface): OrderItem{
    return new OrderItem(data);
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
      name: 'OrderItem',
      plural: 'OrderItems',
      path: 'OrderItems',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "OrderItemNumber": {
          name: 'OrderItemNumber',
          type: 'string'
        },
        "OrderId": {
          name: 'OrderId',
          type: 'number'
        },
        "Product2Id": {
          name: 'Product2Id',
          type: 'string'
        },
        "ListPrice": {
          name: 'ListPrice',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        order: {
          name: 'order',
          type: 'Order',
          model: 'Order',
          relationType: 'belongsTo',
                  keyFrom: 'OrderId',
          keyTo: 'sfdcId'
        },
        product: {
          name: 'product',
          type: 'Product',
          model: 'Product',
          relationType: 'belongsTo',
                  keyFrom: 'Product2Id',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
