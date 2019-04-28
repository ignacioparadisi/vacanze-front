import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { RegisterUserRoutingModule } from './register-user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [RegisterUserComponent],
  imports: [
    CommonModule,
    RegisterUserRoutingModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ]
})
export class RegisterUserModule { }
