import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent, ProductFormComponent } from './components';
import { ProductsStatePreloadingGuard, ProductExistsGuard } from './guards';

const routes: Routes = [
  {
    path: 'products-list',
    component: ProductListComponent,
    canActivate: [ProductsStatePreloadingGuard],
  },
  {
    path: 'product/:productID',
    component: ProductFormComponent,
    canActivate: [ProductExistsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
  static components = [ProductListComponent, ProductFormComponent];
}
