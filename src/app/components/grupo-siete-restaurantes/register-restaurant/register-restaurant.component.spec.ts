import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRestaurantComponent } from './register-restaurant.component';

describe('RegisterHotelComponent', () => {
  let component: RegisterRestaurantComponent;
  let fixture: ComponentFixture<RegisterRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
