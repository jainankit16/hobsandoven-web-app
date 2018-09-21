/* tslint:disable */

declare var Object: any;
export interface GoogleServiceInterface {
  "id"?: number;
}

export class GoogleService implements GoogleServiceInterface {
  "id": number;
  constructor(data?: GoogleServiceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `GoogleService`.
   */
  public static getModelName() {
    return "GoogleService";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of GoogleService for dynamic purposes.
  **/
  public static factory(data: GoogleServiceInterface): GoogleService{
    return new GoogleService(data);
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
      name: 'GoogleService',
      plural: 'GoogleServices',
      path: 'GoogleServices',
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
