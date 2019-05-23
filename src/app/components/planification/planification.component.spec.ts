import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificationComponent } from './planification.component';

describe('PlanificationComponent', () => {
  let component: PlanificationComponent;
  let fixture: ComponentFixture<PlanificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
