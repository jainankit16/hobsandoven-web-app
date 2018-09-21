/* tslint:disable */

declare var Object: any;
export interface UserTypeInterface {
  "name": string;
  "description"?: string;
  "slug"?: string;
  "type"?: string;
  "isActive"?: boolean;
  "id"?: number;
}

export class UserType implements UserTypeInterface {
  "name": string;
  "description": string;
  "slug": string;
  "type": string;
  "isActive": boolean;
  "id": number;
  constructor(data?: UserTypeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserType`.
   */
  public static getModelName() {
    return "UserType";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserType for dynamic purposes.
  **/
  public static factory(data: UserTypeInterface): UserType{
    return new UserType(data);
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
      name: 'UserType',
      plural: 'UserTypes',
      path: 'UserTypes',
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
