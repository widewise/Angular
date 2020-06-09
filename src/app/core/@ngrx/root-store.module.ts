import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

// @NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environments/environment';

import { ProductsStoreModule } from './products/products-store.module';
import { metaReducers } from './meta-reducers';

import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { routerReducers, CustomSerializer, RouterEffects } from './router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
            metaReducers,
        	  // All checks will automatically be disabled in production builds
            runtimeChecks: {
              strictStateImmutability: true,      // default value is true
              strictActionImmutability: true,     // default value is true
              // router state is not serializable
              // set false if you don't use CustomSerializer
              strictStateSerializability: false,   // default value is false
              // router action is not serializable
              // set false
              strictActionSerializability: false,  // default value is false
              strictActionWithinNgZone: true      // default value is false
            }
          }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
      serializer: CustomSerializer // has a priority over routerState
    }),
    EffectsModule.forRoot([RouterEffects]),
    // Instrumentation must be imported after importing StoreModule (config is optional) 
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ProductsStoreModule
  ]
})
export class RootStoreModule { }
