import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTreceAutomovilDetalleComponent } from './grupo-trece-automovil-detalle.component';

describe('GrupoTreceAutomovilDetalleComponent', () => {
  let component: GrupoTreceAutomovilDetalleComponent;
  let fixture: ComponentFixture<GrupoTreceAutomovilDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoTreceAutomovilDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoTreceAutomovilDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
