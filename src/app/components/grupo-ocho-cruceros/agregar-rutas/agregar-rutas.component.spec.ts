import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRutasComponent } from './agregar-rutas.component';

describe('AgregarRutasComponent', () => {
  let component: AgregarRutasComponent;
  let fixture: ComponentFixture<AgregarRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
