import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRestaurantComponent } from './filter-restaurant.component';

describe('FilterRestaurantComponent', () => {
  let component: FilterRestaurantComponent;
  let fixture: ComponentFixture<FilterRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
