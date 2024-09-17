import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsAsistenciaPage } from './tabs-asistencia.page';

describe('TabsAsistenciaPage', () => {
  let component: TabsAsistenciaPage;
  let fixture: ComponentFixture<TabsAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
