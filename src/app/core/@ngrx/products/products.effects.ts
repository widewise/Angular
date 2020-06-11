import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects, OnRunEffects, EffectNotification } from '@ngrx/effects';
import * as ProductsActions from './products.actions';

// rxjs
import { Observable } from 'rxjs';
import { concatMap, pluck, switchMap, takeUntil, tap, map } from 'rxjs/operators';

import { ProductService } from './../../../product/services/product.service';
import { ProductModel, Product } from '../../../product/models/product.model';
import * as RouterActions from './../router/router.actions';
import { CartService } from 'src/app/cart/services/cart.service';

@Injectable()
export class ProductsEffects implements OnInitEffects/*, OnRunEffects*/ {
  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private productService: ProductService) {
    console.log('[PRODUCTS EFFECTS]');
  }

  // Implement the OnRunEffects interface to control the lifecycle
  // of the resolved effects.
  // ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
  //   return resolvedEffects$.pipe(
  //     tap(val => console.log('ngrxOnRunEffects:', val)),
  //     // perform until create new product
  //     // only for demo purpose
  //     takeUntil(this.actions$.pipe(ofType(ProductsActions.createProduct)))
  //   );
  // }

  getProducts$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.getProducts),
    switchMap(action =>
      // Notice!
      // If you have a connection to the Firebase,
      // the stream will be infinite - you have to unsibscribe
      // This can be performed following this pattern
      // this.productObservableService
      //      .getProducts()
      //      .pipe(takeUntil(this.actions$.pipe(ofType(ProductsActions.ProductListComponentIsDestroyed))
      // If you use HttpClient, the stream is finite,
      // so you have no needs to unsibscribe
      this.productService
        .getProducts()
        .then(products => ProductsActions.getProductsSuccess({ products }))
        .catch(error => ProductsActions.getProductsError({ error }))
    )
  )
  );

  createProduct$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.createProduct),
    pluck('product'),
    concatMap((product: ProductModel) =>
      this.productService
        .createProduct(product)
        .then((createdProduct: Product) => {
          return ProductsActions.createProductSuccess({ product: createdProduct });
        })
        .catch(error => ProductsActions.createProductError({ error }))
      )
    )
  );

  buyProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.buyProduct),
      pluck('product'),
      tap((product: ProductModel) =>
        this.cartService.addProduct(product))
    ),
    { dispatch: false }
  );

  updateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      pluck('product'),
      concatMap((product: ProductModel) =>
        this.productService
          .updateProduct(product)
          .then((updatedProduct: Product) => {
            return ProductsActions.updateProductSuccess({ product: updatedProduct });
          })
          .catch(error => ProductsActions.updateProductError({ error }))
      )
    )
  );

  createUpdateProductSuccess$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.createProductSuccess, ProductsActions.updateProductSuccess),
      map(action =>
        RouterActions.go({
          path: ['/products-list']
        })
      )
    );
  });

  // Implement this interface to dispatch a custom action after the effect has been added.
  // You can listen to this action in the rest of the application
  // to execute something after the effect is registered.
  ngrxOnInitEffects(): Action {
    console.log('ngrxOnInitEffects is called');
    return { type: '[ProductsEffects]: Init' };
  }
  }
