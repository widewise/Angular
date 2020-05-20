import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { CartModel } from './../models/cart.model';
import { ProductModel, ProductType } from './../../product/models/product.model';
import { CartProductsModel } from '../models/cart-products.models';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: CartProductsModel;
  constructor() {
    this.cart = new CartProductsModel([], 0, 0);
  }

  getCartProducts(): Array<CartModel> {
    return this.cart.cartProducts;
  }

  getTotalSum() {
    return this.cart.cartProducts.reduce((acc, cart) => acc + cart.count * cart.cost, 0);
  }

  getTotalQuantity() {
    return this.cart.cartProducts.reduce((acc, cart) => acc + cart.count, 0);
  }

  addProduct(product: ProductModel) {
    const index = this.cart.cartProducts.findIndex(x => x.productName === product.name);
    if (index < 0)
    {
      this.cart.cartProducts.push(new CartModel(product.name, product.cost, 1));
    }
    else
    {
      this.cart.cartProducts[index].count++;
    }

    this.updateCartData();
  }

  removeProduct(cart: CartModel) {
    const index = this.cart.cartProducts.indexOf(cart, 0);
    if (index > -1) {
      this.cart.cartProducts.splice(index, 1);
    }
    this.updateCartData();
  }

  increaseQuantity(cart: CartModel) {
    cart.count++;
    this.updateCartData();
  }

  decreaseQuantity(cart: CartModel) {
    cart.count--;
    this.updateCartData();
  }

  removeAllProducts() {
    this.cart.cartProducts = [];
    this.cart.totalSum = 0;
    this.cart.totalQuantity = 0;
  }

  updateCartData() {
    this.cart.totalSum = this.cart.cartProducts.reduce((sum, cart) => sum + cart.count * cart.cost, 0);
    this.cart.totalQuantity = this.cart.cartProducts.reduce((sum, cart) => sum + cart.count, 0);
  }
}