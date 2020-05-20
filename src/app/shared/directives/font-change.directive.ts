import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFontChange]'
})
export class FontChangeDirective {

    constructor(
        private el: ElementRef,
        private renderer: Renderer2) {}

  @HostListener('click')
  click() {
      this.renderer.setStyle(this.el.nativeElement, 'fontSize', '40px');
  }

}
