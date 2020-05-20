import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about.component';
import { SharedModule } from '../shared/shared.module';

const comp = [AboutComponent];
@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [...comp],
  exports: [...comp]
})
export class LayoutModule {}
