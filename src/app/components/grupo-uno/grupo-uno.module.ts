import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoUnoRoutingModule } from './grupo-uno-routing.module';
import { GrupoUnoComponent } from './grupo-uno.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [GrupoUnoComponent, LoginComponent],
  imports: [
    CommonModule,
    GrupoUnoRoutingModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ],
  providers: []
})
export class GrupoUnoModule {}
