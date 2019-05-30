import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgModule,
    FormsModule,
    ReactiveFormsModule,
    FormBuilder,
    NgForm,

  ]
})
export class LoginModule { }
