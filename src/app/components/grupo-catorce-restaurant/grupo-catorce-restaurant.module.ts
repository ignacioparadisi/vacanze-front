import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoCatorceRestaurantRoutingModule } from './grupo-catorce-restaurant-routing.module';
import { GrupoCatorceRestaurantComponent } from './grupo-catorce-restaurant.component'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { BuscarRestaurantComponent } from './buscar-restaurant/buscar-restaurant.component'
import { ReservarRestaurantComponent } from './reservar-restaurant/reservar-restaurant.component'
import { SeleccionarRestaurantComponent } from './seleccionar-restaurant/seleccionar-restaurant.component'


@NgModule({
  declarations: [
    GrupoCatorceRestaurantComponent,
    BuscarRestaurantComponent,
    ReservarRestaurantComponent,
    SeleccionarRestaurantComponent,
    
  ],
  imports: [
    CommonModule,
    GrupoCatorceRestaurantRoutingModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  exports: [
    
  ]
})
export class GrupoCatorceRestaurantModule { }
