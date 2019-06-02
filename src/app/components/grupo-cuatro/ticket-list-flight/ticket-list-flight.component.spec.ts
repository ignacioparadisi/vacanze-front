import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListFlightComponent } from './ticket-list-flight.component';

describe('TicketListFlightComponent', () => {
  let component: TicketListFlightComponent;
  let fixture: ComponentFixture<TicketListFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketListFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
