import { Component, OnInit, Input } from '@angular/core';
import { DashboardApi } from '../../../sdk/services/custom/Dashboard';
import { PreloaderService } from '../../../services/preloader.service';

@Component({
    selector: 'case-detail',
    templateUrl: './case-detail.component.html',
    styleUrls: ['./case-detail.component.css']
})

export class CaseDetailComponent implements OnInit {

    @Input('case') case: any;
    caseDetail = {};
    caseComments = [];

    constructor(
        private _preloaderService: PreloaderService,
        private _dashboardApi: DashboardApi
    ) { }

    ngOnInit() {
        this.caseDetail = this.case;
        if (this.caseDetail['sfdcId']) {
            this.loadCaseComments(this.caseDetail['sfdcId']);
        }
    }

    loadCaseComments(caseId) {
        this._preloaderService.showPreloader();
        this.caseComments = []
        const paramObj = {
            'caseId': caseId,
            'models': ['CaseComment']
        };
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['caseComments'] && data['caseComments']['list']) {
                        this.caseComments = data['caseComments']['list'];
                    }
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                console.log('Error fetching data>>', error.message);
                this._preloaderService.hidePreloader();
            }
        );
    }
}
