import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCartColor]'
})
export class CartColorDirective {
  @HostBinding('class')
  attrClass: string = 'leaveColor';

  constructor() {}

  @HostListener('mouseenter', ['$event'])
  enter() {
      this.attrClass = 'enterColor';
  }

  @HostListener('mouseleave', ['$event'])
  leave() {
      this.attrClass = 'leaveColor';
  }
  @Input('appBackGroundOnHover') backgroundColor: string;
}