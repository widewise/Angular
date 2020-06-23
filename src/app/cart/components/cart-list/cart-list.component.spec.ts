import { inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { RouterStub } from './../../../testing-helpers';
import { CartService } from '../../services/cart.service';
import { CartModel } from '../../models/cart.model';
import { CartListComponent } from './cart-list.component';
import { CartItemComponent } from './../cart-item/cart-item.component';
import { Observable, of } from 'rxjs';
import { ProductModel } from 'src/app/product/models/product.model';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';

export class CartServiceStub {

    getCartProducts(): Observable<Array<CartModel>> {
      return of([new CartModel('Product', 100, 1)]);
    }

    getTotalSum(): number {
        return 100;
    }

    getTotalQuantity(): number {
        return 1;
    }

    addProduct(product: ProductModel) {
    }

    removeProduct(cart: CartModel) {
    }

    increaseQuantity(cart: CartModel) {
    }

    decreaseQuantity(cart: CartModel) {
    }

    removeAllProducts() {
    }

    updateCartData() {
    }
}

describe('CartListComponent', () => {
    let component: CartListComponent;
    let fixture: ComponentFixture<CartListComponent>;
    let orderButtonEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
        declarations: [CartListComponent, CartItemComponent, OrderByPipe],
        providers: [
            { provide: CartService, useClass: CartServiceStub },
            { provide: Router, useClass: RouterStub }
        ]
        });

        fixture = TestBed.createComponent(CartListComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        orderButtonEl = fixture.debugElement.query(By.css('.btn-primary'));
    });

    it('should tell ROUTER to navigate when order button clicked',

    inject(
    [Router],
    async (router: Router) => {
        await fixture.whenStable();

        fixture.detectChanges();
        const navigateSpy = spyOn(router, 'navigate');
        orderButtonEl.triggerEventHandler('click', null);
        expect(navigateSpy).toHaveBeenCalledWith(['/order']);
    }
    ));
});
