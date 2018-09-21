import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PreloaderService } from '../../../services/preloader.service';
import { DashboardApi } from '../../../sdk/services/custom/Dashboard';

@Component({
    selector: 'program-detail',
    templateUrl: './program-detail.component.html',
    styleUrls: ['./program-detail.component.css']
})

export class ProgramDetailComponent implements OnInit {

    @Input('program') program: any;
    programDetail: any;

    constructor(
        private _dashboardApi: DashboardApi,
        private _preloaderService: PreloaderService
    ) { }

    ngOnInit() {
        if (this.program && this.program['sfdcId']) {
            this.programDetail = this.program;
        } else {
            this.getProgramDetails()
        }
    }


    getProgramDetails() {
        this._preloaderService.showPreloader();
        const paramObj = {
            'programId': this.program,
            'models': ['Project']
        };

        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    this.programDetail = data.data.programs.list[0];
                    this._preloaderService.hidePreloader();
                }
            }, error => {
                console.log('Error fetching data>>', error.message);
                this._preloaderService.hidePreloader();
            }
        )
    }
}
