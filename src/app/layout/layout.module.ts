import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent, LoginComponent } from './components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    AboutComponent,
    LoginComponent
  ]
})
export class LayoutModule {}
