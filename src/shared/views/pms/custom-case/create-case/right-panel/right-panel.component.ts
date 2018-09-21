import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'case-right-panel',
    templateUrl: './right-panel.component.html'
})

export class RightPanelComponent {
    price: string;
    coverageHours: string;
    profileType = 'Standard Service Profile';
    customData: any;
    jobsiteCount: any;
    defaultData: any;
    formData: any;
    contentData: any;
    jobsiteData: any;
    incidentType = 'Standard Incident Service Profile';
    isCoveragePlans = false;
    vendorRoutingText: any;
    private data = {};
    @Input()
    set dataInput(dataInput) {
        this.formData = dataInput;
        this.onDataChanges();
    }

    constructor(private _modalService: NgbModal) {
        this.jobsiteData = {};
    }

    onDataChanges() {
        this.vendorRoutingText = 'Fail';
        this.setProfileData();
        if (this.formData !== undefined && this.formData.hasOwnProperty('profileInfo') && this.formData.hasOwnProperty('caseDetail')) {
            this.jobsiteData = this.formData.caseDetail.jobsiteDetail.jobsites[0];
            if (this.formData.caseDetail.productDetail.hasOwnProperty('partnerPricelist')
                && this.formData.caseDetail.productDetail.partnerPricelist.length > 0) {
                switch (this.formData.profileInfo.ppm) {
                    case '2':
                        this.price = this.formData.caseDetail.productDetail.partnerPricelist[0].PPE_2HR_Standard_Price__c;
                        break;
                    case '4':
                        this.price = this.formData.caseDetail.productDetail.partnerPricelist[0].PPE_4HR_Standard_Price__c;
                        break;
                    case '6':
                        this.price = this.formData.caseDetail.productDetail.partnerPricelist[0].PPE_2HR_Standard_Price__c +
                            this.formData.caseDetail.productDetail.partnerPricelist[0].PPE_4HR_Standard_Price__c;
                        break;
                    case '8':
                        this.price = this.formData.caseDetail.productDetail.partnerPricelist[0].PPE_8HR_Standard_Price__c;
                        break;
                }
                this.setPricingIncidentData();
            }
            this.coverageHours = this.formData.profileInfo.coverage;
            this.setRoutingSummary();
        } else {
            this.jobsiteData = {};
            this.customData = {};
            this.defaultData = {};
        }
    }

    setPricingIncidentData() {
        if (this.formData.caseDetail.productDetail.partnerPricelist.length > 0) {
            this.data['priceBookName'] = this.formData.caseDetail.productDetail.partnerPricelist[0].Pricelist.Name;
            this.data['productName'] = this.formData.caseDetail.productDetail.partnerPricelist[0].Product.Name;
            this.data['Product_ID__c'] = this.formData.caseDetail.productDetail.partnerPricelist[0].Product.Product_ID__c;
            this.data['Description'] = this.formData.caseDetail.productDetail.partnerPricelist[0].Product.Description;
            this.data['ppm'] = this.formData.profileInfo.ppm;
            this.data['currency'] = this.formData.caseDetail.productDetail.partnerPricelist[0].Pricelist.CurrencyIsoCode;
            this.data['additionalHours'] =
                this.formData.caseDetail.productDetail.partnerPricelist[0].Pricelist.Additional_Hours_T_M_Standard_Price__c;
            this.data['totalPrice'] = this.price;
        } else {
            this.data = {};
        }
    }

    setProfileData() {
        if (this.formData && this.formData.profileInfo &&
            this.formData.profileInfo.type === 'Custom Incident Service Profile: Create Custom Service Item Request') {
            this.profileType = 'Custom Service Profile';
            this.incidentType = 'Custom Incident Service Profile';
            this.isCoveragePlans = this.formData.profileInfo.coverage === '9H5D' ? false : true;
        } else {
            this.profileType = 'Standard Service Profile';
            this.incidentType = 'Standard Incident Service Profile';
            this.isCoveragePlans = false;
        }

        this.defaultData = this.data;
    }
    setRoutingSummary() {
        if (this.formData.caseDetail.productDetail.hasOwnProperty('vendorDetail') &&
            Object.keys(this.formData.caseDetail.productDetail.vendorDetail).length) {
            this.vendorRoutingText = 'Pass';
        }
    }
    /* Function that set type of creation Jobsite */
    updateJobsiteCount(value) {
        this.jobsiteCount = value
    }
    openDetailPage(content, _size, dataRow) {
        this._modalService.open(content, { size: _size });
        this.contentData = dataRow;
    }
}
