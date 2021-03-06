import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { GrupoSieteRestaurantesRoutingModule } from './grupo-siete-restaurantes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoSieteRestaurantesComponent } from './grupo-siete-restaurantes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';

// importar el modulo de grupos ocho que es la que hace la declaracion principal
// del componente tableresponsive y un componente no puede estar en dos declaraciones de modulo distintas
import { TableResponsiveModule } from '../../blocks/table-responsive/table-responsive.module';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { FilterRestaurantComponent } from './filter-restaurant/filter-restaurant.component';


@NgModule({
  declarations: [
    GrupoSieteRestaurantesComponent,
    RegisterRestaurantComponent,
    EditRestaurantComponent,
    FilterRestaurantComponent
  ],
  imports: [
    CommonModule,
    GrupoSieteRestaurantesRoutingModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TableResponsiveModule
  ],
  providers: [ApiService]
})
export class GrupoSieteRestaurantesModule { }
