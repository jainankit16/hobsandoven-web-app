import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
    selector: '[jobsiteBackground]'
})

export class JobsiteBackgroundDirective implements OnInit {

    @Input() jobsiteData: any;
    private mvvpList: any[];

    constructor(
        private el: ElementRef,
        private renderer: Renderer
    ) { }

    ngOnInit() {
        this.backgroundColor(this.jobsiteData, this.renderer, this.el)
    }

    backgroundColor(jobsite, renderer, el) {
        if (jobsite.jobsiteContacts.length >= 3 && jobsite.jobsiteKeyContact) {
            jobsite.jobsiteContacts.forEach(element => {
                if (element.contact && element.contact.LastName && element.contact.Email && element.contact.Phone) {
                    if (jobsite.Jobsite_Key_Contact__c) {
                        renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'lightgreen');
                    } else {
                        renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'red');
                    }
                } else {
                    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'red');
                }
            });
        } else {
            renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'red');
        }
        if (!jobsite['GeoMetro']) {
            renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'red');
        }
    }
}
