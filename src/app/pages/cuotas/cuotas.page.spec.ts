import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuotasPage } from './cuotas.page';

describe('CuotasPage', () => {
  let component: CuotasPage;
  let fixture: ComponentFixture<CuotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CuotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
