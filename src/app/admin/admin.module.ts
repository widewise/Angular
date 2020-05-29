import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductItemComponent } from './components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminRoutingModule.components,
    ProductItemComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
