/* tslint:disable */

declare var Object: any;
export interface EmailServiceInterface {
  "id"?: number;
}

export class EmailService implements EmailServiceInterface {
  "id": number;
  constructor(data?: EmailServiceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EmailService`.
   */
  public static getModelName() {
    return "EmailService";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EmailService for dynamic purposes.
  **/
  public static factory(data: EmailServiceInterface): EmailService{
    return new EmailService(data);
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
      name: 'EmailService',
      plural: 'EmailServices',
      path: 'EmailServices',
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
