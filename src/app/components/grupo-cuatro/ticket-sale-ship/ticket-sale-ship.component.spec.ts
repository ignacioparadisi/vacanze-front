import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSaleShipComponent } from './ticket-sale-ship.component';

describe('TicketSaleShipComponent', () => {
  let component: TicketSaleShipComponent;
  let fixture: ComponentFixture<TicketSaleShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketSaleShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketSaleShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
