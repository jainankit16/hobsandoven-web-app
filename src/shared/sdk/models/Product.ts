/* tslint:disable */
import {
  CountryCode,
  TalentType,
  RecordType
} from '../index';

declare var Object: any;
export interface ProductInterface {
  "sfdcId"?: string;
  "IsActive"?: boolean;
  "ProductCode"?: string;
  "Description"?: string;
  "Family"?: string;
  "Name"?: string;
  "RecordType"?: string;
  "QuantityUnitOfMeasure"?: string;
  "X247_6HR_Service_Area__c"?: string;
  "Assembly__c"?: string;
  "Auto_Serial_No__c"?: boolean;
  "Boards_Chassis__c"?: string;
  "Burnin_Complexity__c"?: string;
  "Capacity__c"?: string;
  "CCATS_If_applicable__c"?: string;
  "City__c"?: string;
  "Commodity_code_of_Country_of_Export_HTS__c"?: string;
  "Commodity_code_of_Country_of_Import__c"?: string;
  "Company_SKU__c"?: string;
  "Country__c"?: string;
  "Coverage_Hours__c"?: string;
  "Customer_Service_Type__c"?: string;
  "Cycle_Count_Days__c"?: string;
  "Default_Packaging_Type__c"?: string;
  "Dispatch_Priority__c"?: string;
  "ECCN__c"?: string;
  "EOL_Date__c"?: Date;
  "EVE_4HR_Service_Area__c"?: string;
  "Functional_Complexity__c"?: string;
  "Functionality_Explanation__c"?: string;
  "General_Layman_Terms_Description__c"?: string;
  "GEO_Code__c"?: string;
  "GEO_Country__c"?: string;
  "GEO_Metro_Vendor_FSL_code__c"?: string;
  "Has_Licence_Exception__c"?: boolean;
  "Import_Item_Model__c"?: string;
  "Includes_Encryption_Technology__c"?: boolean;
  "Includes_IT_telecommunication__c"?: boolean;
  "Includes_Lead_Acid_Batteries__c"?: boolean;
  "Includes_Lithium_Ion_Batteries__c"?: boolean;
  "Includes_Power_Supply__c"?: boolean;
  "Includes_Software__c"?: boolean;
  "Iron_Manufactured__c"?: boolean;
  "Is_item_an_appliance__c"?: boolean;
  "Is_this_item_a_spare_part__c"?: boolean;
  "ITAR__c"?: boolean;
  "Item_Condition__c"?: string;
  "dimensions_packed_height__c"?: number;
  "dimensions_packed_length__c"?: number;
  "dimensions_packed_width__c"?: number;
  "dimensions_unpacked_height__c"?: number;
  "dimensions_unpacked_length__c"?: number;
  "dimensions_unpacked_width__c"?: number;
  "Item_Weight_Packed_lb__c"?: number;
  "Item_Weight_Unpacked_lb__c"?: number;
  "Kitting__c"?: string;
  "Language__c"?: string;
  "Lead_Time_in_days__c"?: number;
  "Manufacturer_Part_Description__c"?: string;
  "Mark_as_FGI__c"?: boolean;
  "Maximum_Quantity__c"?: number;
  "Minimum_Quantity__c"?: number;
  "MPN__c"?: string;
  "NBD_Service_Area__c"?: string;
  "Notes__c"?: string;
  "Packaging_Complexity__c"?: string;
  "Parent_Product__c"?: string;
  "Part_Type__c"?: string;
  "Pick_Rule__c"?: string;
  "Product_ID__c"?: string;
  "Product_Type__c"?: string;
  "Product_Vendor__c"?: string;
  "Province__c"?: string;
  "QA_Complexity__c"?: string;
  "Release_Date__c"?: Date;
  "Restricted__c"?: string;
  "Routable_via_VFMS__c"?: string;
  "SBD_4HR_Service_Area__c"?: string;
  "Serialized_Item__c"?: boolean;
  "Serial_Number_Format__c"?: string;
  "Service_Technical_Level__c"?: string;
  "Shipping_Complexity__c"?: string;
  "SKU_Auto__c"?: string;
  "SLA__c"?: string;
  "Stocking_Class__c"?: string;
  "Supplier__c"?: string;
  "Supplier_SKU__c"?: string;
  "Talent_Type__c"?: string;
  "Talent_Type_Name__c"?: string;
  "Unit_Of_Measurement__c"?: string;
  "UPC__c"?: string;
  "Use_Company_as_Manufacturer_for_FRU_data__c"?: boolean;
  "Zip__c"?: string;
  "RecordTypeId"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  countryCode?: CountryCode;
  TalentType?: TalentType;
  RecordTypeTable?: RecordType;
}

export class Product implements ProductInterface {
  "sfdcId": string;
  "IsActive": boolean;
  "ProductCode": string;
  "Description": string;
  "Family": string;
  "Name": string;
  "RecordType": string;
  "QuantityUnitOfMeasure": string;
  "X247_6HR_Service_Area__c": string;
  "Assembly__c": string;
  "Auto_Serial_No__c": boolean;
  "Boards_Chassis__c": string;
  "Burnin_Complexity__c": string;
  "Capacity__c": string;
  "CCATS_If_applicable__c": string;
  "City__c": string;
  "Commodity_code_of_Country_of_Export_HTS__c": string;
  "Commodity_code_of_Country_of_Import__c": string;
  "Company_SKU__c": string;
  "Country__c": string;
  "Coverage_Hours__c": string;
  "Customer_Service_Type__c": string;
  "Cycle_Count_Days__c": string;
  "Default_Packaging_Type__c": string;
  "Dispatch_Priority__c": string;
  "ECCN__c": string;
  "EOL_Date__c": Date;
  "EVE_4HR_Service_Area__c": string;
  "Functional_Complexity__c": string;
  "Functionality_Explanation__c": string;
  "General_Layman_Terms_Description__c": string;
  "GEO_Code__c": string;
  "GEO_Country__c": string;
  "GEO_Metro_Vendor_FSL_code__c": string;
  "Has_Licence_Exception__c": boolean;
  "Import_Item_Model__c": string;
  "Includes_Encryption_Technology__c": boolean;
  "Includes_IT_telecommunication__c": boolean;
  "Includes_Lead_Acid_Batteries__c": boolean;
  "Includes_Lithium_Ion_Batteries__c": boolean;
  "Includes_Power_Supply__c": boolean;
  "Includes_Software__c": boolean;
  "Iron_Manufactured__c": boolean;
  "Is_item_an_appliance__c": boolean;
  "Is_this_item_a_spare_part__c": boolean;
  "ITAR__c": boolean;
  "Item_Condition__c": string;
  "dimensions_packed_height__c": number;
  "dimensions_packed_length__c": number;
  "dimensions_packed_width__c": number;
  "dimensions_unpacked_height__c": number;
  "dimensions_unpacked_length__c": number;
  "dimensions_unpacked_width__c": number;
  "Item_Weight_Packed_lb__c": number;
  "Item_Weight_Unpacked_lb__c": number;
  "Kitting__c": string;
  "Language__c": string;
  "Lead_Time_in_days__c": number;
  "Manufacturer_Part_Description__c": string;
  "Mark_as_FGI__c": boolean;
  "Maximum_Quantity__c": number;
  "Minimum_Quantity__c": number;
  "MPN__c": string;
  "NBD_Service_Area__c": string;
  "Notes__c": string;
  "Packaging_Complexity__c": string;
  "Parent_Product__c": string;
  "Part_Type__c": string;
  "Pick_Rule__c": string;
  "Product_ID__c": string;
  "Product_Type__c": string;
  "Product_Vendor__c": string;
  "Province__c": string;
  "QA_Complexity__c": string;
  "Release_Date__c": Date;
  "Restricted__c": string;
  "Routable_via_VFMS__c": string;
  "SBD_4HR_Service_Area__c": string;
  "Serialized_Item__c": boolean;
  "Serial_Number_Format__c": string;
  "Service_Technical_Level__c": string;
  "Shipping_Complexity__c": string;
  "SKU_Auto__c": string;
  "SLA__c": string;
  "Stocking_Class__c": string;
  "Supplier__c": string;
  "Supplier_SKU__c": string;
  "Talent_Type__c": string;
  "Talent_Type_Name__c": string;
  "Unit_Of_Measurement__c": string;
  "UPC__c": string;
  "Use_Company_as_Manufacturer_for_FRU_data__c": boolean;
  "Zip__c": string;
  "RecordTypeId": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  countryCode: CountryCode;
  TalentType: TalentType;
  RecordTypeTable: RecordType;
  constructor(data?: ProductInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Product`.
   */
  public static getModelName() {
    return "Product";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Product for dynamic purposes.
  **/
  public static factory(data: ProductInterface): Product{
    return new Product(data);
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
      name: 'Product',
      plural: 'Products',
      path: 'Products',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "IsActive": {
          name: 'IsActive',
          type: 'boolean',
          default: true
        },
        "ProductCode": {
          name: 'ProductCode',
          type: 'string'
        },
        "Description": {
          name: 'Description',
          type: 'string'
        },
        "Family": {
          name: 'Family',
          type: 'string'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "RecordType": {
          name: 'RecordType',
          type: 'string'
        },
        "QuantityUnitOfMeasure": {
          name: 'QuantityUnitOfMeasure',
          type: 'string'
        },
        "X247_6HR_Service_Area__c": {
          name: 'X247_6HR_Service_Area__c',
          type: 'string'
        },
        "Assembly__c": {
          name: 'Assembly__c',
          type: 'string'
        },
        "Auto_Serial_No__c": {
          name: 'Auto_Serial_No__c',
          type: 'boolean'
        },
        "Boards_Chassis__c": {
          name: 'Boards_Chassis__c',
          type: 'string'
        },
        "Burnin_Complexity__c": {
          name: 'Burnin_Complexity__c',
          type: 'string'
        },
        "Capacity__c": {
          name: 'Capacity__c',
          type: 'string'
        },
        "CCATS_If_applicable__c": {
          name: 'CCATS_If_applicable__c',
          type: 'string'
        },
        "City__c": {
          name: 'City__c',
          type: 'string'
        },
        "Commodity_code_of_Country_of_Export_HTS__c": {
          name: 'Commodity_code_of_Country_of_Export_HTS__c',
          type: 'string'
        },
        "Commodity_code_of_Country_of_Import__c": {
          name: 'Commodity_code_of_Country_of_Import__c',
          type: 'string'
        },
        "Company_SKU__c": {
          name: 'Company_SKU__c',
          type: 'string'
        },
        "Country__c": {
          name: 'Country__c',
          type: 'string'
        },
        "Coverage_Hours__c": {
          name: 'Coverage_Hours__c',
          type: 'string'
        },
        "Customer_Service_Type__c": {
          name: 'Customer_Service_Type__c',
          type: 'string'
        },
        "Cycle_Count_Days__c": {
          name: 'Cycle_Count_Days__c',
          type: 'string'
        },
        "Default_Packaging_Type__c": {
          name: 'Default_Packaging_Type__c',
          type: 'string'
        },
        "Dispatch_Priority__c": {
          name: 'Dispatch_Priority__c',
          type: 'string'
        },
        "ECCN__c": {
          name: 'ECCN__c',
          type: 'string'
        },
        "EOL_Date__c": {
          name: 'EOL_Date__c',
          type: 'Date'
        },
        "EVE_4HR_Service_Area__c": {
          name: 'EVE_4HR_Service_Area__c',
          type: 'string'
        },
        "Functional_Complexity__c": {
          name: 'Functional_Complexity__c',
          type: 'string'
        },
        "Functionality_Explanation__c": {
          name: 'Functionality_Explanation__c',
          type: 'string'
        },
        "General_Layman_Terms_Description__c": {
          name: 'General_Layman_Terms_Description__c',
          type: 'string'
        },
        "GEO_Code__c": {
          name: 'GEO_Code__c',
          type: 'string'
        },
        "GEO_Country__c": {
          name: 'GEO_Country__c',
          type: 'string'
        },
        "GEO_Metro_Vendor_FSL_code__c": {
          name: 'GEO_Metro_Vendor_FSL_code__c',
          type: 'string'
        },
        "Has_Licence_Exception__c": {
          name: 'Has_Licence_Exception__c',
          type: 'boolean'
        },
        "Import_Item_Model__c": {
          name: 'Import_Item_Model__c',
          type: 'string'
        },
        "Includes_Encryption_Technology__c": {
          name: 'Includes_Encryption_Technology__c',
          type: 'boolean'
        },
        "Includes_IT_telecommunication__c": {
          name: 'Includes_IT_telecommunication__c',
          type: 'boolean'
        },
        "Includes_Lead_Acid_Batteries__c": {
          name: 'Includes_Lead_Acid_Batteries__c',
          type: 'boolean'
        },
        "Includes_Lithium_Ion_Batteries__c": {
          name: 'Includes_Lithium_Ion_Batteries__c',
          type: 'boolean'
        },
        "Includes_Power_Supply__c": {
          name: 'Includes_Power_Supply__c',
          type: 'boolean'
        },
        "Includes_Software__c": {
          name: 'Includes_Software__c',
          type: 'boolean'
        },
        "Iron_Manufactured__c": {
          name: 'Iron_Manufactured__c',
          type: 'boolean'
        },
        "Is_item_an_appliance__c": {
          name: 'Is_item_an_appliance__c',
          type: 'boolean'
        },
        "Is_this_item_a_spare_part__c": {
          name: 'Is_this_item_a_spare_part__c',
          type: 'boolean'
        },
        "ITAR__c": {
          name: 'ITAR__c',
          type: 'boolean'
        },
        "Item_Condition__c": {
          name: 'Item_Condition__c',
          type: 'string'
        },
        "dimensions_packed_height__c": {
          name: 'dimensions_packed_height__c',
          type: 'number'
        },
        "dimensions_packed_length__c": {
          name: 'dimensions_packed_length__c',
          type: 'number'
        },
        "dimensions_packed_width__c": {
          name: 'dimensions_packed_width__c',
          type: 'number'
        },
        "dimensions_unpacked_height__c": {
          name: 'dimensions_unpacked_height__c',
          type: 'number'
        },
        "dimensions_unpacked_length__c": {
          name: 'dimensions_unpacked_length__c',
          type: 'number'
        },
        "dimensions_unpacked_width__c": {
          name: 'dimensions_unpacked_width__c',
          type: 'number'
        },
        "Item_Weight_Packed_lb__c": {
          name: 'Item_Weight_Packed_lb__c',
          type: 'number'
        },
        "Item_Weight_Unpacked_lb__c": {
          name: 'Item_Weight_Unpacked_lb__c',
          type: 'number'
        },
        "Kitting__c": {
          name: 'Kitting__c',
          type: 'string'
        },
        "Language__c": {
          name: 'Language__c',
          type: 'string'
        },
        "Lead_Time_in_days__c": {
          name: 'Lead_Time_in_days__c',
          type: 'number'
        },
        "Manufacturer_Part_Description__c": {
          name: 'Manufacturer_Part_Description__c',
          type: 'string'
        },
        "Mark_as_FGI__c": {
          name: 'Mark_as_FGI__c',
          type: 'boolean'
        },
        "Maximum_Quantity__c": {
          name: 'Maximum_Quantity__c',
          type: 'number'
        },
        "Minimum_Quantity__c": {
          name: 'Minimum_Quantity__c',
          type: 'number'
        },
        "MPN__c": {
          name: 'MPN__c',
          type: 'string'
        },
        "NBD_Service_Area__c": {
          name: 'NBD_Service_Area__c',
          type: 'string'
        },
        "Notes__c": {
          name: 'Notes__c',
          type: 'string'
        },
        "Packaging_Complexity__c": {
          name: 'Packaging_Complexity__c',
          type: 'string'
        },
        "Parent_Product__c": {
          name: 'Parent_Product__c',
          type: 'string'
        },
        "Part_Type__c": {
          name: 'Part_Type__c',
          type: 'string'
        },
        "Pick_Rule__c": {
          name: 'Pick_Rule__c',
          type: 'string'
        },
        "Product_ID__c": {
          name: 'Product_ID__c',
          type: 'string'
        },
        "Product_Type__c": {
          name: 'Product_Type__c',
          type: 'string'
        },
        "Product_Vendor__c": {
          name: 'Product_Vendor__c',
          type: 'string'
        },
        "Province__c": {
          name: 'Province__c',
          type: 'string'
        },
        "QA_Complexity__c": {
          name: 'QA_Complexity__c',
          type: 'string'
        },
        "Release_Date__c": {
          name: 'Release_Date__c',
          type: 'Date'
        },
        "Restricted__c": {
          name: 'Restricted__c',
          type: 'string'
        },
        "Routable_via_VFMS__c": {
          name: 'Routable_via_VFMS__c',
          type: 'string'
        },
        "SBD_4HR_Service_Area__c": {
          name: 'SBD_4HR_Service_Area__c',
          type: 'string'
        },
        "Serialized_Item__c": {
          name: 'Serialized_Item__c',
          type: 'boolean'
        },
        "Serial_Number_Format__c": {
          name: 'Serial_Number_Format__c',
          type: 'string'
        },
        "Service_Technical_Level__c": {
          name: 'Service_Technical_Level__c',
          type: 'string'
        },
        "Shipping_Complexity__c": {
          name: 'Shipping_Complexity__c',
          type: 'string'
        },
        "SKU_Auto__c": {
          name: 'SKU_Auto__c',
          type: 'string'
        },
        "SLA__c": {
          name: 'SLA__c',
          type: 'string'
        },
        "Stocking_Class__c": {
          name: 'Stocking_Class__c',
          type: 'string'
        },
        "Supplier__c": {
          name: 'Supplier__c',
          type: 'string'
        },
        "Supplier_SKU__c": {
          name: 'Supplier_SKU__c',
          type: 'string'
        },
        "Talent_Type__c": {
          name: 'Talent_Type__c',
          type: 'string'
        },
        "Talent_Type_Name__c": {
          name: 'Talent_Type_Name__c',
          type: 'string'
        },
        "Unit_Of_Measurement__c": {
          name: 'Unit_Of_Measurement__c',
          type: 'string'
        },
        "UPC__c": {
          name: 'UPC__c',
          type: 'string'
        },
        "Use_Company_as_Manufacturer_for_FRU_data__c": {
          name: 'Use_Company_as_Manufacturer_for_FRU_data__c',
          type: 'boolean'
        },
        "Zip__c": {
          name: 'Zip__c',
          type: 'string'
        },
        "RecordTypeId": {
          name: 'RecordTypeId',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        countryCode: {
          name: 'countryCode',
          type: 'CountryCode',
          model: 'CountryCode',
          relationType: 'belongsTo',
                  keyFrom: 'GEO_Country__c',
          keyTo: 'Name'
        },
        TalentType: {
          name: 'TalentType',
          type: 'TalentType',
          model: 'TalentType',
          relationType: 'belongsTo',
                  keyFrom: 'Talent_Type__c',
          keyTo: 'sfdcId'
        },
        RecordTypeTable: {
          name: 'RecordTypeTable',
          type: 'RecordType',
          model: 'RecordType',
          relationType: 'belongsTo',
                  keyFrom: 'RecordTypeId',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
