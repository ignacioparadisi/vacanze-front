import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTreceAutomovilComponent } from './grupo-trece-automovil.component';

describe('GrupoTreceAutomovilComponent', () => {
  let component: GrupoTreceAutomovilComponent;
  let fixture: ComponentFixture<GrupoTreceAutomovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoTreceAutomovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoTreceAutomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
