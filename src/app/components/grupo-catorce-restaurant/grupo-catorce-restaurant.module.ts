import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoCatorceRestaurantRoutingModule } from './grupo-catorce-restaurant-routing.module';
import { GrupoCatorceRestaurantComponent } from './grupo-catorce-restaurant.component'
import { TableResponsiveReservasModule  } from "../../blocks/table-responsive-reservas/table-responsive-reservas.module";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscarRestaurantComponent } from './buscar-restaurant/buscar-restaurant.component'
import { SeleccionarRestaurantComponent } from './seleccionar-restaurant/seleccionar-restaurant.component'
import { ApiService } from '../../services/api.service';
import { DetailViewComponent } from './detail-view/detail-view.component';

@NgModule({
  declarations: [
    GrupoCatorceRestaurantComponent,
    BuscarRestaurantComponent,
    SeleccionarRestaurantComponent,
    DetailViewComponent
  ],
  imports: [
    CommonModule,
    GrupoCatorceRestaurantRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    TableResponsiveReservasModule
  ],
  providers: [ApiService]
})
export class GrupoCatorceRestaurantModule { }
