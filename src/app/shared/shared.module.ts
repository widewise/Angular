import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartColorDirective, FontChangeDirective, AsyncEmailValidatorDirective } from './directives';
import { OrderByPipe } from './pipes/order-by.pipe';

const comp = [
  CartColorDirective,
  FontChangeDirective,
  AsyncEmailValidatorDirective,
  OrderByPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...comp],
  exports: [...comp, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {}
