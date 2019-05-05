import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoTreceAutomovilDetalleRoutingModule } from './grupo-trece-automovil-detalle-routing.module';
import { GrupoTreceAutomovilDetalleComponent } from './grupo-trece-automovil-detalle.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [GrupoTreceAutomovilDetalleComponent],
  imports: [
    CommonModule,
    GrupoTreceAutomovilDetalleRoutingModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ],
  providers: []
})
export class GrupoTreceAutomovilDetalleModule {}
