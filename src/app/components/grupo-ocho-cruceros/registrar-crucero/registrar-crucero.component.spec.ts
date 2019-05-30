import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCruceroComponent } from './registrar-crucero.component';

describe('RegistrarCruceroComponent', () => {
  let component: RegistrarCruceroComponent;
  let fixture: ComponentFixture<RegistrarCruceroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarCruceroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCruceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
