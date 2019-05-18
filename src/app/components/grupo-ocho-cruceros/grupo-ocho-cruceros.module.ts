import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoOchoCrucerosRoutingModule } from './grupo-ocho-cruceros-routing.module';
import { GrupoOchoCrucerosComponent } from './grupo-ocho-cruceros.component';
import { TableResponsiveComponent  } from "../../blocks/table-responsive/table-responsive.component";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    GrupoOchoCrucerosComponent,
    TableResponsiveComponent
  ],
  imports: [
    CommonModule,
    GrupoOchoCrucerosRoutingModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],

  //exportar la tabla responsive para que otros modulos puedan usarla
  exports: [TableResponsiveComponent]
})
export class GrupoOchoCrucerosModule {}
