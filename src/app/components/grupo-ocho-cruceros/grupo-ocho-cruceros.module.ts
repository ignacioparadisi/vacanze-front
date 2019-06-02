import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoOchoCrucerosRoutingModule } from './grupo-ocho-cruceros-routing.module';
import { GrupoOchoCrucerosComponent } from './grupo-ocho-cruceros.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CrucerosComponent } from './cruceros/cruceros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableResponsiveModule } from '../../blocks/table-responsive/table-responsive.module';
import { RutasComponent } from './rutas/rutas.component';
import { RegistrarCruceroComponent } from './registrar-crucero/registrar-crucero.component';
import { AgregarRutasComponent } from './agregar-rutas/agregar-rutas.component';

@NgModule({
  declarations: [
    GrupoOchoCrucerosComponent,
    CrucerosComponent,
    RutasComponent,
    RegistrarCruceroComponent,
    AgregarRutasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GrupoOchoCrucerosRoutingModule,
    SweetAlert2Module.forRoot(),
    TableResponsiveModule
  ],
  providers: []
})
export class GrupoOchoCrucerosModule {}
