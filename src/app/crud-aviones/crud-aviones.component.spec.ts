import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAvionesComponent } from './crud-aviones.component';

describe('CrudAvionesComponent', () => {
  let component: CrudAvionesComponent;
  let fixture: ComponentFixture<CrudAvionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAvionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAvionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
