import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessOrderComponent } from './components';


const routes: Routes = [
  {
    path: '',
    component: ProcessOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
  static components = [ProcessOrderComponent];
}
