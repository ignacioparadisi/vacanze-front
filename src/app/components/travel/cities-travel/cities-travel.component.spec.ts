import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesTravelComponent } from './cities-travel.component';

describe('CitiesTravelComponent', () => {
  let component: CitiesTravelComponent;
  let fixture: ComponentFixture<CitiesTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
