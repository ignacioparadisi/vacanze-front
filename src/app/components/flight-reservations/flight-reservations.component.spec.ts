import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightReservationsComponent } from './flight-reservations.component';

describe('FlightReservationsComponent', () => {
  let component: FlightReservationsComponent;
  let fixture: ComponentFixture<FlightReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
