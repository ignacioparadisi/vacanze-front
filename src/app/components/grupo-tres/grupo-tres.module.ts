import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { GrupoTresRoutingModule } from './grupo-tres-routing.module';
import { NewGrupoTres } from '../grupo-tres/pages/new/new.grupo-tres';
import { ListGrupoTres } from '../grupo-tres/pages/list/list.grupo-tres';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';



@NgModule({
  declarations: [NewGrupoTres, ListGrupoTres],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    NotifierModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    GrupoTresRoutingModule
  ],
  providers: []
})
export class GrupoTresModule { }
