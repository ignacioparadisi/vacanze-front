import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoOnceCheckinComponent } from './grupo-once-checkin.component';

describe('GrupoOnceCheckinComponent', () => {
  let component: GrupoOnceCheckinComponent;
  let fixture: ComponentFixture<GrupoOnceCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoOnceCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoOnceCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
