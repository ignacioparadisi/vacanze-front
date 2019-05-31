import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoSieteRestaurantesComponent } from './grupo-siete-restaurantes.component';

describe('GrupoSieteRestaurantesComponent', () => {
  let component: GrupoSieteRestaurantesComponent;
  let fixture: ComponentFixture<GrupoSieteRestaurantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoSieteRestaurantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoSieteRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
