import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuoteComponent } from './quote/quote.component';
import { QuotePricingComponent } from './quote-pricing/quote-pricing.component'
import { SelectedJobSitesComponent } from './jobsites/selected-jobsite.component';
import { ProviderComponent } from './provider/provider.component';
import { ProviderIronComponent } from './provider/provider-iron.component';
import { ProviderGlobalComponent } from './provider/provider-global.component';

@NgModule({
imports: [CommonModule, FormsModule, NgbModule],
declarations: [QuoteComponent, SelectedJobSitesComponent, QuotePricingComponent, ProviderComponent,
    ProviderIronComponent, ProviderGlobalComponent],
exports: [QuoteComponent, SelectedJobSitesComponent, QuotePricingComponent, ProviderComponent,
    ProviderIronComponent, ProviderGlobalComponent]
})
export class ConfigureModule { }
