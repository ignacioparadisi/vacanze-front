import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantesRoutingModule } from './restaurantes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantesComponent } from './restaurantes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { TableResponsiveModule } from '../../blocks/table-responsive/table-responsive.module';
=======
import { RegisterRestaurantComponent } from '../restaurantes/register-restaurant/register-restaurant.component';
import { EditRestaurantComponent } from '../restaurantes/edit-restaurant/edit-restaurant.component';

>>>>>>> Solucion de conflictos


// importar el modulo de grupos ocho que es la que hace la declaracion principal
// del componente tableresponsive y un componente no puede estar en dos declaraciones de modulo distintas


@NgModule({
  declarations: [
    RestaurantesComponent,
    RegisterRestaurantComponent,
    EditRestaurantComponent
  ],
  imports: [
    CommonModule,
    RestaurantesRoutingModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TableResponsiveModule
  ],
  providers: [ApiService],
  entryComponents: [RegisterRestaurantComponent, EditRestaurantComponent],
})
export class RestaurantesModule { }
