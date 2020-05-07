import { Component, OnInit } from '@angular/core';
import { ProductModel } from './../../product/models/product.model'
import { CartService } from './../services/cart.service'
import { CartModel } from './../models/cart.model'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartModel;
  constructor(
    private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }
}