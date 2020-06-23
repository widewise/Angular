import { Component, OnInit } from '@angular/core';
import { ProductModel, Product } from './../../models/product.model';
import { Store, select } from '@ngrx/store';
import { AppState, selectProductsData, selectProductsError } from './../../../core/@ngrx';
import { Observable } from 'rxjs';
import * as ProductsActions from './../../../core/@ngrx/products/products.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<ReadonlyArray<Product>>;
  productsError$: Observable<Error | string>;

  constructor(
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(selectProductsData));
    this.productsError$ = this.store.pipe(select(selectProductsError));
  }

  async onBuyProduct(product: ProductModel) {
    const productToBuy: Product = { ...product };
    this.store.dispatch(ProductsActions.buyProduct({ product: productToBuy }));
  }

  onViewProduct(product: ProductModel): void {
    const link = ['/product', product.id];
    this.store.dispatch(RouterActions.go({
      path: link
    }));
  }
}
