import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ProductModel, ProductType } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private incrementChannel = new Subject<string>();
  public incrementchannel$ = this.incrementChannel.asObservable();

  private decrementChannel = new Subject<string>();
  public decrementchannel$ = this.decrementChannel.asObservable();

  constructor() { }

  getProducts(): Array<ProductModel> {
    return [
      new ProductModel(1, 'Vivobook', ProductType.Notebook, 3, 500, 3),
      new ProductModel(2, 'Sony Xperia 5', ProductType.Mobile, 1, 300, 1),
      new ProductModel(1, 'Samsung N24G1', ProductType.Monitor, 7, 700, 5)
    ];
  }

  returnProduct(productName: string) {
    this.incrementChannel.next(productName);
  }

  buyMoreProduct(productName: string) {
    this.decrementChannel.next(productName);
  }
}
