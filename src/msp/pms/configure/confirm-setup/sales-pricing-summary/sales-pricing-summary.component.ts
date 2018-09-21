import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sales-pricing-summary',
  templateUrl: './sales-pricing-summary.component.html'
})
export class SalesPricingSummaryComponent implements OnInit {
@Input() selectedPricing
  constructor() { }

  ngOnInit() {
  }

}
