import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoTreceHabitacionDetalleRoutingModule } from './grupo-trece-habitacion-detalle-routing.module';
import { GrupoTreceHabitacionDetalleComponent } from './grupo-trece-habitacion-detalle.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [GrupoTreceHabitacionDetalleComponent],
  imports: [
    CommonModule,
    GrupoTreceHabitacionDetalleRoutingModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ],
  providers: []
})

export class GrupoTreceHabitacionDetalleModule {}
