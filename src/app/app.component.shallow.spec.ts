import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLinkStubDirective } from './testing-helpers';
import { AppComponent } from './app.component';

describe('AppComponent (Shallow)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, RouterLinkStubDirective ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );

    links = linkDes.map(
      d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(5, 'should have 5 links');
    expect(links[0].linkParams).toBe('/products-list', '1st link should go to Products');
    expect(links[1].linkParams).toBe('/admin', '2nd link should go to Admin');
    expect(links[2].linkParams).toBe('/login', 'third link should go to Login');
    expect(links[3].linkParams).toBe('/cart', 'fourth link should go to Cart');
    expect(links[4].linkParams).toBe('/about', 'fifth link should go to About');
  });

  it('can click Products link in template', () => {
    const productLinkDe = linkDes[0];
    const productLink = links[0];

    expect(productLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    productLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(productLink.navigatedTo).toBe('/products-list');
  });

  it('can click Admin link in template', () => {
    const productLinkDe = linkDes[1];
    const productLink = links[1];

    expect(productLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    productLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(productLink.navigatedTo).toBe('/admin');
  });

  it('can click Login link in template', () => {
    const productLinkDe = linkDes[2];
    const productLink = links[2];

    expect(productLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    productLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(productLink.navigatedTo).toBe('/login');
  });

  it('can click Cart link in template', () => {
    const productLinkDe = linkDes[3];
    const productLink = links[3];

    expect(productLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    productLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(productLink.navigatedTo).toBe('/cart');
  });

  it('can click About link in template', () => {
    const productLinkDe = linkDes[4];
    const productLink = links[4];

    expect(productLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    productLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(productLink.navigatedTo).toBe('/about');
  });
});
