import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { GrupoTresRoutingModule } from './grupo-tres-routing.module';
import { NewGrupoTres } from '../grupo-tres/pages/new/new.grupo-tres';
import { ListGrupoTres } from '../grupo-tres/pages/list/list.grupo-tres';


@NgModule({
  declarations: [NewGrupoTres, ListGrupoTres],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    NgbModule,
    AngularDateTimePickerModule,
    SweetAlert2Module.forRoot(),
    GrupoTresRoutingModule
  ],
  providers: []
})
export class GrupoTresModule { }
