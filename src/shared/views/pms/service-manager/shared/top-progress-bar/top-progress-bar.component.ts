import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppStateService } from './../../../../../services/app-state.service';
import { PreloaderService } from './../../../../../services/preloader.service';
import { CaseApi } from './../../../../../sdk/services/custom/Case';
@Component({
  selector: 'app-smc-top-progress-bar',
  templateUrl: './top-progress-bar.component.html',
  styleUrls: ['./top-progress-bar.component.css']

})
export class TopProgressBarComponent implements OnInit {
  wizardstepper: any[];
  caseData: any;
  caseId: any;
  backUrl: any;
  constructor(
    private _case: CaseApi,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _appState: AppStateService,
    private _preloaderService: PreloaderService
  ) {
  }
  ngOnInit() {
    this.getAppState();
    this.createTopWizardStepper();
    this._activatedRoute.params.subscribe(params => {
      this.caseData = [];
      if (params && params['id']) {
        this.caseId = params['id'];
        this.getTopWizardData();
      }
    });
  }
  createTopWizardStepper() {
    this.wizardstepper = [
      {
        name: 'Work Orders',
      },
      {
        name: 'Cases',
      },
      {
        name: 'Job',
      },
      {
        name: 'Assigned',
      },
      {
        name: 'Started',
      },
      {
        name: 'Delivered',
      },
      {
        name: 'Completed',
      },
      {
        name: 'Invoiced',
      },
      {
        name: 'Paid',
      },
      {
        name: 'Closed',
      },
      {
        name: 'Cancelled',
      }
    ];
  }
  /**
 * get application state
 */
  getAppState() {
    this._appState.getAppState().subscribe(appState => {
      if (appState && appState['redirectUrl']) {
        this.backUrl = appState['redirectUrl'];
      } else if (localStorage.getItem('redirectUrl')) {
        this.backUrl = localStorage.getItem('redirectUrl');
      }
    });
  }

  getTopWizardData() {
    this._preloaderService.showPreloader();
    this._case.getProgressBarData(this.caseId).subscribe(data => {
      if (data) {
        this.caseData = data;
        // this._appState.setSelectedAccount(data['AccountId']);
        this.wizardstepper[0]['active'] = true;
        this.wizardstepper[1]['active'] = true;

        if (this.caseData.Job) {
          this.wizardstepper[2]['active'] = true;
        }
        if (this.caseData['Job'] && this.caseData['Job']['Job_Status_Internal__c'] === 'Assigned') {
          this.wizardstepper[3]['active'] = true;

        }
        if (this.caseData['Job'] && this.caseData['Job']['Job_Status_Internal__c'] === 'Started') {
          this.wizardstepper[4]['active'] = true;

        }
        if (this.caseData['Job'] && this.caseData['Job']['Job_Status_Internal__c'] === 'Delivered') {
          this.wizardstepper[5]['active'] = true;

        }
        if (this.caseData['Job'] && this.caseData['Job']['Job_Status_Internal__c'] === 'Completed') {
          this.wizardstepper[6]['active'] = true;

        }
        if (this.caseData['Job'] && this.caseData['Job']['Job_Status_Internal__c'] === 'Invoiced') {
          this.wizardstepper[7]['active'] = true;

        }
        if (this.caseData['Job'] && this.caseData['Job']['Job_Status_Internal__c'] === 'Paid') {
          this.wizardstepper[8]['active'] = true;

        }
        if (this.caseData['Job'] && this.caseData['Job']['Job_Status_Internal__c'] === 'Closed') {
          this.wizardstepper[9]['active'] = true;

        }
        if (this.caseData['Job'] && this.caseData['Job']['Job_Status_Internal__c'] === 'Cancelled') {
          this.wizardstepper[10]['active'] = true;
        }
      }
      this._preloaderService.hidePreloader();
    })
  }


  onClickNavigate(path) {
    const query = {};
    /* Back Url `this.backUrl` and current Url `this._router.url` doesn't same.
       Path name doesn't `Confirm Order`
    */
    if (this.backUrl && (this.backUrl !== this._router.url) && path.name !== 'Confirm Order') {    
      if (path.name === 'Work Orders') {
        query['q'] = 'w'; // If path name is work order then query params is `w`
      } else if (path.name === 'Cases') {
        query['q'] = 'c'; // If path name is Cases then query params is `c`
      } else {
        query['q'] = path.name; // another path name use as same query params
      }
      this._router.navigate([this.backUrl], { queryParams: query });
    }
  }
  onClickRefresh() {
    this.getTopWizardData();
  }
}
