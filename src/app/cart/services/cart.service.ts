import { Injectable } from '@angular/core';

import { CartModel } from './../models/cart.model';
import { ProductModel, ProductType } from './../../product/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }

  getCart(): CartModel {
      const products = [
        new ProductModel(1, 'Vivobook', ProductType.Notebook, 3, 500)
      ];

      /*var products = new Array<ProductModel>();*/
      return new CartModel(products);
  }
}
