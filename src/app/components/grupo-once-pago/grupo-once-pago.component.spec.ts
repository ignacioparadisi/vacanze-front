import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoOncePagoComponent } from './grupo-once-pago.component';

describe('GrupoOncePagoComponent', () => {
  let component: GrupoOncePagoComponent;
  let fixture: ComponentFixture<GrupoOncePagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoOncePagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoOncePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
