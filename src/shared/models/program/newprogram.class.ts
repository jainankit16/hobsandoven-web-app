export class dispatchProfile {
    id: number;
    jobsite: any;
    talentType: any;
    technicalLevel: string;
    slaPriority: string;
    coverageHrs: any;
    status: string;
    serviceZone: string;
    country: string;
    jobsiteSFID: string;
    talentTypeID: string;
    vendorAccountID: string;
    vendorID: string;
    Service_Type__c: string;

    constructor(
        id: number,
        jobsite: any,
        talentType: any,
        technicalLevel: string,
        slaPriority: string,
        coverageHrs: any,
        status: string,
        serviceZone: string,
        country: string,
        jobsiteSFID: string,
        talentTypeID: string,
        vendorAccountID: string,
        vendorID: string,
        Service_Type__c: string) {
        this.id = id;
        this.jobsite = jobsite;
        this.talentType = talentType;
        this.technicalLevel = technicalLevel;
        this.slaPriority = slaPriority;
        this.coverageHrs = coverageHrs;
        this.status = status;
        this.serviceZone = serviceZone;
        this.country = country;
        this.jobsiteSFID = jobsiteSFID;
        this.talentTypeID = talentTypeID;
        this.vendorAccountID = vendorAccountID;
        this.vendorID = vendorID;
        this.Service_Type__c = Service_Type__c;
    }
}