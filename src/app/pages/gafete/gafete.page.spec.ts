import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GafetePage } from './gafete.page';

describe('GafetePage', () => {
  let component: GafetePage;
  let fixture: ComponentFixture<GafetePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GafetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
