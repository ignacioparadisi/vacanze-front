import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoTreceHabitacionRoutingModule } from './grupo-trece-habitacion-routing.module';
import { GrupoTreceHabitacionComponent } from './grupo-trece-habitacion.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [GrupoTreceHabitacionComponent],
  imports: [
    CommonModule,
    GrupoTreceHabitacionRoutingModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ],
  providers: []
})
export class GrupoTreceHabitacionModule {}
