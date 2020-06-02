import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductModel } from './../../../product/models/product.model';
import { ProductService } from './../../../product/services/product.service';

@Component({
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products: Promise<Array<ProductModel>>;

  constructor(
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  onCreateProduct() {
    const link = ['admin/product/add'];
    this.router.navigate(link);
  }

  onEditProduct(product: ProductModel): void {
    const link = ['admin/product/edit', product.id];
    this.router.navigate(link);
  }
}
