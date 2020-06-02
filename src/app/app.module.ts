import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstModule } from './first/first.module';
import { ProductModule } from './product/product.module';
import { LayoutModule } from './layout/layout.module';
import { httpInterceptorProviders } from './core/interceptors';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FirstModule,
    ProductModule,
    LayoutModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
