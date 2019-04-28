import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoUnoComponent } from './grupo-uno.component';

describe('GrupoUnoComponent', () => {
  let component: GrupoUnoComponent;
  let fixture: ComponentFixture<GrupoUnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoUnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
