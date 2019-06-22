import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoUnoRoutingModule } from './grupo-uno-routing.module';
import { GrupoUnoComponent } from './grupo-uno.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterUserModule } from "../users/register-user/register-user.module";
import { LoginModule } from './login/login.module';
import { LandingModule } from './landing/landing.module';

@NgModule({
  declarations: [GrupoUnoComponent],
  imports: [
    CommonModule,
    RegisterUserModule,
    GrupoUnoRoutingModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    LandingModule
  ],
  providers: []
})
export class GrupoUnoModule { }
