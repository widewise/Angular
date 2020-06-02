import { NgModule } from '@angular/core';

import { ProductComponent } from './components';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductsRoutingModule.components,
    ProductComponent
  ]
})
export class ProductModule {}
