import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadesAsignacionPage } from './actividades-asignacion.page';

describe('ActividadesAsignacionPage', () => {
  let component: ActividadesAsignacionPage;
  let fixture: ComponentFixture<ActividadesAsignacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesAsignacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
