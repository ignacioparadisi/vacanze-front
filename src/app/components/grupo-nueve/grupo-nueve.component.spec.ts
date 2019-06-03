import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoNueveComponent } from './grupo-nueve.component';

describe('GrupoNueveComponent', () => {
  let component: GrupoNueveComponent;
  let fixture: ComponentFixture<GrupoNueveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoNueveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoNueveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
