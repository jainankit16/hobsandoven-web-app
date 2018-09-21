import { Component, OnInit, OnDestroy, Input , Output, EventEmitter} from '@angular/core';
import { PreloaderService } from '../../../../shared/services/preloader.service';
import { PricelistApi } from '../../../../shared/sdk/services/custom/Pricelist';

@Component({
    selector: 'app-pricelist-detail',
    templateUrl: './pricelist-detail.component.html',
    styleUrls: ['./pricelist-detail.component.css']
})
export class PriceListDetailComponent implements OnInit, OnDestroy {
    priceID: any;
    pricelist: any;
    title: any;
    errorMessage: any;
    @Output() loadPriceListItemDetail = new EventEmitter<any>();

    @Input()
    get modelId() {
        return this.priceID;
    }

    set modelId(value) {
        this.priceID = value;
        this.priceListDetails(this.priceID);
    }

    constructor(
        private pricelistApi: PricelistApi,
        private preloaderService: PreloaderService,
    ) {
    }

    ngOnInit() {
        this.priceListDetails(this.priceID);
    }
    ngOnDestroy() { }

    priceListDetails(priceID) {
        this.preloaderService.showPreloader();
        this.pricelistApi.findOne({ 'where': { sfdcId: priceID } }).subscribe(payment => {
            this.preloaderService.hidePreloader();
            this.pricelist = payment;
            this.title = this.pricelist.Name;
        },
            error => {
                this.errorMessage = error.message;
                this.preloaderService.hidePreloader();
            });
    }
    onTabClicked(event) {
        // do as needed
    }

    pricelistItemDetail($event) {
        this.loadPriceListItemDetail.emit($event);
    }
}
