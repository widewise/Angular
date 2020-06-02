import { Injectable, Inject, forwardRef } from '@angular/core';

import { CartModel } from './../models/cart.model';
import { ProductModel } from './../../product/models/product.model';
import { CartProductsModel } from '../models/cart-products.models';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

let cartProducts = new Array<string>();
const cartProducts$ = of(cartProducts);

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: CartProductsModel;
  localStotageService: LocalStorageService;

  constructor(
    @Inject(forwardRef(() => LocalStorageService)) localStotageService: LocalStorageService
  ) {
    this.cart = new CartProductsModel(0, 0);
    this.localStotageService = localStotageService;
  }

  getCartProducts(): Observable<Array<CartModel>> {
    return cartProducts$
    .pipe(
      map((cartProductNames: Array<string>) =>
        cartProductNames.map(cartProductName => this.localStotageService.getItem(cartProductName) as CartModel)
      )
    );
  }

  getTotalSum() {
    this.updateCartData();
    return this.cart.totalSum;
  }

  getTotalQuantity() {
    this.updateCartData();
    return this.cart.totalQuantity;
  }

  addProduct(product: ProductModel) {
    const index = cartProducts.findIndex(cartProductName => cartProductName === product.name);
    if (index < 0)
    {
      cartProducts.push(product.name);
      this.localStotageService.setItem(product.name, new CartModel(product.name, product.cost, 1));
    }

    this.updateCartData();
  }

  removeProduct(cart: CartModel) {
    this.localStotageService.removeItem(cart.productName);
    const index = cartProducts.indexOf(cart.productName, 0);
    if (index > -1) {
      cartProducts.splice(index, 1);
    }
    this.updateCartData();
  }

  increaseQuantity(cart: CartModel) {
    const cartModel = this.localStotageService.getItem(cart.productName);
    cart.count++;
    cartModel.count++;
    this.localStotageService.setItem(cart.productName, cartModel);
    this.updateCartData();
  }

  decreaseQuantity(cart: CartModel) {
    const cartModel = this.localStotageService.getItem(cart.productName);
    cart.count--;
    cartModel.count--;
    this.localStotageService.setItem(cart.productName, cartModel);
    this.updateCartData();
  }

  removeAllProducts() {
    cartProducts.forEach(cartProductName => this.localStotageService.removeItem(cartProductName));
    cartProducts = [];
    this.cart.totalSum = 0;
    this.cart.totalQuantity = 0;
  }

  updateCartData() {
    this.cart.totalSum = cartProducts.reduce((sum, cartProductName) =>
    {
      const cart = this.localStotageService.getItem(cartProductName);
      return sum + cart.count * cart.cost;
    }, 0);
    this.cart.totalQuantity = cartProducts.reduce((sum, cartProductName) =>
    {
      const cart = this.localStotageService.getItem(cartProductName);
      return sum + cart.count;
    }, 0);
  }
}
