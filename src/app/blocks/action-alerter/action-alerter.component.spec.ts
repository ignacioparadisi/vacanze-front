import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionAlerterComponent } from './action-alerter.component';

describe('ActionAlerterComponent', () => {
  let component: ActionAlerterComponent;
  let fixture: ComponentFixture<ActionAlerterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionAlerterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionAlerterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
