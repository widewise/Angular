import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ProductModel } from '../../models/product.model';
import { AppState, selectSelectedProductByUrl } from './../../../core/@ngrx';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
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
      .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onGoBack(): void {
    this.store.dispatch(RouterActions.go({
      path: ['/products-list']
    }));
  }
}
