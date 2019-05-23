import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoNueveRoutingModule } from './grupo-nueve-routing.module';
import { GrupoNueveComponent } from './grupo-nueve.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GrupoNueveComponent],
  imports: [
    CommonModule,
    GrupoNueveRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule
  ],
  providers: []
})
export class GrupoNueveModule {}
