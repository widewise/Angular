import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartColorDirective, FontChangeDirective } from './directives';
import { OrderByPipe } from './pipes/order-by.pipe';

const comp = [
  CartColorDirective,
  FontChangeDirective,
  OrderByPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...comp],
  exports: [...comp, CommonModule, FormsModule]
})
export class SharedModule {}
