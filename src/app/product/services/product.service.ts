import { Injectable, Inject, forwardRef } from '@angular/core';

import { ProductModel, ProductType } from './../models/product.model';
import { Observable } from 'rxjs';

import { HttpClientService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://localhost:3000/products';
  httpClientService: HttpClientService;
  constructor(
    // просто попробовать @Inject и forwardRef?
    @Inject(forwardRef(() => HttpClientService)) httpClientService: HttpClientService
  ) {
    this.httpClientService = httpClientService;
  }

  getProducts(): Promise<ProductModel[]> {
    return this.httpClientService.getPromiseArray<ProductModel>(this.productsUrl);
  }

  getProduct(id: number | string): Promise<ProductModel> {
    return this.getProducts()
      .then(products => products.find(product => product.id === +id))
      .catch(() => Promise.reject('Error in getProduct method'));
  }

  getProductObservable(id: number | string): Observable<ProductModel> {
    const url = `${this.productsUrl}/${id}`;
    return this.httpClientService.getObservable<ProductModel>(url);
  }

  async getProductPromiseByName(productName: string): Promise<ProductModel> {
    const url = `${this.productsUrl}?name=${productName}`;
    return await this.httpClientService.getPromise<ProductModel>(url);
  }

  createProduct(product: ProductModel): Promise<ProductModel> {
    return this.httpClientService.create<ProductModel>(this.productsUrl, product);
  }

  updateProduct(product: ProductModel): Promise<ProductModel> {
    const url = `${this.productsUrl}/${product.id}`;
    return this.httpClientService.update<ProductModel>(url, product);
  }
}
