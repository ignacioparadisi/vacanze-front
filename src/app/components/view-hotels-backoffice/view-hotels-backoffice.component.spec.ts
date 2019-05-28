import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHotelsBackofficeComponent } from './view-hotels-backoffice.component';

describe('ViewHotelsBackofficeComponent', () => {
  let component: ViewHotelsBackofficeComponent;
  let fixture: ComponentFixture<ViewHotelsBackofficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHotelsBackofficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHotelsBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
