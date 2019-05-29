import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoTreceAutomovilRoutingModule } from './grupo-trece-automovil-routing.module';
import { GrupoTreceAutomovilComponent } from './grupo-trece-automovil.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AutomovilesComponent } from './automoviles/automoviles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscarAutomovilComponent } from './buscar_automovil/buscar-automovil.component';
import { SeleccionarAutomovilComponent } from './seleccionar-automovil/seleccionar-automovil.component';

// importar el modulo de grupos catorce que es la que hace la declaracion principal
// del componente tableresponsive y un componente no puede estar en dos declaraciones de modulo distintas
import { GrupoCatorceRestaurantModule  } from '../grupo-catorce-restaurant/grupo-catorce-restaurant.module';

@NgModule({
  declarations: [
    GrupoTreceAutomovilComponent,
    BuscarAutomovilComponent,
    SeleccionarAutomovilComponent
  ],
  imports: [
    CommonModule,
    GrupoTreceAutomovilRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    GrupoCatorceRestaurantModule
  ],
  providers: []
})
export class GrupoTreceAutomovilModule {}
