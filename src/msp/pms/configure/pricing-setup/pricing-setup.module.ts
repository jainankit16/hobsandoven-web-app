import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PMSSharedModule } from '../../../../shared/pms-components/pms-shared.module';
import { MSPSharedModule } from '../../shared/msp-shared.module';
import { QuoteService } from '../../../../shared/services/pms/quote.service';
/*All component imported here*/
import { PricingSetupComponent } from './pricing-setup.component';
import { ProfitAnalysisComponent } from './profit-analysis/profit-analysis.component';
import { VendorCostingComponent } from './vendor-costing/vendor-costing.component';
import { ServiceProviderLocationsComponent } from './service-provider-locations/service-provider-locations.component';

@NgModule({
    imports: [
        FormsModule,
        NgbModule,
        CommonModule,
        ReactiveFormsModule,
        PMSSharedModule,
        MSPSharedModule
    ],
    declarations: [
        PricingSetupComponent,
        ProfitAnalysisComponent,
        VendorCostingComponent,
        ServiceProviderLocationsComponent
    ],
    providers: [QuoteService]
})

export class PricingSetupModule { }
