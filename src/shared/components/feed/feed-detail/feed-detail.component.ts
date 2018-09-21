import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivityApi } from '../../../sdk';
import { PreloaderService } from '../../../services/preloader.service';

@Component({
    selector: 'app-feed-detail',
    templateUrl: './feed-detail.component.html',
    styleUrls: ['./feed-detail.component.css']
})
export class FeedDetailComponent implements OnInit, OnDestroy {
    @Input() modelId: any;
    @Input() embeddedView = false;
    errorMessage: string;
    feed: any;
    logDataItems: any = [];

    constructor(
        private _activityApi: ActivityApi,
        private _preloaderService: PreloaderService
    ) { }

    ngOnInit() {
        this.getFeedDetails(this.modelId);
    }

    getFeedDetails(feedId) {
        this._preloaderService.showPreloader();
        this._activityApi
            .findOne({
                where: {
                    id: feedId
                }
            })
            .subscribe(
                result => {
                    this.feed = result;
                    if (this.feed && this.feed.log) {
                        const logData = this.feed.log;
                        logData.forEach((item) => {
                            Object.keys(item).forEach(key => {
                                const description = (item[key].description) ? item[key].description : key;
                                let type = 'string';
                                const IsoDateRe = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z$');
                                const matches = IsoDateRe.exec(item[key].oldValue) || IsoDateRe.exec(item[key].newValue);
                                if (matches) {
                                    type = 'date';
                                }
                                this.logDataItems.push({
                                    oldValue: item[key].oldValue,
                                    newValue: item[key].newValue,
                                    type: type,
                                    description: description
                                });
                            });
                        });
                    }
                    this._preloaderService.hidePreloader();
                },
                error => {
                    this.errorMessage = error.message;
                    this._preloaderService.hidePreloader();
                }
            );
    }
    ngOnDestroy() { }
}



