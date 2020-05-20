import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartColorDirective, FontChangeDirective } from './directives';

const comp = [CartColorDirective, FontChangeDirective];
@NgModule({
  imports: [CommonModule],
  declarations: [...comp],
  exports: [...comp]
})
export class SharedModule {}
