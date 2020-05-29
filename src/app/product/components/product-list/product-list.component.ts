import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductModel } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { CartService } from './../../../cart/services/cart.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Promise<Array<ProductModel>>;

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  onBuyProduct(productName: string): void {
    const product = this.productService.getProductByName(productName);
    this.cartService.addProduct(product);
  }
  onViewProduct(product: ProductModel): void {
    const link = ['/product', product.id];
    this.router.navigate(link);
  }
}
