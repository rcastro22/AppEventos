import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadesActivasPage } from './actividades-activas.page';

describe('ActividadesActivasPage', () => {
  let component: ActividadesActivasPage;
  let fixture: ComponentFixture<ActividadesActivasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesActivasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
