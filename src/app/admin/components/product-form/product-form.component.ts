import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { ProductModel } from '../../../product/models/product.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../../../product/services/product.service';

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: ProductModel;
  originalProduct: ProductModel;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.pipe(pluck('product')).subscribe((product: ProductModel) => {
      this.product = { ...product };
      this.originalProduct = { ...product };
    });
  }

  onSaveProduct() {
    const product = { ...this.product } as ProductModel;

    if (product.id) {
      this.productService.updateProduct(product);
      this.router.navigate(['/admin/products', {editedProductID: product.id}]);
    } else {
      this.productService.createProduct(product);
      this.onGoBack();
    }
    this.originalProduct = {...this.product};
  }

  onGoBack(): void {
    this.router.navigate(['/admin/products']);
  }
}
