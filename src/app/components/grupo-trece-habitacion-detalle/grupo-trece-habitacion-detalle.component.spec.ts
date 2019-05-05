import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTreceHabitacionDetalleComponent } from './grupo-trece-habitacion-detalle.component';

describe('GrupoTreceHabitacionDetalleComponent', () => {
  let component: GrupoTreceHabitacionDetalleComponent;
  let fixture: ComponentFixture<GrupoTreceHabitacionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoTreceHabitacionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoTreceHabitacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
