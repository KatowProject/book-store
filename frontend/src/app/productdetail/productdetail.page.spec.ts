import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductdetailPage } from './productdetail.page';

describe('ProductdetailPage', () => {
  let component: ProductdetailPage;
  let fixture: ComponentFixture<ProductdetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
