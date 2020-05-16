import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product.component';
import { ProductListComponent } from './components/product-list.component';

const comp = [ProductComponent, ProductListComponent];
@NgModule({
  imports: [CommonModule],
  declarations: [...comp],
  exports: [...comp]
})
export class ProductModule {}
