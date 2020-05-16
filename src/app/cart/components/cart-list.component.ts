import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartModel } from '../models/cart.model';
import { ProductModel } from './../../product/models/product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../../product/services/product.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})

export class CartListComponent implements OnInit, OnDestroy {
  carts: Array<CartModel>;
  sum: number;
  private sub: Subscription;

  constructor(
    private cartService: CartService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.carts = this.cartService.getCarts();
    this.sum = this.cartService.getSum(this.carts);
    this.sub = this.cartService.channel$.subscribe(
      product => this.addCart(product)
    );
  }

  addCart(product: ProductModel): void {
    const index = this.carts.findIndex(x => x.productName === product.name);
    if (index < 0)
    {
      this.carts.push(new CartModel(product.name, product.cost, 1));
    }
    else
    {
      this.carts[index].count++;
    }

    this.sum = this.cartService.getSum(this.carts);
  }

  onIncrementProductCount(cart: CartModel): void {
    this.productService.buyMoreProduct(cart.productName);
    cart.count++;
    this.sum = this.cartService.getSum(this.carts);
  }

  onDecrementProductCount(cart: CartModel): void {
    this.productService.returnProduct(cart.productName);
    cart.count--;
    this.sum = this.cartService.getSum(this.carts);
  }

  onDeleteCart(cart: CartModel): void {
    const index = this.carts.indexOf(cart, 0);
    if (index > -1) {
      this.carts.splice(index, 1);
    }

    for (let productIndex = 0; productIndex < cart.count; productIndex++) {
      this.productService.returnProduct(cart.productName);
    }

    this.sum = this.cartService.getSum(this.carts);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
