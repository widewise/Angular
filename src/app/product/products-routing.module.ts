import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent, ProductFormComponent } from './components';

const routes: Routes = [
  {
    path: 'products-list',
    component: ProductListComponent
  },
  {
    path: 'product/:productID',
    component: ProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
  static components = [ProductListComponent, ProductFormComponent];
}
