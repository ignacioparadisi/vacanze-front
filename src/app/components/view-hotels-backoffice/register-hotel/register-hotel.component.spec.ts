import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHotelComponent } from './register-hotel.component';

describe('RegisterHotelComponent', () => {
  let component: RegisterHotelComponent;
  let fixture: ComponentFixture<RegisterHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
