import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartColorDirective } from './directives/cart-color.directive'

const comp = [CartColorDirective];
@NgModule({
  imports: [CommonModule],
  declarations: [...comp],
  exports: [...comp]
})
export class SharedModule {}
