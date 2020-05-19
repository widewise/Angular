import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartListComponent } from './components/cart-list.component';
import { CartItemComponent } from './components/cart-item.component';
import { SharedModule } from '../shared/shared.module';

const comp = [CartListComponent, CartItemComponent];
@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [...comp],
  exports: [...comp]
})
export class CartModule {}
