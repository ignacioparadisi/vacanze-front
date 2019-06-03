import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryTravelComponent } from './diary-travel.component';

describe('DiaryTravelComponent', () => {
  let component: DiaryTravelComponent;
  let fixture: ComponentFixture<DiaryTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
