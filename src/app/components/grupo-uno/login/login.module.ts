import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule,FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgModule,
    FormsModule,
    NgForm,
    FormBuilder,
    ToastrService
  ]
})
export class LoginModule { }
