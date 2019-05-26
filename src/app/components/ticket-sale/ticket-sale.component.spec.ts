import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSaleComponent } from './ticket-sale.component';

describe('TicketSaleComponent', () => {
  let component: TicketSaleComponent;
  let fixture: ComponentFixture<TicketSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
