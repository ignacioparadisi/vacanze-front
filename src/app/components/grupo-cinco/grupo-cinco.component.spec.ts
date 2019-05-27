import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoCincoComponent } from './grupo-cinco.component';

describe('GrupoCincoComponent', () => {
  let component: GrupoCincoComponent;
  let fixture: ComponentFixture<GrupoCincoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoCincoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoCincoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
