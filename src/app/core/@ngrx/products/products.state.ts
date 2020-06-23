import { Product } from './../../../product/models/product.model';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

export interface ProductsState extends EntityState<Product> {
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

function selectProductId(product: Product): number {
  // In this case this would be optional since primary key is id
  return product.id;
}

function sortProductsByAction(product1: Product, product2: Product): number {
  return product1.name.localeCompare(product2.name);
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: selectProductId,
  sortComparer: sortProductsByAction
});

export const initialProductsState: ProductsState = adapter.getInitialState({
    loading: false,
    loaded: false,
    error: null
});
