import { createAction, props } from '@ngrx/store';

import { Product } from './../../../product/models/product.model';

export const getProducts = createAction('[Product List Page (App)] GET_PRODUCTS');

export const createProduct = createAction(
  '[Product Form Page] CREATE_PRODUCT',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  '[Create Product Effect] CREATE_PRODUCT_SUCCESS',
  props<{ product: Product }>()
);

export const createProductError = createAction(
  '[Create Product Effect] CREATE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const updateProduct = createAction(
  '[Product Form Page] UPDATE_PRODUCT',
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  '[Update Product Effect] UPDATE_PRODUCT_SUCCESS',
  props<{ product: Product }>()
);

export const updateProductError = createAction(
  '[Update Product Effect] UPDATE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const buyProduct = createAction(
  '[Product List Page] BUY_PRODUCT',
  props<{ product: Product }>()
);

export const getProductsSuccess = createAction(
  '[Get Products Effect] GET_PRODUCTS_SUCCEESS',
  props<{ products: Product[] }>()
);
export const getProductsError = createAction(
  '[Get Products Effect] GET_PRODUCTS_ERROR',
  props<{ error: Error | string }>()
);
