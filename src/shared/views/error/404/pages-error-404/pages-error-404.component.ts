import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../../../services/app-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages-error-404',
  templateUrl: './pages-error-404.component.html',
  styleUrls: ['./pages-error-404.component.css']
})
export class PagesError404Component implements OnInit {

  constructor(
    private _appState: AppStateService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  goBack() {
    if (window.history.go(-1) === undefined) {
      const homeUrl = this._appState.getHomeUrl();
      this._router.navigate([homeUrl]);
    } else {
      window.history.go(-1);
    }
  }

}
