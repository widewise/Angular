import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent, ProductListComponent } from './components';

const comp = [ProductComponent, ProductListComponent];
@NgModule({
  imports: [CommonModule],
  declarations: [...comp],
  exports: [...comp]
})
export class ProductModule {}
