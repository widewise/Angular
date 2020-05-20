import { NgModule } from '@angular/core';

import { CartListComponent, CartItemComponent } from './components';
import { SharedModule } from '../shared/shared.module';

const comp = [CartListComponent, CartItemComponent];
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [...comp],
  exports: [...comp]
})
export class CartModule {}
