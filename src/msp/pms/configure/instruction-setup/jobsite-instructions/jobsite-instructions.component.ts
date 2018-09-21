import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'jobsite-instructions',
  templateUrl: './jobsite-instructions.component.html'
})
export class JobsiteInstructionsComponent implements OnInit {
  @Input() jobSiteInstructions: any[];

  constructor() {}

  ngOnInit() {}
}
