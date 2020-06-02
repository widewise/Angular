import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: ProductModel;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.product = new ProductModel();

    const observer = {
      next: (product: ProductModel) => (this.product = { ...product }),
      error: (err: any) => console.log(err)
    };
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.productService.getProduct(+params.get('productID'))))
      .subscribe(observer);
  }

  onSaveProduct() {
    const product = { ...this.product } as ProductModel;

    this.productService.updateProduct(product);

    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(['/products-list']);
  }
}
