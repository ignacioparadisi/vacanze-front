import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTreceHabitacionComponent } from './grupo-trece-habitacion.component';

describe('GrupoTreceHabitacionComponent', () => {
  let component: GrupoTreceHabitacionComponent;
  let fixture: ComponentFixture<GrupoTreceHabitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoTreceHabitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoTreceHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
