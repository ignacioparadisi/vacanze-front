import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSaleFlightComponent } from './ticket-sale-flight.component';

describe('TicketSaleComponent', () => {
  let component: TicketSaleFlightComponent;
  let fixture: ComponentFixture<TicketSaleFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketSaleFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketSaleFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
