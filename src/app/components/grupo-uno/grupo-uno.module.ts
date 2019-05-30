import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoUnoRoutingModule } from './grupo-uno-routing.module';
import { GrupoUnoComponent } from './grupo-uno.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
  declarations: [GrupoUnoComponent, LoginComponent, LandingPageComponent],
  imports: [
    CommonModule,
    GrupoUnoRoutingModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule

  ],
  providers: []
})
export class GrupoUnoModule { }
