import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from './../../../cart/services/cart.service';

@Component({
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.css']
})
export class ProcessOrderComponent implements OnInit {

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  onSaveOrder() {
    this.cartService.removeAllProducts();
    this.router.navigate(['/products-list']);
  }

  onGoBack(): void {
    this.router.navigate(['/cart']);
  }
}
