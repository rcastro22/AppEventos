import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadesProximasPage } from './actividades-proximas.page';

describe('ActividadesProximasPage', () => {
  let component: ActividadesProximasPage;
  let fixture: ComponentFixture<ActividadesProximasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesProximasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
