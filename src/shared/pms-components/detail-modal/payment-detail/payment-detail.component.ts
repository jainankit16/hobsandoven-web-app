import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'payment-detail',
    templateUrl: './payment-detail.component.html',
    styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
    @Input('payment') payment: any;
    private paymentDetails: any;
    constructor() { }

    ngOnInit() {
        console.log('payment', this.payment)
        this.paymentDetails = this.payment;
    }
}
