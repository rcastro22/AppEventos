import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkingPage } from './networking.page';

describe('NetworkingPage', () => {
  let component: NetworkingPage;
  let fixture: ComponentFixture<NetworkingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
