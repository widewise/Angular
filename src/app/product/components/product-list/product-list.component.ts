import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { ProductModel } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { CartService } from './../../../cart/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<Array<ProductModel>>;
  private incrementSub: Subscription;
  private decrementSub: Subscription;

  constructor(
      private productService: ProductService,
      private cartService: CartService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
    this.incrementSub = this.productService.incrementchannel$.subscribe(
      productName => this.incrementProductCount(productName)
    );
    this.decrementSub = this.productService.decrementchannel$.subscribe(
      productName => this.decrementProductCount(productName)
    );
  }

  incrementProductCount(productName: string): void {
    const product = this.productService.getProduct(productName);
    product.count++;
  }

  decrementProductCount(productName: string): ProductModel {
    const product = this.productService.getProduct(productName);
    if (product.count === 0)
    {
      throw Error(`Product '${productName}' is finished.`);
    }
    product.count--;

    return product;
  }

  onBuyProduct(productName: string): void {
    const product = this.decrementProductCount(productName);
    this.cartService.addProduct(product);
  }

  ngOnDestroy(): void {
    this.incrementSub.unsubscribe();
    this.decrementSub.unsubscribe();
  }
}
