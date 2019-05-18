import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoOncePagoRoutingModule } from './grupo-once-pago-routing.module';
import { GrupoOncePagoComponent } from './grupo-once-pago.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    GrupoOncePagoComponent
  ],
  imports: [
    CommonModule,
    GrupoOncePagoRoutingModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: []
})
export class GrupoOncePagoModule {}