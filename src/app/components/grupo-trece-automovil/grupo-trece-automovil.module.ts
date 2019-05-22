import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoTreceAutomovilRoutingModule } from './grupo-trece-automovil-routing.module';
import { GrupoTreceAutomovilComponent } from './grupo-trece-automovil.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [GrupoTreceAutomovilComponent],
  imports: [
    CommonModule,
    GrupoTreceAutomovilRoutingModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ],
  providers: []
})
export class GrupoTreceAutomovilModule {}
