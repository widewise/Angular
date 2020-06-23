import { Component, OnInit } from '@angular/core';

import { ProductModel, Product } from './../../../product/models/product.model';
import { AppState, selectProductsData, selectProductsError } from './../../../core/@ngrx/';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

@Component({
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products$: Observable<ReadonlyArray<Product>>;
  productsError$: Observable<Error | string>;

  constructor(
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(selectProductsData));
    this.productsError$ = this.store.pipe(select(selectProductsError));
  }

  onCreateProduct() {
    this.store.dispatch(RouterActions.go({
      path: ['/admin/product/add']
    }));
  }

  onEditProduct(product: ProductModel): void {
    const link = ['/admin/product/edit', product.id];
    this.store.dispatch(RouterActions.go({
      path: link
    }));
  }
}
