import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoOnceVentaVuelosRoutingModule } from './grupo-once-pago-routing.module';
import { GrupoOnceVentaVuelosComponent } from './grupo-once-venta-vuelos.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AutocompleteModule } from 'ng2-input-autocomplete';
@NgModule({
  declarations: [
    GrupoOnceVentaVuelosComponent
  ],
  imports: [
    CommonModule,
    AutocompleteModule.forRoot(),
    GrupoOnceVentaVuelosRoutingModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: []
})
export class GrupoOnceVentaVuelosModule {}