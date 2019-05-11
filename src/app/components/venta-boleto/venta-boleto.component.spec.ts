import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaBoletoComponent } from './venta-boleto.component';

describe('VentaBoletoComponent', () => {
  let component: VentaBoletoComponent;
  let fixture: ComponentFixture<VentaBoletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaBoletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
