import { Injectable } from '@angular/core';

import { ProductModel, ProductType } from './../models/product.model';
import { Observable, of } from 'rxjs';

const productsList = [
  new ProductModel(1, 'Vivobook', ProductType.Notebook, 3, 500),
  new ProductModel(2, 'Sony Xperia 5', ProductType.Mobile, 1, 300),
  new ProductModel(1, 'Samsung N24G1', ProductType.Monitor, 7, 700)
];

const productsListPromise = Promise.resolve(productsList);

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Promise<ProductModel[]> {
    return productsListPromise;
  }

  getProduct(id: number | string): Promise<ProductModel> {
    return this.getProducts()
      .then(products => products.find(product => product.id === +id))
      .catch(() => Promise.reject('Error in getProduct method'));
  }

  getProductObservable(id: number | string): Observable<ProductModel> {
    const index = productsList.findIndex(x => x.id === id);
    if (index < 0)
    {
      return null;
    }

    return of(productsList[index]);
  }

  getProductByName(productName: string): ProductModel {
    const index = productsList.findIndex(x => x.name === productName);
    if (index < 0)
    {
      throw Error(`Product ${productName} is not found.`);
    }

    return productsList[index];
  }

  createProduct(product: ProductModel): void {
    productsList.push(product);
  }

  updateProduct(product: ProductModel): void {
    const i = productsList.findIndex(t => t.id === product.id);

    if (i > -1) {
      productsList.splice(i, 1, product);
    }
  }
}
