import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { ViewHotelsBackofficeRoutingModule } from './view-hotels-backoffice-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewHotelsBackofficeComponent } from './view-hotels-backoffice.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterHotelComponent } from './register-hotel/register-hotel.component';

//importar el modulo de grupos ocho que es la que hace la declaracion principal
//del componente tableresponsive y un componente no puede estar en dos declaraciones de modulo distintas
import { GrupoOchoCrucerosModule  } from "../grupo-ocho-cruceros/grupo-ocho-cruceros.module";
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';

@NgModule({
  declarations: [
    ViewHotelsBackofficeComponent,
    RegisterHotelComponent,
    EditHotelComponent
  ],
  imports: [
    CommonModule,
    ViewHotelsBackofficeRoutingModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    GrupoOchoCrucerosModule
  ],
  providers: [ApiService]
})
export class ViewHotelsBackofficeModule { }
