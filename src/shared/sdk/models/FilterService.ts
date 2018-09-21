/* tslint:disable */

declare var Object: any;
export interface FilterServiceInterface {
  "id"?: number;
}

export class FilterService implements FilterServiceInterface {
  "id": number;
  constructor(data?: FilterServiceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FilterService`.
   */
  public static getModelName() {
    return "FilterService";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FilterService for dynamic purposes.
  **/
  public static factory(data: FilterServiceInterface): FilterService{
    return new FilterService(data);
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
      name: 'FilterService',
      plural: 'FilterServices',
      path: 'FilterServices',
      idName: 'id',
      properties: {
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
