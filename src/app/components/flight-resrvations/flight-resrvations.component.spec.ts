import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightResrvationsComponent } from './flight-resrvations.component';

describe('FlightResrvationsComponent', () => {
  let component: FlightResrvationsComponent;
  let fixture: ComponentFixture<FlightResrvationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightResrvationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightResrvationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
