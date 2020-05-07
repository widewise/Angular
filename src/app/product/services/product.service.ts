import { Injectable } from '@angular/core';

import { ProductModel, ProductType } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Array<ProductModel> {
    return [
      new ProductModel(1, 'Vivobook', ProductType.Notebook, 3, 500),
      new ProductModel(2, 'Sony Xperia 5', ProductType.Mobile, 1, 300),
      new ProductModel(1, 'Samsung N24G1', ProductType.Monitor, 7, 700)
    ];
  }
}
