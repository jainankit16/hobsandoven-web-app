import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PreloaderService } from '../../services/preloader.service';

@Component({
  selector: 'app-preloader',
  styleUrls: ['preloader.component.css'],
  templateUrl: './preloader.component.html'
})
export class PreloaderComponent implements OnInit {
  showloader = false;
  constructor(
    public preloaderService: PreloaderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.preloaderService
      .getShowLoader()
      .subscribe(res => ((this.showloader = res), this.detectChanges()));
  }

  detectChanges() {
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }
}

