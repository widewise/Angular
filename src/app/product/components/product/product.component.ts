import { Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { ProductModel } from './../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input()
  product: ProductModel;

  @Output()
  buyProduct: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();
  @Output()
  viewProduct: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();
  @ViewChild('buy') buyButton: ElementRef<HTMLButtonElement>;

  onBuy(): void {
    this.buyProduct.emit(this.product);
    console.log('Product purchased!');
  }

  onView(): void {
    this.viewProduct.emit(this.product);
  }
}
