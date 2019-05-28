import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoTreceAutomovilRoutingModule } from './grupo-trece-automovil-routing.module';
import { GrupoTreceAutomovilComponent } from './grupo-trece-automovil.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TableResponsiveComponent  } from "../../blocks/table-responsive/table-responsive.component";
import { AutomovilesComponent } from './automoviles/automoviles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Falta agregar estos 2 en las declarations
@NgModule({
  declarations: [GrupoTreceAutomovilComponent],
  imports: [
    CommonModule,
    GrupoTreceAutomovilRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ],
  providers: []
})
export class GrupoTreceAutomovilModule {}
