import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTravelComponent } from './detail-travel.component';

describe('DetailTravelComponent', () => {
  let component: DetailTravelComponent;
  let fixture: ComponentFixture<DetailTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
