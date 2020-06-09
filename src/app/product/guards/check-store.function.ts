import { select, Store } from '@ngrx/store';
import { selectProductsLoaded, AppState } from './../../core/@ngrx';
import * as TasksActions from './../../core/@ngrx/products/products.actions';

import { Observable } from 'rxjs';
import { tap, filter, take } from 'rxjs/operators';

export function checkStore(store: Store<AppState>): Observable<boolean> {
  return store.pipe(
    select(selectProductsLoaded),

    // make a side effect
    tap((loaded: boolean) => {
      if (!loaded) {
        store.dispatch(TasksActions.getProducts());
      }
    }),

    // wait, while loaded = true
    filter((loaded: boolean) => loaded),

    // automatically unsubscribe
    take(1)
  );
}
