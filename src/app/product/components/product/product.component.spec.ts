import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { DebugElement } from '@angular/core';
import { ProductModel, ProductType } from '../../models/product.model';
import { By } from '@angular/platform-browser';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let nameEl: DebugElement;
  let typeEl: DebugElement;
  let weightEl: DebugElement;
  let costEl: DebugElement;
  let buyButtonEl: DebugElement;
  let viewButtonEl: DebugElement;

  const expectedProduct = new ProductModel(1, 'Test Name', ProductType.Mobile, 5, 10);

  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [ProductComponent]
      });

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    nameEl = fixture.debugElement.query(By.css('.name'));
    typeEl = fixture.debugElement.query(By.css('.type'));
    weightEl = fixture.debugElement.query(By.css('.weight'));
    costEl = fixture.debugElement.query(By.css('.cost'));
    buyButtonEl = fixture.debugElement.query(By.css('.btn-primary'));
    viewButtonEl = fixture.debugElement.query(By.css('.btn-warning'));
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should display product', () => {
    component.product = expectedProduct;

    fixture.detectChanges();

    const expectedPipedProductType = expectedProduct.type.toUpperCase();
    expect(nameEl.nativeElement.textContent).toContain(expectedProduct.name);
    expect(typeEl.nativeElement.textContent).toContain(expectedPipedProductType);
    expect(weightEl.nativeElement.textContent).toContain(expectedProduct.weight);
    expect(costEl.nativeElement.textContent).toContain(expectedProduct.cost);
  });

  it('should raise buyProduct event when buy button clicked', () => {
    let purchasedProduct: ProductModel;
    component.product = expectedProduct;

    fixture.detectChanges();

    component.buyProduct.subscribe((product: ProductModel) => (purchasedProduct = product));

    buyButtonEl.triggerEventHandler('click', null);
    expect(purchasedProduct).toEqual(expectedProduct);
  });

  it('should raise viewProduct event when view button clicked', () => {
    let viewProduct: ProductModel;
    component.product = expectedProduct;

    fixture.detectChanges();

    component.viewProduct.subscribe((product: ProductModel) => (viewProduct = product));

    viewButtonEl.triggerEventHandler('click', null);
    expect(viewProduct).toEqual(expectedProduct);
  }); });
