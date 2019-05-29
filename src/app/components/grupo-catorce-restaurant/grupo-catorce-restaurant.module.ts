import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoCatorceRestaurantRoutingModule } from './grupo-catorce-restaurant-routing.module';
import { GrupoCatorceRestaurantComponent } from './grupo-catorce-restaurant.component'
import { TableResponsiveReservasComponent  } from "src/app/blocks/table-responsive-reservas/table-responsive-reservas.component";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { BuscarRestaurantComponent } from './buscar-restaurant/buscar-restaurant.component'
import { SeleccionarRestaurantComponent } from './seleccionar-restaurant/seleccionar-restaurant.component'


@NgModule({
  declarations: [
    GrupoCatorceRestaurantComponent,
    BuscarRestaurantComponent,
    SeleccionarRestaurantComponent,
    TableResponsiveReservasComponent
  ],
  imports: [
    CommonModule,
    GrupoCatorceRestaurantRoutingModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  exports: [
    TableResponsiveReservasComponent
  ]
})
export class GrupoCatorceRestaurantModule { }