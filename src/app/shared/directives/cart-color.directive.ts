import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCartColor]'
})
export class CartColorDirective {

  @HostBinding('class')
  attrClass = 'leaveColor';

  @HostListener('mouseenter', ['$event'])
  enter() {
      this.attrClass = 'enterColor';
  }

  @HostListener('mouseleave', ['$event'])
  leave() {
      this.attrClass = 'leaveColor';
  }
}
