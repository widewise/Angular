import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductModel } from './../models/product.model';
import { ProductService } from './../services/product.service';
import { CartService } from './../../cart/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Array<ProductModel>;
  private incrementSub: Subscription;
  private decrementSub: Subscription;

  constructor(
      private productService: ProductService,
      private cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.incrementSub = this.productService.incrementchannel$.subscribe(
      productName => this.incrementProductCount(productName)
    );
    this.decrementSub = this.productService.decrementchannel$.subscribe(
      productName => this.decrementProductCount(productName)
    );
  }

  incrementProductCount(productName: string): void {
    const index = this.products.findIndex(x => x.name === productName);
    if (index < 0)
    {
      throw Error(`Product ${productName} is not found.`);
    }

    this.products[index].count++;
  }

  decrementProductCount(productName: string): ProductModel {
    const index = this.products.findIndex(x => x.name === productName);
    if (index < 0)
    {
      throw Error(`Product ${productName} is not found.`);
    }

    const product = this.products[index];
    if (product.count === 0)
    {
      throw Error(`Product '${productName}' is finished.`);
    }
    product.count--;

    return product;
  }

  onBuyProduct(productName: string): void {
    const product = this.decrementProductCount(productName);
    this.cartService.addCart(product);
  }

  ngOnDestroy(): void {
    this.incrementSub.unsubscribe();
    this.decrementSub.unsubscribe();
  }
}
