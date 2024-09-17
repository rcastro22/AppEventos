import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalImagePage } from './modal-image.page';

describe('ModalImagePage', () => {
  let component: ModalImagePage;
  let fixture: ComponentFixture<ModalImagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
