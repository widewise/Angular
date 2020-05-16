import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { CartModel } from './../models/cart.model';
import { ProductModel, ProductType } from './../../product/models/product.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private channel = new Subject<ProductModel>();
  public channel$ = this.channel.asObservable();

  getCarts(): Array<CartModel> {
    return new Array<CartModel>(
      new CartModel('Sony Xperia 5', 300, 1)
    );
  }

  addCart(product: ProductModel) {
    this.channel.next(product);
  }

  getSum(carts: Array<CartModel>): number {
    return carts.reduce((sum, cart) => sum + cart.count * cart.cost, 0);
  }
}
