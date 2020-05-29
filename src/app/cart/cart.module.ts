import { NgModule } from '@angular/core';

import { CartItemComponent } from './components';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CartRoutingModule
  ],
  declarations: [
    CartRoutingModule.components,
    CartItemComponent
  ]
})
export class CartModule {}
