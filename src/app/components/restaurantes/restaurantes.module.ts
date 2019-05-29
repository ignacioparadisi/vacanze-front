import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantesRoutingModule } from './restaurantes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantesComponent } from './restaurantes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRestaurantComponent } from '../restaurantes/register-restaurant/register-restaurant.component';
import { EditRestaurantComponent } from '../restaurantes/edit-restaurant/edit-restaurant.component';



// importar el modulo de grupos ocho que es la que hace la declaracion principal
// del componente tableresponsive y un componente no puede estar en dos declaraciones de modulo distintas
import { GrupoOchoCrucerosModule  } from '../grupo-ocho-cruceros/grupo-ocho-cruceros.module';


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
    GrupoOchoCrucerosModule
  ],
  providers: [ApiService],
  entryComponents: [RegisterRestaurantComponent, EditRestaurantComponent],
})
export class RestaurantesModule { }
