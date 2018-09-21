/* tslint:disable */

declare var Object: any;
export interface CountryInterface {
  "iso"?: string;
  "iso3"?: string;
  "iso_numeric"?: number;
  "fips"?: string;
  "name"?: string;
  "capital"?: string;
  "area"?: number;
  "population"?: number;
  "continent"?: string;
  "tld"?: string;
  "currency_code"?: string;
  "currency_symbol"?: string;
  "currency_name"?: string;
  "phone"?: string;
  "postal_code_format"?: string;
  "postal_code_regex"?: string;
  "languages"?: string;
  "geonameid"?: number;
  "neighbours"?: string;
  "equivalent_fips_code"?: string;
  "geo_region_id"?: number;
  "current_rate"?: number;
  "id"?: number;
}

export class Country implements CountryInterface {
  "iso": string;
  "iso3": string;
  "iso_numeric": number;
  "fips": string;
  "name": string;
  "capital": string;
  "area": number;
  "population": number;
  "continent": string;
  "tld": string;
  "currency_code": string;
  "currency_symbol": string;
  "currency_name": string;
  "phone": string;
  "postal_code_format": string;
  "postal_code_regex": string;
  "languages": string;
  "geonameid": number;
  "neighbours": string;
  "equivalent_fips_code": string;
  "geo_region_id": number;
  "current_rate": number;
  "id": number;
  constructor(data?: CountryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Country`.
   */
  public static getModelName() {
    return "Country";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Country for dynamic purposes.
  **/
  public static factory(data: CountryInterface): Country{
    return new Country(data);
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
      name: 'Country',
      plural: 'Countries',
      path: 'Countries',
      idName: 'id',
      properties: {
        "iso": {
          name: 'iso',
          type: 'string'
        },
        "iso3": {
          name: 'iso3',
          type: 'string'
        },
        "iso_numeric": {
          name: 'iso_numeric',
          type: 'number'
        },
        "fips": {
          name: 'fips',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "capital": {
          name: 'capital',
          type: 'string'
        },
        "area": {
          name: 'area',
          type: 'number'
        },
        "population": {
          name: 'population',
          type: 'number'
        },
        "continent": {
          name: 'continent',
          type: 'string'
        },
        "tld": {
          name: 'tld',
          type: 'string'
        },
        "currency_code": {
          name: 'currency_code',
          type: 'string'
        },
        "currency_symbol": {
          name: 'currency_symbol',
          type: 'string'
        },
        "currency_name": {
          name: 'currency_name',
          type: 'string'
        },
        "phone": {
          name: 'phone',
          type: 'string'
        },
        "postal_code_format": {
          name: 'postal_code_format',
          type: 'string'
        },
        "postal_code_regex": {
          name: 'postal_code_regex',
          type: 'string'
        },
        "languages": {
          name: 'languages',
          type: 'string'
        },
        "geonameid": {
          name: 'geonameid',
          type: 'number'
        },
        "neighbours": {
          name: 'neighbours',
          type: 'string'
        },
        "equivalent_fips_code": {
          name: 'equivalent_fips_code',
          type: 'string'
        },
        "geo_region_id": {
          name: 'geo_region_id',
          type: 'number'
        },
        "current_rate": {
          name: 'current_rate',
          type: 'number'
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
