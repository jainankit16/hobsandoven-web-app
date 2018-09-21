import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { PreloaderService } from '../../services/preloader.service';
import { ActivityApi } from '../../sdk';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'app-feed-timeline',
    templateUrl: './feed-timeline.component.html'
})
export class FeedTimelineComponent implements OnInit {
    @Input() modelId;
    @Input() modelName;
    errorMessage = '';
    pageTitle: any;
    filterCondition: any;
    feeds = [];
    typeIcon: Object;

    orderBy = 'createdAt DESC';
    ExpandViewTitle: any;
    currentExpandViewId: any;

    constructor(
        private _activityApi: ActivityApi,
        private _preloaderService: PreloaderService,
        private _cd: ChangeDetectorRef,
        private _fb: FormBuilder,
        private _modalService: ModalService
    ) { }

    ngOnInit() {
        this.getFeeds(0);
    }

    getFeeds(offset) {
        this._preloaderService.showPreloader();
        const findObj = this.getFilterCondition(offset);

        this._activityApi.find(findObj).subscribe(
            results => {
                this.feeds = results;
                this.typeIcon = {Update: 'fa fa-pencil-square', Create: 'fa fa-plus-square', Delete: 'fa fa-minus-square'};
                this._preloaderService.hidePreloader();
                this.errorMessage = results.length ? '' : 'Feed(s) not found for this ' + this.modelName;
            },
            err => {
                this.errorMessage = err.messages;
                this._preloaderService.hidePreloader();
            }
        );
    }

    getFilterCondition(offset) {
        const findObj = {
            where: {modelName: this.modelName, modelId: this.modelId},
            order: this.orderBy,
            skip: offset
        };

        return findObj;
    }

    openDetails(content, size, id, title) {
        this.ExpandViewTitle = title;
        this.currentExpandViewId = id;
        this._modalService.open(content, size);
    }
}
