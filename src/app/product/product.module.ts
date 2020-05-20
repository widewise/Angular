import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent, ProductListComponent } from './components';
import { SharedModule } from '../shared/shared.module';

const comp = [ProductComponent, ProductListComponent];
@NgModule({
  imports: [SharedModule],
  declarations: [...comp],
  exports: [...comp]
})
export class ProductModule {}
