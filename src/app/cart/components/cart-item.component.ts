import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewInit
} from '@angular/core';
import { CartModel } from '../models/cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})

export class CartItemComponent implements OnChanges, AfterViewInit {
  @Input()
  cart: CartModel;
  @Input()
  count: number;

  @Output()
  incrementProductCount: EventEmitter<CartModel> = new EventEmitter<CartModel>();

  @Output()
  decrementProductCount: EventEmitter<CartModel> = new EventEmitter<CartModel>();

  @Output()
  deleteCart: EventEmitter<CartModel> = new EventEmitter<CartModel>();

  @ViewChild('decrement') decrementButton: ElementRef<HTMLButtonElement>;

  ngAfterViewInit(): void {
    this.checkCount(this.count);
  }

  onIncrementProductCount(): void {
    this.incrementProductCount.emit(this.cart);
  }

  onDecrementProductCount(): void {
    this.decrementProductCount.emit(this.cart);
  }

  onDeleteCart(): void {
    this.deleteCart.emit(this.cart);
    console.log('Cart is deleted!');
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'count')
      {
        const chng = changes[propName];
        const cur  = Number(JSON.stringify(chng.currentValue));
        this.checkCount(cur);
      }
    }
  }

  checkCount(count: number) {
    if (count <= 1)
    {
      if (this.decrementButton !== undefined)
      {
        this.decrementButton.nativeElement.disabled = true;
      }
    }
    else
    {
      if (this.decrementButton !== undefined)
      {
        this.decrementButton.nativeElement.disabled = false;
      }
    }
  }
}
