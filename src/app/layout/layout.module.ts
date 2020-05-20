import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about.component';

const comp = [AboutComponent];
@NgModule({
  imports: [CommonModule],
  declarations: [...comp],
  exports: [...comp]
})
export class LayoutModule {}
