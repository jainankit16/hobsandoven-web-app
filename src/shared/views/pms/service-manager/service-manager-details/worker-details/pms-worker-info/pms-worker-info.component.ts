import { Component, OnInit, Input } from '@angular/core';
import { PreloaderService } from './../../../../../../services/preloader.service';
import { CaseApi } from './../../../../../../sdk';

@Component({
  selector: 'app-pms-worker-info',
  templateUrl: './pms-worker-info.component.html',
  styleUrls: ['./pms-worker-info.component.css']
})
export class PmsWorkerInfoComponent implements OnInit {
  @Input() page: string;
  @Input() caseId: string;
  data: any;

  constructor(
    private _caseApi: CaseApi,
    private _preloaderService: PreloaderService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.getWorkerDetails(this.caseId);
  }

  getWorkerDetails(caseId) {
    this._preloaderService.showPreloader();
    this._caseApi.find({
      where: { id: caseId },
      fields: ['Dispatch_Worker__c'],
      include: [{
        relation: 'worker',
        scope: {
          fields: ['Primary_Worker_Skilling_Profile__c', 'Name', 'Worker_Type__c', 'Work_Phone_Number__c'],
          include: [
            {
              relation: 'skilling',
              scope: {
                fields: ['Status__c']
              }
            }
          ]
        }
      }]
    }).subscribe(
      res => {
        this.data = res[0];
        this._preloaderService.hidePreloader();

      }, err => {
        this._preloaderService.hidePreloader();
      })


  }

}
