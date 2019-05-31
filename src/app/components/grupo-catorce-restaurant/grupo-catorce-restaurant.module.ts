import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoCatorceRestaurantRoutingModule } from './grupo-catorce-restaurant-routing.module';
import { GrupoCatorceRestaurantComponent } from './grupo-catorce-restaurant.component'
import { TableResponsiveReservasComponent  } from "../../blocks/table-responsive-reservas/table-responsive-reservas.component";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscarRestaurantComponent } from './buscar-restaurant/buscar-restaurant.component'
import { SeleccionarRestaurantComponent } from './seleccionar-restaurant/seleccionar-restaurant.component'
import { ApiService } from '../../services/api.service';

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
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule
  ],
  providers: [ApiService],
  exports: [
    TableResponsiveReservasComponent
  ]
})
export class GrupoCatorceRestaurantModule { }
