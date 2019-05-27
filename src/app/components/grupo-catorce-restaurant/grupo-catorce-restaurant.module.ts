import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoCatorceRestaurantRoutingModule } from './grupo-catorce-restaurant-routing.module';
import { GrupoCatorceRestaurantComponent } from './grupo-catorce-restaurant.component'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { BuscarRestaurantComponent } from './buscar-restaurant/buscar-restaurant.component'
import { SeleccionarRestaurantComponent } from './seleccionar-restaurant/seleccionar-restaurant.component'

import { GrupoOchoCrucerosModule  } from '../grupo-ocho-cruceros/grupo-ocho-cruceros.module';

@NgModule({
  declarations: [
    GrupoCatorceRestaurantComponent,
    BuscarRestaurantComponent,
    SeleccionarRestaurantComponent,
    
  ],
  imports: [
    CommonModule,
    GrupoCatorceRestaurantRoutingModule,
    SweetAlert2Module.forRoot(),
    GrupoOchoCrucerosModule
  ],
  providers: [],
  exports: [
    
  ]
})
export class GrupoCatorceRestaurantModule { }
