import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstComponent } from './components/first.component';

const comp = [FirstComponent];
@NgModule({
  imports: [CommonModule],
  declarations: [...comp],
  exports: [...comp]
})
export class FirstModule {}
