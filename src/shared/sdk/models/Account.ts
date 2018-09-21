/* tslint:disable */
import {
  Users,
  Pricelist,
  Project,
  RecordType,
  GeoMessage,
  GeoPoint
} from '../index';

declare var Object: any;
export interface AccountInterface {
  "sfdcId": string;
  "AccountSource"?: string;
  "Account_Safe_Id__c"?: string;
  "Account_Tier__c"?: string;
  "Active_FSL__c"?: boolean;
  "Address_Verification_Status__c"?: string;
  "Bank_Account_Type__c"?: string;
  "Business_Size_c__c"?: string;
  "Certificate_of_Incorporation_Company_Reg__c"?: boolean;
  "Company_Reference_code__c"?: string;
  "CreatedById"?: string;
  "CreatedDate"?: Date;
  "Created_updated_from_survey__c"?: boolean;
  "CurrencyIsoCode"?: string;
  "DataCenter_Operations_Hardware_Assembler__c"?: boolean;
  "Data_Center_Assembler_Next_Buss_Day_SLA__c"?: boolean;
  "Data_Center_Engr_Next_Business_Day_SLA__c"?: boolean;
  "Data_Center_Facilities_Manager__c"?: boolean;
  "Data_Center_Facilities_Technician_Level1__c"?: boolean;
  "Data_Center_Mgr_Next_Business_Day_SLA__c"?: boolean;
  "Data_Center_Operations_Engineer_Level_1__c"?: boolean;
  "Data_Center_Technician_Next_Buss_Day_SLA__c"?: boolean;
  "Default_Pricelist__c"?: string;
  "Deployment_Project_Only__c"?: boolean;
  "Desktop_Support_Next_Business_Day_SLA__c"?: boolean;
  "Desktop_Support_Technicians_Level_1__c"?: boolean;
  "Do_you_accept_bank_payments_in_EURO__c"?: boolean;
  "Do_you_accept_bank_payments_in_US__c"?: boolean;
  "FS_On_HW_Same_Bus_Day_4Hours_SLA_24x7__c"?: boolean;
  "FS_On_HW_Same_Business_Day_4_Hours_SLA__c"?: boolean;
  "FS_Onsite_Next_Business_Day_SLA__c"?: boolean;
  "Field_Service_24x7_Onsite_SLA__c"?: boolean;
  "GST_VAT_Registration_certificate__c"?: boolean;
  "Help_Desk_Technical_Support_Engineer__c"?: boolean;
  "Helpdesk_Next_Business_Day_SLA__c"?: boolean;
  "IsCustomerPortal"?: boolean;
  "IsDeleted"?: boolean;
  "IsLimitedWarranty__c"?: boolean;
  "IsPartner"?: boolean;
  "LastModifiedById"?: string;
  "LastModifiedDate"?: Date;
  "Multiple_Location__c"?: boolean;
  "Name"?: string;
  "Network_Server_Engineer_MS_Windows__c"?: boolean;
  "Network_Server_Tech_Next_Buss_Day_SLA__c"?: boolean;
  "Network_Server_Technician_MS_Windows__c"?: boolean;
  "Network_Srv_Engr_Next_Business_Day_SLA__c"?: boolean;
  "Network_Storage_Engineer_Level_2__c"?: boolean;
  "Network_Storage_Engr_Next_Buss_Day_SLA__c"?: boolean;
  "Next_Business_Day_Service__c"?: boolean;
  "OwnerId"?: string;
  "PhotoUrl"?: string;
  "Project_Manager_Onsite_IT_Project__c"?: boolean;
  "Project_Mgr_Onsite_Next_Business_Day_SLA__c"?: boolean;
  "Rate_US_17__c"?: number;
  "Rate_US_20__c"?: number;
  "Rate_US_22__c"?: number;
  "RecordTypeID__c"?: string;
  "RecordTypeId"?: string;
  "Record_Id__c"?: string;
  "Same_Day_Service__c"?: boolean;
  "Sample_copy_of_invoice_from_Vendor__c"?: boolean;
  "Scanned_Copy_Cancelled_cheque_fromBank__c"?: boolean;
  "Service_Global_Ref__c"?: string;
  "SystemModstamp"?: Date;
  "Tax_Identification_Number_certcopy__c"?: boolean;
  "Vendor_Type__c"?: string;
  "isShippingAddressChanged__c"?: boolean;
  "zeitzone__BillingLTFactor__c"?: string;
  "Webcase_Account_Name__c"?: string;
  "BillingStreet"?: string;
  "BillingCity"?: string;
  "BillingState"?: string;
  "BillingCountry"?: string;
  "BillingPostalCode"?: string;
  "Billing_country_Code__c"?: string;
  "Account_Number__c"?: string;
  "Master_Project__c"?: string;
  "ShippingStreet"?: string;
  "ShippingCity"?: string;
  "ShippingState"?: string;
  "ShippingCountry"?: string;
  "ShippingPostalCode"?: string;
  "Shipping_country_Code__c"?: string;
  "geolocation__c"?: GeoPoint;
  "geolocation__Latitude__s"?: number;
  "geolocation__Longitude__s"?: number;
  "Partner_Account__c"?: string;
  "Standard_Supported_FSL__c"?: string;
  "Regional_FSL_Gateway1__c"?: string;
  "FSL_Location_Status__c"?: string;
  "Standard_Coverage_Message__c"?: string;
  "FileCounter"?: number;
  "FolderLastModifiedOn"?: Date;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  account?: Account;
  supportedFslAccount?: Account;
  users?: Users;
  pricelist?: Pricelist;
  program?: Project;
  RecordType?: RecordType;
  geoMessage?: GeoMessage;
}

export class Account implements AccountInterface {
  "sfdcId": string;
  "AccountSource": string;
  "Account_Safe_Id__c": string;
  "Account_Tier__c": string;
  "Active_FSL__c": boolean;
  "Address_Verification_Status__c": string;
  "Bank_Account_Type__c": string;
  "Business_Size_c__c": string;
  "Certificate_of_Incorporation_Company_Reg__c": boolean;
  "Company_Reference_code__c": string;
  "CreatedById": string;
  "CreatedDate": Date;
  "Created_updated_from_survey__c": boolean;
  "CurrencyIsoCode": string;
  "DataCenter_Operations_Hardware_Assembler__c": boolean;
  "Data_Center_Assembler_Next_Buss_Day_SLA__c": boolean;
  "Data_Center_Engr_Next_Business_Day_SLA__c": boolean;
  "Data_Center_Facilities_Manager__c": boolean;
  "Data_Center_Facilities_Technician_Level1__c": boolean;
  "Data_Center_Mgr_Next_Business_Day_SLA__c": boolean;
  "Data_Center_Operations_Engineer_Level_1__c": boolean;
  "Data_Center_Technician_Next_Buss_Day_SLA__c": boolean;
  "Default_Pricelist__c": string;
  "Deployment_Project_Only__c": boolean;
  "Desktop_Support_Next_Business_Day_SLA__c": boolean;
  "Desktop_Support_Technicians_Level_1__c": boolean;
  "Do_you_accept_bank_payments_in_EURO__c": boolean;
  "Do_you_accept_bank_payments_in_US__c": boolean;
  "FS_On_HW_Same_Bus_Day_4Hours_SLA_24x7__c": boolean;
  "FS_On_HW_Same_Business_Day_4_Hours_SLA__c": boolean;
  "FS_Onsite_Next_Business_Day_SLA__c": boolean;
  "Field_Service_24x7_Onsite_SLA__c": boolean;
  "GST_VAT_Registration_certificate__c": boolean;
  "Help_Desk_Technical_Support_Engineer__c": boolean;
  "Helpdesk_Next_Business_Day_SLA__c": boolean;
  "IsCustomerPortal": boolean;
  "IsDeleted": boolean;
  "IsLimitedWarranty__c": boolean;
  "IsPartner": boolean;
  "LastModifiedById": string;
  "LastModifiedDate": Date;
  "Multiple_Location__c": boolean;
  "Name": string;
  "Network_Server_Engineer_MS_Windows__c": boolean;
  "Network_Server_Tech_Next_Buss_Day_SLA__c": boolean;
  "Network_Server_Technician_MS_Windows__c": boolean;
  "Network_Srv_Engr_Next_Business_Day_SLA__c": boolean;
  "Network_Storage_Engineer_Level_2__c": boolean;
  "Network_Storage_Engr_Next_Buss_Day_SLA__c": boolean;
  "Next_Business_Day_Service__c": boolean;
  "OwnerId": string;
  "PhotoUrl": string;
  "Project_Manager_Onsite_IT_Project__c": boolean;
  "Project_Mgr_Onsite_Next_Business_Day_SLA__c": boolean;
  "Rate_US_17__c": number;
  "Rate_US_20__c": number;
  "Rate_US_22__c": number;
  "RecordTypeID__c": string;
  "RecordTypeId": string;
  "Record_Id__c": string;
  "Same_Day_Service__c": boolean;
  "Sample_copy_of_invoice_from_Vendor__c": boolean;
  "Scanned_Copy_Cancelled_cheque_fromBank__c": boolean;
  "Service_Global_Ref__c": string;
  "SystemModstamp": Date;
  "Tax_Identification_Number_certcopy__c": boolean;
  "Vendor_Type__c": string;
  "isShippingAddressChanged__c": boolean;
  "zeitzone__BillingLTFactor__c": string;
  "Webcase_Account_Name__c": string;
  "BillingStreet": string;
  "BillingCity": string;
  "BillingState": string;
  "BillingCountry": string;
  "BillingPostalCode": string;
  "Billing_country_Code__c": string;
  "Account_Number__c": string;
  "Master_Project__c": string;
  "ShippingStreet": string;
  "ShippingCity": string;
  "ShippingState": string;
  "ShippingCountry": string;
  "ShippingPostalCode": string;
  "Shipping_country_Code__c": string;
  "geolocation__c": GeoPoint;
  "geolocation__Latitude__s": number;
  "geolocation__Longitude__s": number;
  "Partner_Account__c": string;
  "Standard_Supported_FSL__c": string;
  "Regional_FSL_Gateway1__c": string;
  "FSL_Location_Status__c": string;
  "Standard_Coverage_Message__c": string;
  "FileCounter": number;
  "FolderLastModifiedOn": Date;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  account: Account;
  supportedFslAccount: Account;
  users: Users;
  pricelist: Pricelist;
  program: Project;
  RecordType: RecordType;
  geoMessage: GeoMessage;
  constructor(data?: AccountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Account`.
   */
  public static getModelName() {
    return "Account";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Account for dynamic purposes.
  **/
  public static factory(data: AccountInterface): Account{
    return new Account(data);
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
      name: 'Account',
      plural: 'Accounts',
      path: 'Accounts',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "AccountSource": {
          name: 'AccountSource',
          type: 'string'
        },
        "Account_Safe_Id__c": {
          name: 'Account_Safe_Id__c',
          type: 'string'
        },
        "Account_Tier__c": {
          name: 'Account_Tier__c',
          type: 'string'
        },
        "Active_FSL__c": {
          name: 'Active_FSL__c',
          type: 'boolean'
        },
        "Address_Verification_Status__c": {
          name: 'Address_Verification_Status__c',
          type: 'string'
        },
        "Bank_Account_Type__c": {
          name: 'Bank_Account_Type__c',
          type: 'string'
        },
        "Business_Size_c__c": {
          name: 'Business_Size_c__c',
          type: 'string'
        },
        "Certificate_of_Incorporation_Company_Reg__c": {
          name: 'Certificate_of_Incorporation_Company_Reg__c',
          type: 'boolean'
        },
        "Company_Reference_code__c": {
          name: 'Company_Reference_code__c',
          type: 'string'
        },
        "CreatedById": {
          name: 'CreatedById',
          type: 'string'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "Created_updated_from_survey__c": {
          name: 'Created_updated_from_survey__c',
          type: 'boolean'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
          type: 'string'
        },
        "DataCenter_Operations_Hardware_Assembler__c": {
          name: 'DataCenter_Operations_Hardware_Assembler__c',
          type: 'boolean'
        },
        "Data_Center_Assembler_Next_Buss_Day_SLA__c": {
          name: 'Data_Center_Assembler_Next_Buss_Day_SLA__c',
          type: 'boolean'
        },
        "Data_Center_Engr_Next_Business_Day_SLA__c": {
          name: 'Data_Center_Engr_Next_Business_Day_SLA__c',
          type: 'boolean'
        },
        "Data_Center_Facilities_Manager__c": {
          name: 'Data_Center_Facilities_Manager__c',
          type: 'boolean'
        },
        "Data_Center_Facilities_Technician_Level1__c": {
          name: 'Data_Center_Facilities_Technician_Level1__c',
          type: 'boolean'
        },
        "Data_Center_Mgr_Next_Business_Day_SLA__c": {
          name: 'Data_Center_Mgr_Next_Business_Day_SLA__c',
          type: 'boolean'
        },
        "Data_Center_Operations_Engineer_Level_1__c": {
          name: 'Data_Center_Operations_Engineer_Level_1__c',
          type: 'boolean'
        },
        "Data_Center_Technician_Next_Buss_Day_SLA__c": {
          name: 'Data_Center_Technician_Next_Buss_Day_SLA__c',
          type: 'boolean'
        },
        "Default_Pricelist__c": {
          name: 'Default_Pricelist__c',
          type: 'string'
        },
        "Deployment_Project_Only__c": {
          name: 'Deployment_Project_Only__c',
          type: 'boolean'
        },
        "Desktop_Support_Next_Business_Day_SLA__c": {
          name: 'Desktop_Support_Next_Business_Day_SLA__c',
          type: 'boolean'
        },
        "Desktop_Support_Technicians_Level_1__c": {
          name: 'Desktop_Support_Technicians_Level_1__c',
          type: 'boolean'
        },
        "Do_you_accept_bank_payments_in_EURO__c": {
          name: 'Do_you_accept_bank_payments_in_EURO__c',
          type: 'boolean'
        },
        "Do_you_accept_bank_payments_in_US__c": {
          name: 'Do_you_accept_bank_payments_in_US__c',
          type: 'boolean'
        },
        "FS_On_HW_Same_Bus_Day_4Hours_SLA_24x7__c": {
          name: 'FS_On_HW_Same_Bus_Day_4Hours_SLA_24x7__c',
          type: 'boolean'
        },
        "FS_On_HW_Same_Business_Day_4_Hours_SLA__c": {
          name: 'FS_On_HW_Same_Business_Day_4_Hours_SLA__c',
          type: 'boolean'
        },
        "FS_Onsite_Next_Business_Day_SLA__c": {
          name: 'FS_Onsite_Next_Business_Day_SLA__c',
          type: 'boolean'
        },
        "Field_Service_24x7_Onsite_SLA__c": {
          name: 'Field_Service_24x7_Onsite_SLA__c',
          type: 'boolean'
        },
        "GST_VAT_Registration_certificate__c": {
          name: 'GST_VAT_Registration_certificate__c',
          type: 'boolean'
        },
        "Help_Desk_Technical_Support_Engineer__c": {
          name: 'Help_Desk_Technical_Support_Engineer__c',
          type: 'boolean'
        },
        "Helpdesk_Next_Business_Day_SLA__c": {
          name: 'Helpdesk_Next_Business_Day_SLA__c',
          type: 'boolean'
        },
        "IsCustomerPortal": {
          name: 'IsCustomerPortal',
          type: 'boolean'
        },
        "IsDeleted": {
          name: 'IsDeleted',
          type: 'boolean'
        },
        "IsLimitedWarranty__c": {
          name: 'IsLimitedWarranty__c',
          type: 'boolean'
        },
        "IsPartner": {
          name: 'IsPartner',
          type: 'boolean'
        },
        "LastModifiedById": {
          name: 'LastModifiedById',
          type: 'string'
        },
        "LastModifiedDate": {
          name: 'LastModifiedDate',
          type: 'Date'
        },
        "Multiple_Location__c": {
          name: 'Multiple_Location__c',
          type: 'boolean'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Network_Server_Engineer_MS_Windows__c": {
          name: 'Network_Server_Engineer_MS_Windows__c',
          type: 'boolean'
        },
        "Network_Server_Tech_Next_Buss_Day_SLA__c": {
          name: 'Network_Server_Tech_Next_Buss_Day_SLA__c',
          type: 'boolean'
        },
        "Network_Server_Technician_MS_Windows__c": {
          name: 'Network_Server_Technician_MS_Windows__c',
          type: 'boolean'
        },
        "Network_Srv_Engr_Next_Business_Day_SLA__c": {
          name: 'Network_Srv_Engr_Next_Business_Day_SLA__c',
          type: 'boolean'
        },
        "Network_Storage_Engineer_Level_2__c": {
          name: 'Network_Storage_Engineer_Level_2__c',
          type: 'boolean'
        },
        "Network_Storage_Engr_Next_Buss_Day_SLA__c": {
          name: 'Network_Storage_Engr_Next_Buss_Day_SLA__c',
          type: 'boolean'
        },
        "Next_Business_Day_Service__c": {
          name: 'Next_Business_Day_Service__c',
          type: 'boolean'
        },
        "OwnerId": {
          name: 'OwnerId',
          type: 'string'
        },
        "PhotoUrl": {
          name: 'PhotoUrl',
          type: 'string'
        },
        "Project_Manager_Onsite_IT_Project__c": {
          name: 'Project_Manager_Onsite_IT_Project__c',
          type: 'boolean'
        },
        "Project_Mgr_Onsite_Next_Business_Day_SLA__c": {
          name: 'Project_Mgr_Onsite_Next_Business_Day_SLA__c',
          type: 'boolean'
        },
        "Rate_US_17__c": {
          name: 'Rate_US_17__c',
          type: 'number'
        },
        "Rate_US_20__c": {
          name: 'Rate_US_20__c',
          type: 'number'
        },
        "Rate_US_22__c": {
          name: 'Rate_US_22__c',
          type: 'number'
        },
        "RecordTypeID__c": {
          name: 'RecordTypeID__c',
          type: 'string'
        },
        "RecordTypeId": {
          name: 'RecordTypeId',
          type: 'string'
        },
        "Record_Id__c": {
          name: 'Record_Id__c',
          type: 'string'
        },
        "Same_Day_Service__c": {
          name: 'Same_Day_Service__c',
          type: 'boolean'
        },
        "Sample_copy_of_invoice_from_Vendor__c": {
          name: 'Sample_copy_of_invoice_from_Vendor__c',
          type: 'boolean'
        },
        "Scanned_Copy_Cancelled_cheque_fromBank__c": {
          name: 'Scanned_Copy_Cancelled_cheque_fromBank__c',
          type: 'boolean'
        },
        "Service_Global_Ref__c": {
          name: 'Service_Global_Ref__c',
          type: 'string'
        },
        "SystemModstamp": {
          name: 'SystemModstamp',
          type: 'Date'
        },
        "Tax_Identification_Number_certcopy__c": {
          name: 'Tax_Identification_Number_certcopy__c',
          type: 'boolean'
        },
        "Vendor_Type__c": {
          name: 'Vendor_Type__c',
          type: 'string'
        },
        "isShippingAddressChanged__c": {
          name: 'isShippingAddressChanged__c',
          type: 'boolean'
        },
        "zeitzone__BillingLTFactor__c": {
          name: 'zeitzone__BillingLTFactor__c',
          type: 'string'
        },
        "Webcase_Account_Name__c": {
          name: 'Webcase_Account_Name__c',
          type: 'string'
        },
        "BillingStreet": {
          name: 'BillingStreet',
          type: 'string'
        },
        "BillingCity": {
          name: 'BillingCity',
          type: 'string'
        },
        "BillingState": {
          name: 'BillingState',
          type: 'string'
        },
        "BillingCountry": {
          name: 'BillingCountry',
          type: 'string'
        },
        "BillingPostalCode": {
          name: 'BillingPostalCode',
          type: 'string'
        },
        "Billing_country_Code__c": {
          name: 'Billing_country_Code__c',
          type: 'string'
        },
        "Account_Number__c": {
          name: 'Account_Number__c',
          type: 'string'
        },
        "Master_Project__c": {
          name: 'Master_Project__c',
          type: 'string'
        },
        "ShippingStreet": {
          name: 'ShippingStreet',
          type: 'string'
        },
        "ShippingCity": {
          name: 'ShippingCity',
          type: 'string'
        },
        "ShippingState": {
          name: 'ShippingState',
          type: 'string'
        },
        "ShippingCountry": {
          name: 'ShippingCountry',
          type: 'string'
        },
        "ShippingPostalCode": {
          name: 'ShippingPostalCode',
          type: 'string'
        },
        "Shipping_country_Code__c": {
          name: 'Shipping_country_Code__c',
          type: 'string'
        },
        "geolocation__c": {
          name: 'geolocation__c',
          type: 'GeoPoint'
        },
        "geolocation__Latitude__s": {
          name: 'geolocation__Latitude__s',
          type: 'number'
        },
        "geolocation__Longitude__s": {
          name: 'geolocation__Longitude__s',
          type: 'number'
        },
        "Partner_Account__c": {
          name: 'Partner_Account__c',
          type: 'string'
        },
        "Standard_Supported_FSL__c": {
          name: 'Standard_Supported_FSL__c',
          type: 'string'
        },
        "Regional_FSL_Gateway1__c": {
          name: 'Regional_FSL_Gateway1__c',
          type: 'string'
        },
        "FSL_Location_Status__c": {
          name: 'FSL_Location_Status__c',
          type: 'string'
        },
        "Standard_Coverage_Message__c": {
          name: 'Standard_Coverage_Message__c',
          type: 'string'
        },
        "FileCounter": {
          name: 'FileCounter',
          type: 'number'
        },
        "FolderLastModifiedOn": {
          name: 'FolderLastModifiedOn',
          type: 'Date'
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
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Partner_Account__c',
          keyTo: 'sfdcId'
        },
        supportedFslAccount: {
          name: 'supportedFslAccount',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Standard_Supported_FSL__c',
          keyTo: 'sfdcId'
        },
        users: {
          name: 'users',
          type: 'Users',
          model: 'Users',
          relationType: 'belongsTo',
                  keyFrom: 'CreatedById',
          keyTo: 'sfdcId'
        },
        pricelist: {
          name: 'pricelist',
          type: 'Pricelist',
          model: 'Pricelist',
          relationType: 'belongsTo',
                  keyFrom: 'Default_Pricelist__c',
          keyTo: 'sfdcId'
        },
        program: {
          name: 'program',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Master_Project__c',
          keyTo: 'sfdcId'
        },
        RecordType: {
          name: 'RecordType',
          type: 'RecordType',
          model: 'RecordType',
          relationType: 'belongsTo',
                  keyFrom: 'RecordTypeId',
          keyTo: 'sfdcId'
        },
        geoMessage: {
          name: 'geoMessage',
          type: 'GeoMessage',
          model: 'GeoMessage',
          relationType: 'belongsTo',
                  keyFrom: 'Standard_Coverage_Message__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
