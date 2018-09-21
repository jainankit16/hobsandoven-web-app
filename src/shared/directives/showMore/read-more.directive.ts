import { Directive, Input, ElementRef, AfterViewInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[readMore]'
})

export class ReadMoreDirective implements AfterViewInit, OnChanges {
  @Input('readMore-length') private maxLength: number;
  @Input('readMore-element') private elementChange: HTMLElement;

  private currentText: string;
  private hideToggle = true;
  private text: string;
  private isCollapsed = true;

  constructor(private el: ElementRef) { }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit() {
    this.text = this.elementChange.innerHTML;
    this.toggleView(this);
    if (this.text.trim().length > 0 && (this.text.trim().length > this.maxLength)) {
      if (!this.hideToggle) {
        this.el.nativeElement.classList.remove('hidden');
      } else {
        this.el.nativeElement.classList.add('hidden');
      }
      this.el.nativeElement.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        this.toggleView(this);
      });
    } else {
      this.el.nativeElement.querySelector('.more').style.display = 'none';
      this.el.nativeElement.querySelector('.less').style.display = 'none';
    }
  }

  /**
   * @inheritDoc
   */
  public ngOnChanges() {
    if (this.text) {
      this.toggleView(this);
    }
  }
  /**
   * Toogle view - full text or not
   */
  private toggleView(event): void {
    this.determineView(event);
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.el.nativeElement.querySelector('.more').style.display = 'none';
      this.el.nativeElement.querySelector('.less').style.display = 'inherit';
    } else {
      this.el.nativeElement.querySelector('.more').style.display = 'inherit';
      this.el.nativeElement.querySelector('.less').style.display = 'none';
    }
  }

  /**
   * Determine view
   */
  private determineView(event): void {
    const _elementChange = event.elementChange;
    if (this.text.length <= this.maxLength) {
      this.currentText = this.text;
      _elementChange.innerHTML = this.currentText;
      this.isCollapsed = false;
      this.hideToggle = true;
      return;
    }
    this.hideToggle = false;
    if (this.isCollapsed === true) {
      this.currentText = this.text.trim().substring(0, this.maxLength);
      _elementChange.innerHTML = this.currentText;
    } else if (this.isCollapsed === false) {
      this.currentText = this.text;
      _elementChange.innerHTML = this.currentText;
    }

  }
}
