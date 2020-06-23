import { Component, OnInit } from '@angular/core';
import { AppState, selectSelectedProductByUrl } from './../../../core/@ngrx';
import * as ProductsActions from './../../../core/@ngrx/products/products.actions';
import { Store, select } from '@ngrx/store';
// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';
import { ProductModel, Product } from '../../../product/models/product.model';

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: ProductModel;
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const observer: any = {
      next: (product: ProductModel) => {
        this.product = {...product};
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('Stream is completed');
      }
    };

    this.store
      .pipe(
        select(selectSelectedProductByUrl),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);  }

  onSaveProduct() {
    const product = { ...this.product } as ProductModel;

    if (product.id) {
      this.store.dispatch(ProductsActions.updateProduct({ product }));
    } else {
      this.store.dispatch(ProductsActions.createProduct({ product }));
    }
  }

  onGoBack(): void {
    this.store.dispatch(RouterActions.go({
      path: ['/admin/products']
    }));
  }
}
