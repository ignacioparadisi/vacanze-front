import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoOchoCrucerosRoutingModule } from './grupo-ocho-cruceros-routing.module';
import { GrupoOchoCrucerosComponent } from './grupo-ocho-cruceros.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CrucerosComponent } from './cruceros/cruceros.component';

import { TableResponsiveModule } from '../../blocks/table-responsive/table-responsive.module';

@NgModule({
  declarations: [
    GrupoOchoCrucerosComponent,
    CrucerosComponent
  ],
  imports: [
    CommonModule,
    GrupoOchoCrucerosRoutingModule,
    SweetAlert2Module.forRoot(),
    TableResponsiveModule
  ],
  providers: []
})
export class GrupoOchoCrucerosModule {}
