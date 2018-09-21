import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreloaderService } from '../../../../shared/services/preloader.service';
import { Location } from '@angular/common'

import { PricelistItemApi } from '../../../../shared/sdk/services/custom/PricelistItem';

@Component({
    selector: 'app-pricelistitem-detail',
    templateUrl: './pricelistitem-detail.component.html',
    styleUrls: ['./pricelistitem-detail.component.css']
})
export class PriceListItemDetailComponent implements OnInit {

    private sub: any;
    private sfdcId: string;
    pricelistItem: any;
    title: any;
    errorMessage: any;
    @Input()
    get modelId() {
        return this.sfdcId;
    }
    set modelId(value) {
        this.sfdcId = value;
        this.getPriceListItem(this.sfdcId)
    }

    constructor(private router: Router,
        private route: ActivatedRoute,
        private pricelistItemApi: PricelistItemApi,
        private preloaderService: PreloaderService,
        private location: Location) {
        this.sub = this.route.params.subscribe(params => {
            this.sfdcId = params['id'];
        });

        this.title = this.sfdcId;

    }

    ngOnInit() {
        this.getPriceListItem(this.sfdcId)
    }

    onTabClicked(event) {
        //do as needed
    }

    goback(): void {
        this.location.back();
    }

    getPriceListItem(sfdcId) {
        this.preloaderService.showPreloader();
        this.pricelistItemApi.findOne({ where: { sfdcId: sfdcId } }).subscribe(payment => {
            this.pricelistItem = payment;
            this.preloaderService.hidePreloader();
        }, error => {
            this.errorMessage = error.message;
            this.preloaderService.hidePreloader();
        });
    }

}
