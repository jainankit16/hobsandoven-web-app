import { Component, OnInit, Input } from '@angular/core';
import { DashboardApi } from '../../../sdk/services/custom/Dashboard';


@Component({
    selector: 'workorder-detail',
    templateUrl: './workorder-detail.component.html',
    styleUrls: ['./workorder-detail.component.css']
})
export class WorkorderDetailComponent implements OnInit {

    @Input('workorder') workorder: any;
    private workorderDetail = [];

    tableData = [];
    // tableResource: any;
    loadingIndicator = false;
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 20;
    errorMessage: any;

    constructor(
        private _dashboardApi: DashboardApi,
    ) { }

    ngOnInit() {
        if (this.workorder['sfdcId']) {
            this.WorkOrderLineDetails(0);
        }
    }

    WorkOrderLineDetails(offset: any) {
        this.loadingIndicator = true;
        this.errorMessage = '';
        this.workorderDetail = [];
        let paramObj = {
            'workOrderId': this.workorder['sfdcId'],
            'models': ['JobOrderItem']
        };
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    if (data['jobOrderItems'] && data['jobOrderItems']['list']) {
                        this.workorderDetail = data['jobOrderItems']['list'];
                    }
                    this.getWorkOrderLineDetails(0);
                } else {
                    this.errorMessage = 'No record found';
                }
                this.loadingIndicator = false;
            },
            error => {
                this.errorMessage = error.message;
                this.loadingIndicator = false;
            }
        );
    }

    getWorkOrderLineDetails(offset) {
        if (!this.isLoadMore) {
            this.tableData = this.workorderDetail;
            this.errorMessage = this.workorderDetail.length ? '' : 'No record found';
        } else {
            this.workorderDetail.forEach(c => {
                this.tableData.push(c);
            });
            this.tableData = [...this.tableData];
            this.loadingIndicator = false;
        }
    }

    rowTooltip(item) {
        return item.sfdcId;
    }
}

