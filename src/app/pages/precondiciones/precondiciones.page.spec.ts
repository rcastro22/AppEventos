import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrecondicionesPage } from './precondiciones.page';

describe('PrecondicionesPage', () => {
  let component: PrecondicionesPage;
  let fixture: ComponentFixture<PrecondicionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecondicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
