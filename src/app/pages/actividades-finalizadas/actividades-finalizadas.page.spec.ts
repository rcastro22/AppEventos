import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadesFinalizadasPage } from './actividades-finalizadas.page';

describe('ActividadesFinalizadasPage', () => {
  let component: ActividadesFinalizadasPage;
  let fixture: ComponentFixture<ActividadesFinalizadasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesFinalizadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
