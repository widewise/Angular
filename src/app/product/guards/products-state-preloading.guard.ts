import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from './../../core/@ngrx';

// rxjs
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { checkStore } from './check-store.function';

@Injectable({
  providedIn: 'root'
})
export class ProductsStatePreloadingGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return checkStore(this.store).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
