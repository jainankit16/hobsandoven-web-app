/* tslint:disable */

declare var Object: any;
export interface ContactTypeInterface {
  "name": string;
  "description"?: string;
  "slug"?: string;
  "type"?: string;
  "isActive"?: boolean;
  "id"?: number;
}

export class ContactType implements ContactTypeInterface {
  "name": string;
  "description": string;
  "slug": string;
  "type": string;
  "isActive": boolean;
  "id": number;
  constructor(data?: ContactTypeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ContactType`.
   */
  public static getModelName() {
    return "ContactType";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ContactType for dynamic purposes.
  **/
  public static factory(data: ContactTypeInterface): ContactType{
    return new ContactType(data);
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
      name: 'ContactType',
      plural: 'ContactTypes',
      path: 'ContactTypes',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "slug": {
          name: 'slug',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "isActive": {
          name: 'isActive',
          type: 'boolean',
          default: true
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
