import { Component, EventEmitter, Input, Output, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ProductModel } from './../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnChanges {
  @Input()
  product: ProductModel;
  @Input()
  count: number;

  @Output()
  buyProduct: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('buy') buyButton: ElementRef<HTMLButtonElement>;

  onBuy(): void {
    this.buyProduct.emit(this.product.name);
    console.log('Product purchased!');
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'count')
      {
        const chng = changes[propName];
        const cur  = JSON.stringify(chng.currentValue);
        if (cur === '0')
        {
          this.buyButton.nativeElement.disabled = true;
        }
        else
        {
          if (this.buyButton !== undefined)
          {
            this.buyButton.nativeElement.disabled = false;
          }
        }
      }
    }
  }
}
