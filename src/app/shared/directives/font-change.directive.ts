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
      const currentFont = this.el.nativeElement.font;
      console.log(`Font = ${currentFont}`);
      this.renderer.setStyle(this.el.nativeElement, 'font', currentFont * 2);
  }
}
