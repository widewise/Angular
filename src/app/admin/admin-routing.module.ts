import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent, ManageProductsComponent, ProductFormComponent, ManageOrdersComponent } from './components';
import { AuthGuard } from './../core';
import { ProductsStatePreloadingGuard, ProductExistsGuard } from './../product/guards';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'products',
            component: ManageProductsComponent,
            canActivate: [ProductsStatePreloadingGuard],
          },
          {
            path: 'product/add',
            component: ProductFormComponent
          },
          {
            path: 'product/edit/:productID',
            component: ProductFormComponent,
            canActivate: [ProductExistsGuard]
          },
          { path: 'orders', component: ManageOrdersComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  static components = [
    AdminComponent,
    AdminDashboardComponent,
    ManageProductsComponent,
    ProductFormComponent,
    ManageOrdersComponent
  ];

}
