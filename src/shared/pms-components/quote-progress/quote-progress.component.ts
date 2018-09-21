import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/pms/shared.services';
import { QuoteService } from '../../services/pms/quote.service';
import { PreloaderService } from '../../services/preloader.service';
import { JobsiteApi } from '../..//sdk/services/custom/Jobsite';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'quote-progress',
    templateUrl: './quote-progress.component.html'
})
export class QuoteProgressComponent implements OnInit {
    userState: any;
    programName: string;
    programCode: string;
    jobsiteCount: number;
    partnerName: string;
    isShowProgram = true;

    constructor(
        private _sharedService: SharedService,
        private _quoteService: QuoteService,
        private _jobsiteApi: JobsiteApi,
        private _preloaderService: PreloaderService,
        private _location: Location,
        private activatedRoute: ActivatedRoute) {
        if (this._location.path().indexOf('list-details') !== -1) {
            this.activatedRoute.params.subscribe(params => {
                if (!params['id']) {
                    this.isShowProgram = false;
                } else {
                    this.isShowProgram = true;
                }
            });
        }
    }

    ngOnInit() {
        this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
            this.programName = '';
            this.programCode = '';
            this.jobsiteCount = 0;
            if (this.userState && this.userState.program && this.userState.program.programSFId) {
                this.programName = this.userState.program.programName;
                this.programCode = this.userState.program.programReferCode;
                if (this.userState.program.jobsiteCount) {
                    this.jobsiteCount = this.userState.program.jobsiteCount;
                } else {
                    if (this.userState.program.programSFId) {
                        this.getJobsiteCount();
                    }

                }
            }
            this.partnerName = '';
            if (this.userState && this.userState.partner !== undefined) {
                this.partnerName = this.userState.partner.name;
            }
        });
        this._quoteService.getQuoteState().subscribe(quoteState => {
            this.jobsiteCount = 0;
            if (quoteState.jobsiteCount !== undefined) {
                this.jobsiteCount = quoteState.jobsiteCount;
            }
        });
    }

    getJobsiteCount() {
        const req = {
            'programId': this.userState.program.programSFId,
            'source': 'list-jobsites',
            'fields': ['sfdcId']
        }
        this._jobsiteApi.getJobsitesByMasterProject(req).subscribe(
            result => {
                if (result && result.data && result.data.totalCount) {
                    this.jobsiteCount = result.data.totalCount;
                    this.userState.program.jobsiteCount = result.data.totalCount;
                };
                this._preloaderService.hidePreloader();
            },
            err => {
                console.log(err);
                this._preloaderService.hidePreloader();
            }
        );
    }


}
