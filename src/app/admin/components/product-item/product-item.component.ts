import { Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { ProductModel } from './../../../product/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input()
  product: ProductModel;
  @Input()
  count: number;

  @Output()
  editProduct: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  onEdit(): void {
    this.editProduct.emit(this.product);
  }
}
