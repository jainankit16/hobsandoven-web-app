import { Component, OnInit, Input } from '@angular/core';
import { PreloaderService } from './../../../../../../services/preloader.service';
import { CaseApi } from './../../../../../../sdk/services/custom/Case';

@Component({
  selector: 'app-pms-hardware-all',
  templateUrl: './pms-hardware-all.component.html',
  styleUrls: ['./pms-hardware-all.component.css']
})
export class PmsHardwareAllComponent implements OnInit {
  @Input() page: string;
  @Input() caseId: string;
  caseData: any;
  constructor(private _preloaderService: PreloaderService,
    private _caseApi: CaseApi) {

  }
  ngOnInit() { }

}
