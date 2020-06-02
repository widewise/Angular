import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartModel } from '../../models/cart.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})

export class CartListComponent implements OnInit {
  carts$: Observable<Array<CartModel>>;
  constructor(
    private cartService: CartService,
    private router: Router) { }
  ngOnInit(): void {
    this.carts$ = this.cartService.getCartProducts();
  }

  get totalSum(): number {
    return this.cartService.getTotalSum();
  }

  get totalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  onIncrementProductCount(cart: CartModel): void {
    this.cartService.increaseQuantity(cart);
  }

  onDecrementProductCount(cart: CartModel): void {
    this.cartService.decreaseQuantity(cart);
  }

  onDeleteCart(cart: CartModel): void {
    this.cartService.removeProduct(cart);
  }

  onProcessOrder(){
    this.router.navigate(['/order']);
  }
}
