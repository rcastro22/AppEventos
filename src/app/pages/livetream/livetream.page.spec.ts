import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivetreamPage } from './livetream.page';

describe('LivetreamPage', () => {
  let component: LivetreamPage;
  let fixture: ComponentFixture<LivetreamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LivetreamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
