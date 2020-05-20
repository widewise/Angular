import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartModel } from '../models/cart.model';
import { ProductService } from '../../product/services/product.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})

export class CartListComponent {

  constructor(
    private cartService: CartService,
    private productService: ProductService) { }

  get carts(): Array<CartModel> {
    return this.cartService.getCartProducts();
  }

  get totalSum(): number {
    return this.cartService.getTotalSum();
  }

  get totalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  onIncrementProductCount(cart: CartModel): void {
    this.productService.buyMoreProduct(cart.productName);
    this.cartService.increaseQuantity(cart);
  }

  onDecrementProductCount(cart: CartModel): void {
    this.productService.returnProduct(cart.productName);
    this.cartService.decreaseQuantity(cart);
  }

  onDeleteCart(cart: CartModel): void {
    this.cartService.removeProduct(cart);

    for (let productIndex = 0; productIndex < cart.count; productIndex++) {
      this.productService.returnProduct(cart.productName);
    }
  }
}