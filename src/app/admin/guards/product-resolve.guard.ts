import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import { ProductModel, ProductType } from '../../product/models/product.model';
import { ProductService } from '../../product/services/product.service';

@Injectable({
  providedIn: 'any'
})
export class ProductResolveGuard implements Resolve<ProductModel> {
  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductModel | null> {
    console.log('ProductResolve Guard is called');

    if (!route.paramMap.has('productID')) {
      return of(new ProductModel(null, '', ProductType.Mobile, null, null));
    }

    const id = +route.paramMap.get('productID');

    return this.productService.getProductObservable(id).pipe(
      map((product: ProductModel) => {
        if (product) {
          return product;
        } else {
          this.router.navigate(['/products']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/products']);
        // catchError MUST return observable
        return of(null);
      })
    );
  }
}
