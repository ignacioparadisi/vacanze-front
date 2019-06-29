import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoOnceVentaVuelosComponent } from './grupo-once-venta-vuelos.component';

describe('GrupoOnceVentaVuelosComponent', () => {
  let component: GrupoOnceVentaVuelosComponent;
  let fixture: ComponentFixture<GrupoOnceVentaVuelosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoOnceVentaVuelosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoOnceVentaVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
