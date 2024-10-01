import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerOrdenPage } from './ver-orden.page';

describe('VerOrdenPage', () => {
  let component: VerOrdenPage;
  let fixture: ComponentFixture<VerOrdenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerOrdenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
